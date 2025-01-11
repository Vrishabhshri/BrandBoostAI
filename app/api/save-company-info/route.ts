import { NextResponse } from "next/server"
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const companyInfo = await request.json()
    const fileName = `${companyInfo.name.toLowerCase().replace(/\s+/g, '-')}.json`
    const filePath = path.join(process.cwd(), 'data', fileName)

    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(companyInfo, null, 2))

    return NextResponse.json({ message: "Company info saved successfully" })
  } catch (error) {
    console.error("Error saving company info:", error)
    return NextResponse.json({ error: "Failed to save company information" }, { status: 500 })
  }
}