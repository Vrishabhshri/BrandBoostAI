import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import fs from 'fs'
import path from 'path'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

interface CompanyData {
  name: string
  analysis: any
  monthlySentiment: any
  tweets: string[]
}

const ANALYSIS_PROMPTS = {
  summary: {
    context: "Provide a concise business summary focusing on key metrics and performance indicators.",
    focusAreas: `
Focus on:
1. Business Overview:
   - Core business model
   - Market position
   - Key products/services

2. Performance Metrics:
   - Key performance indicators
   - Growth trends
   - Market share indicators

3. Recent Developments:
   - Notable achievements
   - Market changes
   - Strategic initiatives

4. Future Outlook:
   - Growth potential
   - Market opportunities
   - Strategic direction`
  },
  competitors: {
    context: "Analyze competitive position and market dynamics.",
    focusAreas: `
Focus on:
1. Market Position:
   - Competitive advantages
   - Market share
   - Brand strength

2. Competitor Analysis:
   - Direct competitors
   - Competitive strategies
   - Market differentiation

3. Competitive Edge:
   - Unique strengths
   - Market advantages
   - Strategic capabilities

4. Market Dynamics:
   - Industry trends
   - Market changes
   - Competitive landscape`
  },
  improvements: {
    context: "Provide strategic recommendations for business enhancement.",
    focusAreas: `
Focus on:
1. Operational Improvements:
   - Process optimization
   - Efficiency gains
   - Resource utilization

2. Strategic Enhancements:
   - Market positioning
   - Growth opportunities
   - Competitive advantages

3. Customer Experience:
   - Service quality
   - Customer satisfaction
   - Engagement strategies

4. Innovation Opportunities:
   - Product development
   - Service enhancement
   - Market expansion`
  },
  swot: {
    context: "Conduct a comprehensive SWOT analysis.",
    focusAreas: `
Focus on:
1. Strengths:
   - Core competencies
   - Unique advantages
   - Market position

2. Weaknesses:
   - Areas for improvement
   - Resource limitations
   - Competitive gaps

3. Opportunities:
   - Market potential
   - Growth avenues
   - Strategic options

4. Threats:
   - Market risks
   - Competitive pressures
   - External challenges`
  },
  trends: {
    context: "Analyze current and emerging market trends.",
    focusAreas: `
Focus on:
1. Market Trends:
   - Industry developments
   - Consumer behavior
   - Market shifts

2. Technology Trends:
   - Digital transformation
   - Innovation patterns
   - Tech adoption

3. Consumer Trends:
   - Buying patterns
   - Preference changes
   - Engagement styles

4. Future Outlook:
   - Growth projections
   - Market opportunities
   - Strategic implications`
  },
  sentiment: {
    context: "Analyze customer sentiment and brand perception.",
    focusAreas: `
Focus on:
1. Customer Sentiment:
   - Overall sentiment
   - Emotional responses
   - Brand perception

2. Sentiment Trends:
   - Temporal patterns
   - Seasonal variations
   - Trend analysis

3. Key Themes:
   - Common topics
   - Recurring issues
   - Positive aspects

4. Impact Analysis:
   - Business impact
   - Customer behavior
   - Brand reputation`
  },
  pros: {
    context: "Identify and analyze positive aspects and advantages.",
    focusAreas: `
Focus on:
1. Business Advantages:
   - Core strengths
   - Market benefits
   - Competitive edges

2. Operational Strengths:
   - Process efficiency
   - Resource utilization
   - Performance metrics

3. Customer Benefits:
   - Value proposition
   - Service quality
   - Customer satisfaction

4. Market Position:
   - Brand strength
   - Market share
   - Industry standing`
  },
  cons: {
    context: "Identify and analyze areas for improvement and challenges.",
    focusAreas: `
Focus on:
1. Business Challenges:
   - Operational issues
   - Market limitations
   - Resource constraints

2. Customer Pain Points:
   - Service gaps
   - Quality issues
   - Experience problems

3. Competitive Weaknesses:
   - Market disadvantages
   - Strategic gaps
   - Resource limitations

4. Improvement Areas:
   - Process inefficiencies
   - Service gaps
   - Market challenges`
  },
  recommendations: {
    context: "Provide detailed, actionable recommendations for improvement.",
    focusAreas: `
Focus on:
1. Strategic Recommendations:
   - Business strategy
   - Market positioning
   - Growth initiatives

2. Operational Improvements:
   - Process optimization
   - Resource allocation
   - Efficiency gains

3. Customer Experience:
   - Service enhancement
   - Engagement strategies
   - Satisfaction improvement

4. Implementation Plan:
   - Action steps
   - Resource requirements
   - Timeline considerations`
  },
  dataset: {
    context: "Provide comprehensive analysis of all available data.",
    focusAreas: `
Focus on:
1. Business Overview:
   - Company profile
   - Market position
   - Core business

2. Performance Analysis:
   - Key metrics
   - Growth trends
   - Market share

3. Customer Insights:
   - Sentiment analysis
   - Engagement patterns
   - Service quality

4. Competitive Position:
   - Market standing
   - Competitive advantages
   - Industry position

5. Strategic Implications:
   - Business impact
   - Growth opportunities
   - Risk factors

6. Data-Driven Insights:
   - Quantitative analysis
   - Trend patterns
   - Performance indicators`
  }
} as const;

export async function POST(request: Request) {
  try {
    const { company, type, data } = await request.json()

    if (!company || !type || !data) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Read company data from JSON files in public folder
    const targetAnalysis = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/target_analysis.json'), 'utf-8'))
    const targetSentiment = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/target_monthly_sentiment.json'), 'utf-8'))
    const targetTweets = fs.readFileSync(path.join(process.cwd(), 'public/target_tweets.csv'), 'utf-8')
      .split('\n')
      .slice(1) // Skip header row
      .map(line => line.split(',')[1]) // Get tweet content from second column
      .filter(tweet => tweet) // Remove empty tweets

    const amazonAnalysis = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/amazonhelp_analysis.json'), 'utf-8'))
    const amazonSentiment = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/amazonhelp_monthly_sentiment.json'), 'utf-8'))
    const amazonTweets = fs.readFileSync(path.join(process.cwd(), 'public/amazonhelp_tweets.csv'), 'utf-8')
      .split('\n')
      .slice(1) // Skip header row
      .map(line => line.split(',')[1]) // Get tweet content from second column
      .filter(tweet => tweet) // Remove empty tweets

    // Combine all company data
    const allCompanyData = {
      target: {
        analysis: targetAnalysis,
        monthlySentiment: targetSentiment,
        tweets: targetTweets
      },
      amazon: {
        analysis: amazonAnalysis,
        monthlySentiment: amazonSentiment,
        tweets: amazonTweets
      },
      [company.toLowerCase()]: data
    }

    // Get the appropriate prompt based on analysis type
    const promptConfig = ANALYSIS_PROMPTS[type as keyof typeof ANALYSIS_PROMPTS] || ANALYSIS_PROMPTS.summary

    // Create the prompt
    const prompt = `${promptConfig.context}

Company Data:
${JSON.stringify(allCompanyData, null, 2)}

${promptConfig.focusAreas}

Important Instructions:
1. Focus ONLY on analyzing the available data
2. Do not mention missing data or limitations
3. Provide specific examples and data points from the available information
4. Make the response engaging and data-driven
5. Stay focused on ${company} and its specific data
6. Use bullet points for clarity
7. Include specific numbers and percentages where available in the data
8. Compare with other companies only where direct data comparison is possible

Format the response in a clear, structured manner with bullet points where appropriate. Make the response engaging and informative while staying focused on the available data for ${company}.`

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt)
    const analysis = result.response.text()

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Chat analysis error:", error)
    if (error instanceof Error) {
      console.error("Error details:", error.message)
    }
    return NextResponse.json(
      { error: "Failed to analyze data", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}