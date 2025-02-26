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
  relax: true,
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

export async function POST(request: Request) {
  try {
    const { query, queryTypes } = await request.json();

    // Process data for Gemini
    const relevantTweets = findRelevantTweets(allTweets, query);
    const sentimentTrends = analyzeSentimentTrends(monthlySentiment);

    // Create context for Gemini
    const context = `You are a data analysis assistant working with Amazon customer service data. You have access to these data sources:

1. Customer Service Interactions (${allTweets.length} tweets):
${relevantTweets.map(t => `* [${t.created_at}] ${t.inbound === 'True' ? 'Customer' : 'Amazon'}: "${t.text}"`).join('\n')}

2. Sentiment Analysis (${sentimentTrends.earliest[0]} to ${sentimentTrends.latest[0]}):
${sentimentTrends.trend.map(([month, data]) => 
  `* ${month}: Score=${data.average_score.toFixed(2)} (${data.positive} positive, ${data.negative} negative, ${data.neutral} neutral)`
).join('\n')}

3. Service Analysis:
${serviceAnalysis.issues.map(i => `* Issue: ${i.title} - ${i.description}`).join('\n')}

Query: ${query}

Please provide a concise, data-driven response based only on the above information. If the information isn't in the data, say so explicitly.`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      analysis: {
        content: text,
        data: {
          tweets: relevantTweets,
          sentiment: sentimentTrends.trend,
          analysis: serviceAnalysis
        }
      }
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










































/////////////
const CHAT_PATTERNS = {
  data: /\b(\w+)\s+data\b/i,
  analysis: {
    summary: ['what is', 'tell me about', 'who is', 'describe'],
    competitors: ['competitors', 'competition', 'similar to', 'companies like'],
    improvements: ['how to improve', 'suggestions for', 'recommendations', 'better'],
    swot: ['swot', 'strengths and weaknesses', 'opportunities'],
    trends: ['trends', 'market trends', 'industry trends', 'future of']
  }
} as const;





///////////////////////
"use client"

import { useState, useEffect, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CompanyInfo } from "./company-info"
import competitorData from '../data/competitor.json'

interface GeminiAnalysis {
  type: string;
  content: string;
  error?: boolean;
}

interface Message {
  id: number;
  text: string | GeminiAnalysis;
  isUser: boolean;
  type?: 'analysis' | 'dataset' | 'error';
}

interface CompanyData {
  name: string;
  instagram: {
    followers: number;
    content: string;
    date_added: string;
  }[];
  facebook: {
    followers: number;
    content: string;
    date_added: string;
  }[];
}

const CHAT_PATTERNS = {
  data: /\b(\w+)\s+data\b/i,
  analysis: {
    summary: ['Answer any questions that the user has has, based off using the json file.']
  }
} as const;

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Welcome! Add competitors to your dashboard to get started. You can also brainstorm potential competitors in the chat.", 
      isUser: false 
    },
  ])
  const [input, setInput] = useState('')
  const [companyData, setCompanyData] = useState<CompanyData[]>([])
  const [mentionedCompany, setMentionedCompany] = useState<CompanyData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showCompanyData, setShowCompanyData] = useState(false)

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setCompanyData(competitorData.companies)
      } catch (error) {
        console.error('Failed to load company data:', error)
      }
    }
    fetchCompanyData()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const analyzeCompany = async (companyName: string, type: string = 'dataset') => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/gemini?name=${companyName}&type=${type}`);
      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: `Error: ${data.error}`,
          isUser: false,
          type: 'error'
        }]);
        return;
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: data.analysis.content,
        isUser: false,
        type: type as 'analysis' | 'dataset'
      }]);

      if (data.staticData?.name) {
        setMentionedCompany(data.staticData);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'Failed to fetch analysis. Please try again.',
        isUser: false,
        type: 'error'
      }]);
    } finally {
      setIsLoading(false)
    }
  }

  const generateResponse = async (userInput: string) => {
    const text = userInput.toLowerCase();
    
    // Check for data request pattern
    const dataMatch = text.match(CHAT_PATTERNS.data);
    if (dataMatch) {
      const companyName = dataMatch[1];
      setShowCompanyData(true);
      await analyzeCompany(companyName, 'dataset');
      return;
    }

    // Detect company name and analysis type
    const words = text.split(' ');
    let detectedCompany = null;
    
    // Check each word against company database
    for (const word of words) {
      if (companyData.some(company => 
        company.name.toLowerCase() === word.toLowerCase()
      )) {
        detectedCompany = word;
        break;
      }
    }

    if (!detectedCompany) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "I couldn't identify a company name. Could you please mention the company you'd like to learn about?",
        isUser: false
      }]);
      return;
    }

    // Detect analysis type based on patterns
    let analysisType: string = 'summary';
    for (const [type, patterns] of Object.entries(CHAT_PATTERNS.analysis)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        analysisType = type;
        break;
      }
    }

    setShowCompanyData(false);
    await analyzeCompany(detectedCompany, analysisType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: input,
      isUser: true
    }]);

    const userInput = input;
    setInput('');

    await generateResponse(userInput);
  };

  const renderMessage = (message: Message) => {
    if (typeof message.text === 'string') {
      return message.text;
    }
    
    // Handle GeminiAnalysis object
    if (typeof message.text === 'object' && 'content' in message.text) {
      return message.text.content;
    }

    return 'Invalid message format';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-zinc-900">
      <div className="px-4 py-3 border-b border-zinc-800">
        <h2 className="text-sm font-medium text-white">Page chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-full rounded-lg p-3 text-sm
                ${message.isUser 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-zinc-800 text-zinc-300'
                }
                ${message.type === 'error' ? 'bg-red-900/50 text-red-200' : ''}
              `}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{renderMessage(message)}</p>
            </div>
          </div>
        ))}
        
        {showCompanyData && mentionedCompany && (
          <div className="my-4 border-t border-zinc-800 pt-4 bg-zinc-900/95">
            <CompanyInfo
              name={mentionedCompany.name}
              instagram={mentionedCompany.instagram[0]}
              facebook={mentionedCompany.facebook[0]}
            />
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-zinc-400 bg-zinc-900/95 p-2 rounded-lg">
            <div className="animate-spin h-4 w-4 border-2 border-zinc-500 border-t-transparent rounded-full" />
            <span className="text-sm">Analyzing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-zinc-800 bg-zinc-900 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-full border-zinc-700 bg-zinc-800 pl-4 pr-12 text-zinc-200 placeholder-zinc-500 focus:ring-1 focus:ring-zinc-600 text-sm h-9"
            placeholder="Ask about any company (e.g., 'Tell me about Nike' or 'Nike competitors')"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-zinc-800"
            disabled={isLoading}
          >
            <MessageCircle className="h-4 w-4 text-zinc-400" />
          </Button>
        </form>
      </div>
    </div>
  );
}





















//////OverViewPage:
