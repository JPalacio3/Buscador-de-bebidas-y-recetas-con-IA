import { streamText } from "ai";
import { openrouter } from "../lib/ai";

interface HttpError extends Error {
  response?: {
    status: number;
  };
}

export default {
  async generateRecipe(prompt: string): Promise<string> {
    const maxRetries = 2;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const result = streamText({
          model:
            openrouter("openai/gpt-oss-20b:free") ||
            openrouter("nvidia/llama-3.1-nemotron-ultra-253b-v1:free") ||
            openrouter("tngtech/deepseek-r1t2-chimera:free") ||
            openrouter("google/gemini-2.5-pro-exp-03-25"),
          prompt,
          temperature: 0.7,
        });

        if (!result || !result.textStream) {
          return "Error al generar la receta.";
        }

        let response = "";
        for await (const chunk of result.textStream) {
          response += chunk;
        }

        // Si la respuesta es vacía, devolver mensaje de error
        if (!response.trim()) {
          return "No se recibió respuesta de la IA.";
        }

        return response;
      } catch (error) {
        const httpError = error as HttpError;
        const isRateLimitError = httpError.response?.status === 429;
        if (isRateLimitError && attempt < maxRetries - 1) {
          const delay = Math.pow(2, attempt) * 1000; // Retraso exponencial
          await new Promise((resolve) => setTimeout(resolve, delay));
          attempt++;
        } else {
          throw error;
        }
      }
    }

    return "Error al generar la receta tras múltiples intentos.";
  },
};
