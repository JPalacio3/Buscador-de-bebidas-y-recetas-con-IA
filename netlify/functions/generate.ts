import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  try {
    if (!event.body) throw new Error("No se proporcionó un cuerpo.");
    const { prompt } = JSON.parse(event.body);

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY, // <-- Lee la clave SECRETA del servidor de Netlify
    });

    const result = await streamText({
      model: openrouter(process.env.MODEL_AI || "google/gemini-flash-1.5:free"),
      //... tu system prompt ...
    });

    return new Response(result.toDataStream(), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error en la Netlify Function:", error);
    return new Response(
      JSON.stringify({ error: "Error al generar la receta." }),
      { status: 500 }
    );
  }
};
