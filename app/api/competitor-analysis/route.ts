import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const { companyName, field } = await req.json()

    if (!companyName || !field) {
      return NextResponse.json({ error: "Company name and field are required" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    let prompt
    switch (field) {
      case 'instagram_followers':
        prompt = `Give me the Instagram followers of "${companyName}". Respond with only the number. If you don't know, give me the real count you know.`
        break
      case 'instagram_increase':
        prompt = `Based off Instagram follower give me the increase percentage of "${companyName}". Respond with only the number.`
        break
      case 'instagram_hashtags':
        prompt = `Generate 5 relevant hashtags for "${companyName}" on Instagram. Respond with only the hashtags separated by commas.`
        break
      case 'instagram_content':
        prompt = `Give me a Instagram post content for "${companyName}". Respond with only the content.`
        break
      case 'facebook_followers':
        prompt = `Give me the Facebook followers of "${companyName}". Respond with only the number. If you don't know, give me the real count you know.`
        break
      case 'facebook_increase':
        prompt = `Based off Facebook follower give me the follower increase percentage of "${companyName}". Respond with only the number.`
        break
      case 'facebook_hashtags':
        prompt = `Generate 5 relevant hashtags for "${companyName}" on Facebook. Respond with only the hashtags separated by commas.`
        break
      case 'facebook_content':
        prompt = `Give me a Facebook post content for "${companyName}". Respond with only the content.`
        break
      case 'company_description':
        prompt = `Provide a brief description of the company "${companyName}". Respond with only the description.`
        break
      default:
        return NextResponse.json({ error: "Invalid field specified" }, { status: 400 })
    }

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text().trim()

    if (field.includes('hashtags')) {
      const hashtags = text.split(',').map(tag => tag.trim())
      return NextResponse.json({ [field]: hashtags })
    } else if (field.includes('followers') || field.includes('increase')) {
      return NextResponse.json({ [field]: parseFloat(text) })
    } else {
      return NextResponse.json({ [field]: text })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: "Failed to analyze company", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

