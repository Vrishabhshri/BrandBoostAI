import { NextResponse } from "next/server"
import { searchTweets } from "@/lib/twitter"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 })
  }

  try {
    const tweets = await searchTweets(query)
    return NextResponse.json(tweets)
  } catch (error) {
    console.error("Error searching tweets:", error)
    return NextResponse.json({ error: "Failed to search tweets" }, { status: 500 })
  }
}