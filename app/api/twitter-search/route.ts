import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { getUserCredits, deductUserCredit } from "@/lib/user"; // Import functions to manage user credits

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
    const userId = request.headers.get("user-id"); // Assuming user ID is passed in headers

    if (!companyName) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    // Check if userId is valid
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Check user credits
    const credits = await getUserCredits(userId);
    if (credits <= 0) {
      return NextResponse.json({ error: "You have run out of credits, please buy more or come back the next day." }, { status: 403 });
    }

    // Deduct a credit
    await deductUserCredit(userId);

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