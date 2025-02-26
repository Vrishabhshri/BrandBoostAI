import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Utility function to fetch data from Gemini
async function fetchGeminiData(prompt: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
        });

        const result = await response.response;
        const text = result.text();

        if (!text || !text.startsWith("{")) {
            throw new Error("Unexpected Gemini API response");
        }

        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return null;
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const field = searchParams.get("field"); // Determines which data to fetch

    if (!name) {
        return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    let prompt = "";
    let responseKey = "";

    switch (field) {
        case "title":
            prompt = `Find the official title of the company "${name}". Respond with { "title": "Company Title" }`;
            responseKey = "title";
            break;

        case "description":
            prompt = `Give a brief description of the company "${name}". Respond with { "description": "Company Description" }`;
            responseKey = "description";
            break;

        case "social":
            prompt = `Provide the company's social media statistics for "${name}". Respond with { "social": { "followers": 1000000, "likes": 50000, "tweets": 10000 } }`;
            responseKey = "social";
            break;

        case "competitors":
            prompt = `List the top competitors of "${name}". Respond with { "competitors": ["Competitor1", "Competitor2"] }`;
            responseKey = "competitors";
            break;

        case "hashtags":
            prompt = `Find the most relevant hashtags related to "${name}". Respond with { "hashtags": ["#hashtag1", "#hashtag2"] }`;
            responseKey = "hashtags";
            break;

        default:
            return NextResponse.json({ error: "Invalid field parameter" }, { status: 400 });
    }

    try {
        // Fetch data from Gemini API
        const geminiApiKey = process.env.GEMINI_API_KEY; // Ensure this is set in your .env file
        const geminiEndpoint = `https://geminiapi.com/v1/search?query=${encodeURIComponent(name)}`;

        const response = await fetch(geminiEndpoint, {
            headers: { Authorization: `Bearer ${geminiApiKey}` },
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Save the response to a file
        const filePath = path.join(process.cwd(), 'public', 'gemini-response.json');
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching Gemini data:", error);
        return NextResponse.json({ error: "Failed to fetch company data" }, { status: 500 });
    }
}
