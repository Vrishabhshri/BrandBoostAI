import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface Tweet {
  text: string;
}

interface TwitterData {
  name: string;
  tweets: Tweet[];
}

export async function POST(request: Request) {
  try {
    const twitterData: TwitterData = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    console.log('Generated prompt:', prompt);

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const analysis = JSON.parse(text.replace(/```json\n|\n```/g, '').trim());

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return NextResponse.json(
      { error: "Failed to analyze tweets", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 