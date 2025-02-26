import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define an interface for the tweet structure
interface Tweet {
  text: string;
}

export async function POST(request: Request) {
  try {
    const twitterData: { name: string; tweets: Tweet[] } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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