import type { Handler } from "@netlify/functions";

const getApiKey = () => {
  const apiKeys = process.env.OPENROUTER_API_KEYS;
  if (!apiKeys) {
    return null;
  }
  const keys = apiKeys.split(',').map(key => key.trim()).filter(Boolean);
  if (keys.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
};

const makeApiCall = async (prompt: string, apiKey: string) => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = new Error(`API call failed: ${response.statusText}`);
    (error as any).statusCode = response.status;
    throw error;
  }
  return response.json();
};

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'No API keys configured. Please set the OPENROUTER_API_KEYS environment variable.' }) };
  }

  try {
    const { prompt } = JSON.parse(event.body || '{}');
    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Prompt is required.' }) };
    }

    const data = await makeApiCall(prompt, apiKey);
    const recipeText = data.choices?.[0]?.message?.content;

    if (!recipeText) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to extract recipe from AI response.' }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipe: recipeText }),
    };

  } catch (error: any) {
    console.error("Error in serverless function:", error);

    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'An internal server error occurred.';

    return {
      statusCode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: errorMessage })
    };
  }
};

export { handler };