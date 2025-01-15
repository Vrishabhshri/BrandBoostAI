import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function getCompanyInfo(companyName: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Provide information about the company "${companyName}" in JSON format. Include the following fields: name, description, hashtags (array), estimatedFollowers, estimatedLikes, topCompetitors (array of names). If any information is not available, use null or an empty array.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Raw Gemini response:", text);

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);
    } catch (parseError: unknown) {
      console.error("Error parsing Gemini response:", parseError);
      // Type guard to ensure parseError is an instance of Error
      if (parseError instanceof Error) {
        throw new Error(`Failed to parse Gemini response: ${parseError.message}. Raw response: ${text}`);
      } else {
        throw new Error(`Failed to parse Gemini response: Unknown error. Raw response: ${text}`);
      }
    }

    if (!parsedResponse || Object.keys(parsedResponse).length === 0) {
      throw new Error("Empty or invalid JSON object returned from Gemini API");
    }

    // Ensure all required fields are present
    const requiredFields = ['name', 'description', 'hashtags', 'estimatedFollowers', 'estimatedLikes', 'topCompetitors'];
    for (const field of requiredFields) {
      if (!(field in parsedResponse)) {
        parsedResponse[field] = field === 'hashtags' || field === 'topCompetitors' ? [] : null;
      }
    }

    return parsedResponse;
  } catch (error: unknown) {
    console.error("Error in getCompanyInfo:", error);
    // Type guard for error to be sure it is an instance of Error
    if (error instanceof Error) {
      throw new Error(`Failed to get company info: ${error.message}`);
    } else {
      throw new Error("Failed to get company info: Unknown error");
    }
  }
}
