import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const filePath = path.join(process.cwd(), 'public', 'gemini-response.json');

        // Write the response as a file
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving Gemini response:", error);
        return NextResponse.json({ error: "Failed to save response" }, { status: 500 });
    }
} 