import { NextRequest, NextResponse } from 'next/server';

interface Company {
  name: string;
  instagram: Array<{
    followers: number;
    content: string;
    date_added: string;
  }>;
  facebook: Array<{
    followers: number;
    content: string;
    date_added: string;
  }>;
}

interface CompetitorData {
  companies: Company[];
}

const FLASK_API_URL = 'http://localhost:5000';
const COMPETITOR_DATA: CompetitorData = {
  companies: [
    {
      name: "nike",
      instagram: [{
        followers: 2500000,
        content: "Latest sports gear and innovation",
        date_added: "2024-03-20"
      }],
      facebook: [{
        followers: 4000000,
        content: "Global sports and lifestyle brand",
        date_added: "2024-03-20"
      }]
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const type = searchParams.get('type') || 'summary';

    if (!name) {
      return NextResponse.json(
        { error: 'Missing company name' },
        { status: 400 }
      );
    }

    const staticData = COMPETITOR_DATA.companies.find(
      company => company.name.toLowerCase() === name.toLowerCase()
    );

    try {
      const geminiResponse = await fetch(
        `${FLASK_API_URL}/analyze_company?name=${name}&type=${type}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!geminiResponse.ok) {
        throw new Error(`Gemini API error: ${geminiResponse.statusText}`);
      }

      const geminiData = await geminiResponse.json();

      if (!geminiData.success) {
        throw new Error(geminiData.error || 'Failed to get analysis');
      }

      return NextResponse.json({
        staticData: staticData || {},
        analysis: {
          type,
          content: geminiData.analysis
        }
      });

    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      // Fallback to static data with error message
      return NextResponse.json({
        staticData: staticData || {},
        analysis: {
          type,
          content: "AI analysis temporarily unavailable. Please try again later.",
          error: true
        }
      });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
} 