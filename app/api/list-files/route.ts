import { NextResponse } from "next/server"
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'public')
    
    // Check if the directory exists
    try {
      await fs.access(dataDir)
    } catch (error) {
      // If the directory doesn't exist, return an empty array
      return NextResponse.json([])
    }
    
    const files = await fs.readdir(dataDir)
    
    // Filter for JSON files only
    const jsonFiles = files.filter(file => file.endsWith('.json'))
    
    const fileInfos = await Promise.all(jsonFiles.map(async (file) => {
      const filePath = path.join(dataDir, file)
      const stats = await fs.stat(filePath)
      return {
        name: file,
        createdAt: stats.birthtime.toISOString(),
        path: `/public/${file}` // Add path for frontend reference
      }
    }))

    // Sort files by creation date, most recent first
    fileInfos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(fileInfos)
  } catch (error) {
    console.error("Error listing files:", error)
    // Return an empty array in case of error
    return NextResponse.json([])
  }
}