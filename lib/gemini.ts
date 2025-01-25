import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function getCompanyInfo(companyName: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Give me information about ${companyName} in this exact JSON format:
    {
      "name": "company name",
      "description": "brief description",
      "hashtags": ["array of relevant hashtags"],
      "topCompetitors": ["array of top competitors"]
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Remove markdown formatting and extract JSON
    const jsonString = text.replace(/```json\n|\n```/g, '').trim();
    
    try {
      const data = JSON.parse(jsonString);
      return data;
    } catch (parseError) {
      if (parseError instanceof Error) {
        throw new Error(`Invalid JSON format: ${parseError.message}`);
      }
      throw new Error('Failed to parse response');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get company info: ${error.message}`);
    }
    throw new Error("Failed to get company info: Unknown error");
  }
}

export async function analyzeData(data: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const analyses = [];

  try {
    // Step 1: Basic Info Analysis
    const basicInfoPrompt = `Analyze this data: ${JSON.stringify(data)}
    
    Provide basic information in this exact JSON format:
    {
      "name": "company name or null if not found",
      "description": "brief description or null",
      "summary": "brief summary of overall content"
    }`;

    const basicInfoResult = await model.generateContent(basicInfoPrompt);
    const basicInfoText = basicInfoResult.response.text();
    const basicInfo = JSON.parse(basicInfoText.replace(/```json\n|\n```/g, '').trim());
    analyses.push(basicInfo);

    // Step 2: Metrics Analysis
    const metricsPrompt = `For this data: ${JSON.stringify(data)}
    
    Provide metrics in this exact JSON format:
    {
      "followers": number or null,
      "likes": number or null,
      "engagement": "high/medium/low based on available metrics",
      "trending": boolean
    }`;

    const metricsResult = await model.generateContent(metricsPrompt);
    const metricsText = metricsResult.response.text();
    const metrics = JSON.parse(metricsText.replace(/```json\n|\n```/g, '').trim());
    analyses.push(metrics);

    // Combine analyses
    return {
      basicInfo: analyses[0],
      metrics: analyses[1],
      analyzedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error in sequential analysis:', error);
    throw new Error('Failed to complete analysis');
  }
}
