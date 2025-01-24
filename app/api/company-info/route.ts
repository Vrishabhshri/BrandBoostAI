import { NextResponse } from "next/server";
import { getCompanyInfo } from "@/lib/gemini";
import { getTwitterData } from "@/lib/twitter";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyName = searchParams.get("name");

  if (!companyName) {
    return NextResponse.json(
      { error: "Company name is required" },
      { status: 400 }
    );
  }

  try {
    // Get company info sequentially
    const companyInfo = await getCompanyInfo(companyName);
    
    // Get Twitter data
    const twitterData = await getTwitterData(companyName);
    
    // Combine the data
    const combinedData = {
      ...companyInfo,
      socialStats: {
        followers: twitterData?.followers_count || null,
        likes: twitterData?.likes_count || null,
        tweets: twitterData?.tweets_count || null
      }
    };

    if (!combinedData) {
      throw new Error("Failed to fetch company information");
    }

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("Error in GET /api/company-info:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch company information";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
