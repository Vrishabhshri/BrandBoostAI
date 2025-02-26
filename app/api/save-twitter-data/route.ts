import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'twitter-analysis.json');
    
    // Read existing data or create empty array
    let analyses = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      analyses = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, use empty array
    }

    // Add new analysis with timestamp
    analyses.push({
      ...data,
      savedAt: new Date().toISOString()
    });

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(analyses, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving Twitter data:', error);
    return NextResponse.json({ error: 'Failed to save Twitter data' }, { status: 500 });
  }
} 