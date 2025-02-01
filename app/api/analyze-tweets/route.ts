import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the interface for a tweet
interface Tweet {
  text: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const twitterData = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Type the tweets array using the Tweet interface
    const prompt = `Analyze these tweets from ${twitterData.name}:
    ${twitterData.tweets.map((t: Tweet) => t.text).join('\n')}
    
    Provide analysis in this JSON format:
    {
      "sentiment": "overall sentiment (positive/negative/neutral)",
      "sentimentScore": "score from -1 to 1",
      "trends": ["array of identified trends or topics"],
      "summary": "brief summary of the content",
      "keyInsights": ["array of key insights"]
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const analysis = JSON.parse(text.replace(/```json\n|\n```/g, '').trim());

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze tweets" },
      { status: 500 }
    );
  }
} 