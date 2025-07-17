// src/services/AIService.ts (CORREGIDO)
export default {
  async generateRecipe(prompt: string) {
    // La llamada ahora es a tu propia función segura
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok || !response.body) {
      throw new Error("La petición a la función de Netlify falló.");
    }

    return response.body; // Devuelve el stream
  },
};
