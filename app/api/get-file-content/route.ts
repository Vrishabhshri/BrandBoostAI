import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'files', filename);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json({ content: JSON.parse(content) });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'File not found or could not be read' }, { status: 404 });
  }
} 