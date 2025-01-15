import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Read and parse the JSON files
const monthlySentiment = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'public', 'amazon_monthly_sentiment.json'), 'utf-8')
);

interface ServiceIssue {
  title: string;
  description: string;
}

interface ServiceAnalysis {
  timestamp: string;
  issues: ServiceIssue[];
  recommendations: ServiceIssue[];
}

// Read and parse the CSV file with more robust options
const tweetsCSV = fs.readFileSync(path.join(process.cwd(), 'public', 'amazonhelp_tweets.csv'), 'utf-8');
const allTweets = parse(tweetsCSV, {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  relax_column_count: true,
  quote: '"',
  escape: '"',
  skip_records_with_error: true,
  on_record: (record: any, { lines }) => {
    if (lines > 200) return null; // Skip after 200 records
    return {
      tweet_id: String(record.tweet_id || ''),
      author_id: String(record.author_id || ''),
      inbound: String(record.inbound || 'False'),
      created_at: String(record.created_at || new Date().toISOString()),
      text: String(record.text || '').replace(/[\u0000-\u001F\u007F-\u009F]/g, ''),
      response_tweet_id: record.response_tweet_id ? String(record.response_tweet_id) : null
    };
  }
});


interface Tweet {
  tweet_id: string;
  author_id: string;
  inbound: string;
  created_at: string;
  text: string;
  response_tweet_id: string | null;
}

// Helper functions from the example
const findRelevantTweets = (tweets: Tweet[], query: string, limit: number = 5) => {
  const searchTerms = query.toLowerCase().split(' ');
  return tweets
    .filter(tweet => {
      if (!tweet.text) return false;
      const tweetText = tweet.text.toLowerCase();
      return searchTerms.some(term => tweetText.includes(term));
    })
    .slice(0, limit);
};

interface SentimentMonth {
  positive: number;
  negative: number;
  neutral: number;
  average_score: number;
}

const analyzeSentimentTrends = (sentimentData: { monthly_sentiment: Record<string, SentimentMonth> }) => {
  const sortedMonths = Object.entries(sentimentData.monthly_sentiment)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());
  
  return {
    earliest: sortedMonths[0],
    latest: sortedMonths[sortedMonths.length - 1],
    trend: sortedMonths.slice(-3)
  };
};

// Update the JSON parse with type assertion and default values
const serviceAnalysis: ServiceAnalysis = {
  timestamp: new Date().toISOString(),
  issues: [
    {
      title: "No issues found",
      description: "No current service issues reported"
    }
  ],
  recommendations: [
    {
      title: "No recommendations",
      description: "No current recommendations available"
    }
  ],
  ...JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public', 'amazonhelp_analysis.json'), 'utf-8')
  )
};

// Add new interface for company-specific data
interface CompanyData {
  name: string;
  monthly_sentiment: Record<string, SentimentMonth>;
  tweets: Tweet[];
  issues: ServiceIssue[];
  recommendations: ServiceIssue[];
}

// Modify the data loading to handle multiple companies
const loadCompanyData = (company: string): CompanyData => {
  try {
    // Handle different file naming patterns for Amazon and Target
    const filePrefix = company === 'amazon' ? 'amazonhelp' : company;
    
    const sentimentData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public', `${filePrefix}_monthly_sentiment.json`), 'utf-8')
    );

    const tweetsCSV = fs.readFileSync(path.join(process.cwd(), 'public', `${filePrefix}_tweets.csv`), 'utf-8');
    const tweets = parse(tweetsCSV, {
      columns: true,
      skip_empty_lines: true,
      relax_quotes: true,
      relax_column_count: true,
      quote: '"',
      escape: '"',
      skip_records_with_error: true,
      on_record: (record: any, { lines }) => {
        if (lines > 200) return null;
        return {
          tweet_id: String(record.tweet_id || ''),
          author_id: String(record.author_id || ''),
          inbound: String(record.inbound || 'False'),
          created_at: String(record.created_at || new Date().toISOString()),
          text: String(record.text || '').replace(/[\u0000-\u001F\u007F-\u009F]/g, ''),
          response_tweet_id: record.response_tweet_id ? String(record.response_tweet_id) : null
        };
      }
    });

    const analysisData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public', `${filePrefix}_analysis.json`), 'utf-8')
    );

    return {
      name: company,
      monthly_sentiment: sentimentData.monthly_sentiment,
      tweets,
      issues: analysisData.issues || [],
      recommendations: analysisData.recommendations || []
    };
  } catch (error) {
    console.error(`Error loading ${company} data:`, error);
    return {
      name: company,
      monthly_sentiment: {},
      tweets: [],
      issues: [],
      recommendations: []
    };
  }
};

// Load data for both companies
const companies = {
  amazon: loadCompanyData('amazon'),
  target: loadCompanyData('target')
};

// Add query type detection
const QUERY_TYPES = {
  SENTIMENT: ['sentiment', 'mood', 'feeling', 'satisfaction'],
  TRENDS: ['trend', 'pattern', 'change', 'over time'],
  DATA_ANALYSIS: ['analysis', 'issues', 'problems', 'complaints'],
  COMPANY_INFO: ['tell me about', 'what is', 'who is', 'information about', 'describe']
} as const;

const detectQueryType = (query: string): string[] => {
  const lowercaseQuery = query.toLowerCase();
  return Object.entries(QUERY_TYPES).reduce((types: string[], [type, keywords]) => {
    if (keywords.some(keyword => lowercaseQuery.includes(keyword))) {
      types.push(type);
    }
    return types;
  }, []);
};

export async function POST(request: Request) {
  try {
    const { query, queryTypes } = await request.json();
    
    // Detect company and query types
    const company = query.toLowerCase().includes('target') ? 'target' : 'amazon';
    const detectedTypes = detectQueryType(query);
    const companyData = companies[company];

    // If it's a general company info query, use a different prompt
    if (detectedTypes.includes('COMPANY_INFO')) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(`
        You are a retail industry expert. Please provide a brief overview of ${company} focusing on:
        - Their market position and main business areas
        - Key competitors
        - Recent business developments and strategies
        - Notable strengths and challenges
        
        Keep the response concise and factual. Query: ${query}
      `);
      const response = await result.response;
      return NextResponse.json({
        analysis: {
          content: response.text(),
          type: 'company_info',
          data: { company }
        }
      });
    }

    // For data analysis queries, use the existing data
    const relevantTweets = findRelevantTweets(companyData.tweets, query);
    const sentimentTrends = analyzeSentimentTrends({ monthly_sentiment: companyData.monthly_sentiment });

    let contextPrompt = `You are a data analysis assistant working with ${companyData.name} customer service data. `;

    // Customize the prompt based on query type
    if (detectedTypes.includes('SENTIMENT')) {
      contextPrompt += `Focus on analyzing customer sentiment trends and patterns. `;
    }
    if (detectedTypes.includes('TRENDS')) {
      contextPrompt += `Focus on identifying significant trends and changes over time. `;
    }
    if (detectedTypes.includes('DATA_ANALYSIS')) {
      contextPrompt += `Focus on analyzing specific issues and providing actionable insights. `;
    }

    contextPrompt += `\nAvailable data sources:

1. Customer Service Interactions (${companyData.tweets.length} tweets):
${relevantTweets.map(t => `* [${t.created_at}] ${t.inbound === 'True' ? 'Customer' : companyData.name}: "${t.text}"`).join('\n')}

2. Sentiment Analysis (${sentimentTrends.earliest?.[0] || 'N/A'} to ${sentimentTrends.latest?.[0] || 'N/A'}):
${sentimentTrends.trend.map(([month, data]) => 
  `* ${month}: Score=${data.average_score.toFixed(2)} (${data.positive} positive, ${data.negative} negative, ${data.neutral} neutral)`
).join('\n')}

3. Service Analysis:
${companyData.issues.map(i => `* Issue: ${i.title} - ${i.description}`).join('\n')}

Query: ${query}

Please provide a concise, data-driven response based on the above information and focus areas.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(contextPrompt);
    const response = await result.response;

    return NextResponse.json({
      analysis: {
        content: response.text(),
        type: detectedTypes[0] || 'general',
        data: {
          company: companyData.name,
          tweets: relevantTweets,
          sentiment: sentimentTrends.trend,
          analysis: {
            issues: companyData.issues,
            recommendations: companyData.recommendations
          }
        }
      },
      queryTypes: detectedTypes
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  
  return POST(new Request(request.url, {
    method: 'POST',
    body: JSON.stringify({ query, queryTypes: {} })
  }));
} 