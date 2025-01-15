import { NextResponse } from "next/server";
import { getCompanyInfo } from "@/lib/gemini";

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
    const companyInfo = await getCompanyInfo(companyName);
    console.log("Company info retrieved:", companyInfo);

    if (!companyInfo || Object.keys(companyInfo).length === 0) {
      throw new Error("Empty or invalid company info received from Gemini");
    }

    return NextResponse.json(companyInfo);
  } catch (error) {
    console.error("Error in GET /api/company-info:", error);

    // Narrowing the type of `error`
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch company information";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
