// app/dashboard/api/gemini.js

const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai'); // Import the Gemini API

// Initialize the Gemini API with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash', // Specify your model version here
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    
    // Check if prompt is provided in the body
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    // Define the schema for structured output
    const schema = {
      description: 'List of recipes',
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          recipeName: {
            type: SchemaType.STRING,
            description: 'Name of the recipe',
            nullable: false,
          },
        },
        required: ['recipeName'],
      },
    };

    try {
      // Call Gemini API with prompt and schema
      const result = await model.generateContent(prompt, {
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: schema,
        },
      });

      // Send the response as JSON
      res.status(200).json(result.response.text());
    } catch (error) {
      console.error('Error with Gemini API:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
