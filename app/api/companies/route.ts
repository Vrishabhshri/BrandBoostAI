import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

interface CompanyData {
  name: string;
  analysis: any;
  monthlySentiment: any;
  tweets: string[];
}

export async function GET() {
  try {
    // Read company data from JSON files in public folder
    const targetAnalysis = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/target_analysis.json'), 'utf-8'));
    const targetSentiment = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/target_monthly_sentiment.json'), 'utf-8'));
    const targetTweets = fs.readFileSync(path.join(process.cwd(), 'public/target_tweets.csv'), 'utf-8')
      .split('\n')
      .slice(1) // Skip header row
      .map(line => line.split(',')[1]) // Get tweet content from second column
      .filter(tweet => tweet); // Remove empty tweets

    const amazonAnalysis = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/amazonhelp_analysis.json'), 'utf-8'));
    const amazonSentiment = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/amazonhelp_monthly_sentiment.json'), 'utf-8'));
    const amazonTweets = fs.readFileSync(path.join(process.cwd(), 'public/amazonhelp_tweets.csv'), 'utf-8')
      .split('\n')
      .slice(1) // Skip header row
      .map(line => line.split(',')[1]) // Get tweet content from second column
      .filter(tweet => tweet); // Remove empty tweets

    // Combine all company data
    const companies: CompanyData[] = [
      {
        name: "Target",
        analysis: targetAnalysis,
        monthlySentiment: targetSentiment,
        tweets: targetTweets
      },
      {
        name: "Amazon",
        analysis: amazonAnalysis,
        monthlySentiment: amazonSentiment,
        tweets: amazonTweets
      }
    ];

    return NextResponse.json({ companies });
  } catch (error) {
    console.error("Error fetching company data:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return NextResponse.json(
      { error: "Failed to fetch company data" },
      { status: 500 }
    );
  }
} 