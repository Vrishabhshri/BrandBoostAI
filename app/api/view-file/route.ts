import { NextResponse } from "next/server"
import { promises as fs } from 'fs'
import path from 'path'
import { analyzeData } from "@/lib/gemini"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const fileName = searchParams.get('name')

    if (!fileName) {
      return NextResponse.json({ error: "File name is required" }, { status: 400 })
    }

    // Read the selected file
    const filePath = path.join(process.cwd(), 'public', fileName)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const fileData = JSON.parse(fileContent)

    // Analyze the data using Gemini
    const analysis = await analyzeData(fileData)

    // Instead of saving to a file, return the analysis directly
    return NextResponse.json({
      success: true,
      data: {
        originalData: fileData,
        analysis: analysis,
        fileName: fileName,
        analyzedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error processing file:', error)
    return NextResponse.json(
      { error: "Failed to process file" }, 
      { status: 500 }
    )
  }
}