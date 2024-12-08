import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, request: userRequest } = body;

    // Call your Python Gemini API
    const response = await fetch('http://localhost:5000/search_company', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(company && { params: { name: company } })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Gemini API');
    }

    const data = await response.json();
    
    return NextResponse.json({ response: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}