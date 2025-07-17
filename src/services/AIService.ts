import { streamText } from "ai";
import { openrouter } from "../lib/ai";

export default {
  async generateRecipe(prompt: string) {
    const result = streamText({
      model: openrouter("google/gemini-2.0-flash-exp:free"),
      prompt: prompt,
    });

    // Obtiene la respuesta de la IA
    return result.textStream;
  },
};
