import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (!req.url) {
    return new Response(JSON.stringify({ error: "Invalid request URL" }), { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name || typeof name !== "string") {
    return new Response(JSON.stringify({ error: "Company name is required" }), { status: 400 });
  }

  try {
    const geminiApiKey = process.env.GEMINI_API_KEY; // Ensure this is set in your .env file
    const geminiEndpoint = `https://geminiapi.com/v1/search?query=${encodeURIComponent(name)}`;

    const response = await fetch(geminiEndpoint, {
      headers: { Authorization: `Bearer ${geminiApiKey}` },
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      title: data.title,
      description: data.description,
      social: {
        followers: data.social?.followers || null,
        likes: data.social?.likes || null,
        tweets: data.social?.tweets || null,
      },
      competitors: data.competitors || [],
      hashtags: data.hashtags || [],
    }), { status: 200 });
  } catch (error) {
    console.error("Error fetching Gemini data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch company data" }), { status: 500 });
  }
}
