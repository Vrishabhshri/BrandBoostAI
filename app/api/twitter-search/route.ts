import { NextResponse } from "next/server";
import { TwitterApi, TweetV2 } from "twitter-api-v2";

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

// Add rate limiting
let lastRequestTime = 0;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_REQUESTS = 180; // Twitter's standard rate limit
let requestCount = 0;

export async function GET(request: Request) {
  try {
    // Check rate limiting
    const now = Date.now();
    if (now - lastRequestTime > RATE_LIMIT_WINDOW) {
      // Reset counter if window has passed
      requestCount = 0;
      lastRequestTime = now;
    }

    if (requestCount >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    requestCount++;
    const result = await client.v2.search(`${name} -is:retweet`, {
      'tweet.fields': ['created_at', 'public_metrics'],
      max_results: 10,
    });

    return NextResponse.json({
      name: name,
      id: result.meta.newest_id,
      description: `Twitter data for ${name}`,
      tweets: result.data.data.map((tweet: TweetV2) => ({
        text: tweet.text,
        createdAt: tweet.created_at,
      }))
    });
  } catch (error: any) {
    console.error("Twitter API error:", error);
    
    if (error.code === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch Twitter data" },
      { status: 500 }
    );
  }
} 