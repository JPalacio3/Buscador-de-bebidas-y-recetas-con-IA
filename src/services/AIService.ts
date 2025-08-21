export default {
  async generateRecipe(prompt: string): Promise<string> {
    const response = await fetch('/.netlify/functions/generate-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response.' }));
      // Propagate a user-friendly error message
      throw new Error(errorData.error || 'The AI service is currently unavailable.');
    }

    const data = await response.json();
    return data.recipe;
  }
};