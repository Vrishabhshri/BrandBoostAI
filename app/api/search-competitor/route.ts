import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Utility function to fetch data from Gemini
async function fetchGeminiData(prompt: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        });
        
        const response = await result.response;
        const text = response.text();

        // Clean up the response text to ensure it's valid JSON
        const cleanedText = text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        try {
            return JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Failed to parse Gemini response:", cleanedText);
            throw new Error("Invalid JSON response from Gemini");
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const field = searchParams.get("field");

    if (!name) {
        return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    try {
        let prompt = "";

        switch (field) {
            case "social":
                prompt = `You are a data analyst. Provide social media statistics for "${name}" in this exact JSON format:
                {
                    "social": {
                        "followers": 1000000,
                        "likes": 50000,
                        "tweets": 10000
                    },
                    "description": "A brief description of the company in 1-2 sentences",
                    "hashtags": ["#hashtag1", "#hashtag2"],
                    "postingWords": ["word1", "word2", "word3", "word4", "word5"],
                    "commentingWords": ["word1", "word2", "word3", "word4", "word5"]
                }
                
                Important:
                1. Return ONLY the JSON object, no other text
                2. Use realistic numbers based on the company's actual social media presence
                3. Include relevant hashtags the company commonly uses
                4. Provide a concise company description
                5. Include 5 most common words used in the company's posts
                6. Include 5 most common words used in user comments about the company`;
                break;

            default:
                return NextResponse.json({ error: "Invalid field parameter" }, { status: 400 });
        }

        const data = await fetchGeminiData(prompt);

        // Validate the response structure
        if (!data.social || !data.description || !data.hashtags) {
            throw new Error("Invalid response structure from Gemini");
        }

        // Save the response to a file
        const filePath = path.join(process.cwd(), 'public', 'gemini-response.json');
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching Gemini data:", error);
        return NextResponse.json(
            { 
                error: "Failed to fetch company data", 
                details: error instanceof Error ? error.message : "Unknown error" 
            },
            { status: 500 }
        );
    }
}
