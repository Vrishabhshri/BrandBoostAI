import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'saved-companies.json');
    
    // Read existing data or create empty array
    let companies = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      companies = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, use empty array
    }

    // Add new company with timestamp
    companies.push({
      ...data,
      savedAt: new Date().toISOString()
    });

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(companies, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving company:', error);
    return NextResponse.json({ error: 'Failed to save company' }, { status: 500 });
  }
} 