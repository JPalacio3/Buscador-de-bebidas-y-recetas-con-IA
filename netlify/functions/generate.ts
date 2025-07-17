// netlify/functions/generate.ts (NUEVO ARCHIVO - TU BACKEND)

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  try {
    // 1. Obtiene el prompt del cuerpo de la petición del frontend
    if (!event.body) {
      throw new Error("No se proporcionó un cuerpo en la solicitud.");
    }
    const { prompt } = JSON.parse(event.body);

    // 2. Configura el proveedor de AI aquí, en el servidor, de forma segura
    const openrouter = createOpenRouter({
      // 3. Lee la API key de las variables de entorno del SERVIDOR de Netlify
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const result = await streamText({
      model: openrouter(process.env.MODEL_AI || "google/gemini-flash-1.5:free"),
      prompt: `Eres un experto bartender. Genera una receta de cóctel creativa basada en: "${prompt}". La receta debe incluir un nombre, una lista de ingredientes clara y los pasos detallados para su preparación.`,
    });

    // 4. Convierte el stream a un formato que Netlify pueda devolver
    const stream = result.toAIStream();

    // 5. Devuelve el stream al frontend
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error en la Netlify Function:", error);
    return new Response(
      JSON.stringify({ error: "Error al generar la receta." }),
      {
        status: 500,
      }
    );
  }
};
