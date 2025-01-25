import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function getCompanyInfo(companyName: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
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
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const analyses = [];

  try {
    // Step 1: Basic Info Analysis
    const basicInfoPrompt = `Analyze this data and provide basic information in this exact JSON format:
    {
      "name": "company name or null if not found",
      "description": "brief description or null",
      "summary": "brief summary of overall content"
    }`;

    const basicInfoResult = await model.generateContent(basicInfoPrompt);
    const basicInfo = JSON.parse(basicInfoResult.response.text().replace(/```json\n|\n```/g, '').trim());
    analyses.push(basicInfo);

    // Step 2: Metrics Analysis
    const metricsPrompt = `Analyze the metrics and provide in this exact JSON format:
    {
      "followers": number or null,
      "likes": number or null,
      "engagement": "high/medium/low based on available metrics",
      "trending": boolean
    }`;

    const metricsResult = await model.generateContent(metricsPrompt);
    const metrics = JSON.parse(metricsResult.response.text().replace(/```json\n|\n```/g, '').trim());
    analyses.push(metrics);

    // Step 3: Sentiment Analysis
    const sentimentPrompt = `Analyze the content sentiment and provide in this exact JSON format:
    {
      "sentiment": "positive/negative/neutral",
      "sentimentScore": number between -1 and 1,
      "keyPhrases": ["array of important phrases"],
      "emotionalTone": "description of emotional tone"
    }`;

    const sentimentResult = await model.generateContent(sentimentPrompt);
    const sentiment = JSON.parse(sentimentResult.response.text().replace(/```json\n|\n```/g, '').trim());
    analyses.push(sentiment);

    // Step 4: Recommendations
    const recommendationsPrompt = `Based on the analysis, provide recommendations in this exact JSON format:
    {
      "recommendations": ["array of actionable recommendations"],
      "improvements": ["array of potential improvements"],
      "opportunities": ["array of identified opportunities"]
    }`;

    const recommendationsResult = await model.generateContent(recommendationsPrompt);
    const recommendations = JSON.parse(recommendationsResult.response.text().replace(/```json\n|\n```/g, '').trim());
    analyses.push(recommendations);

    // Combine all analyses
    return {
      basicInfo: analyses[0],
      metrics: analyses[1],
      sentiment: analyses[2],
      recommendations: analyses[3],
      analyzedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error in sequential analysis:', error);
    throw new Error('Failed to complete analysis');
  }
}
