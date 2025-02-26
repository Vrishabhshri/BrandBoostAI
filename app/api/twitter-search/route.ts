import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY || '',
  appSecret: process.env.TWITTER_API_SECRET || '',
  accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyName = searchParams.get("name");

    if (!companyName) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    // Get user by username
    const user = await client.v2.userByUsername(companyName, {
      "user.fields": ["description", "id", "name"],
    });

    if (!user.data) {
      throw new Error("User not found");
    }

    // Get recent tweets
    const tweets = await client.v2.userTimeline(user.data.id, {
      max_results: 5,
      "tweet.fields": ["created_at"],
    });

    const twitterData = {
      name: user.data.name,
      id: user.data.id,
      description: user.data.description,
      tweets: tweets.data.data.map(tweet => ({
        text: tweet.text,
        createdAt: tweet.created_at,
      })),
    };

    return NextResponse.json(twitterData);
  } catch (error) {
    console.error("Twitter API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Twitter data" },
      { status: 500 }
    );
  }
} 