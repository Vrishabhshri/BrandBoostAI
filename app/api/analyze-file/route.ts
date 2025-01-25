// import { NextResponse } from 'next/server';
// import { analyzeData } from "@/lib/gemini";
// import { Analysis } from "@/types/analysis";

// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     const analysis = await analyzeData(data);
    
//     const response: Analysis = {
//       analysis,
//       analyzedAt: new Date().toISOString(),
//       originalData: data
//     };

//     return NextResponse.json(response);
//   } catch (error) {
//     console.error("Analysis error:", error);
//     return NextResponse.json({ 
//       error: "Failed to analyze file",
//       details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined 
//     }, { status: 500 });
//   }
// } 