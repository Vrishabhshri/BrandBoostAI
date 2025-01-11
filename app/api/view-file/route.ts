import { NextResponse } from "next/server"
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fileName = searchParams.get('name')

  if (!fileName) {
    return NextResponse.json({ error: "File name is required" }, { status: 400 })
  }

  try {
    const filePath = path.join(process.cwd(), 'data', fileName)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(fileContent))
  } catch (error) {
    console.error("Error reading file:", error)
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 })
  }
}