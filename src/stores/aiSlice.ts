import type { StateCreator } from "zustand";
import AIService from "../services/AIService";
import type { NotificationSliceType } from "./notificationSlice";

export type AISlice = {
  recipe: string;
  isGenerating: boolean;
  generateRecipe: (prompt: string) => Promise<string | null>;
};

export const createAISlice: StateCreator<
  AISlice & NotificationSliceType,
  [],
  [],
  AISlice
> = (set, get) => ({
  recipe: "",
  isGenerating: false,
  generateRecipe: async (prompt) => {
    set({ recipe: "", isGenerating: true });
    try {
      const data = await AIService.generateRecipe(prompt);
      set({ recipe: data, isGenerating: false });
      return data;
    } catch (error: unknown) {
      let errorMessage = "No se recibió respuesta de la IA.";
      if (error instanceof Error) {
        if (error.message.includes("429")) {
          errorMessage =
            "Has alcanzado el límite de solicitudes. Por favor, espera un momento antes de volver a intentarlo.";
        }

        if (error.message.includes("403")) {
          errorMessage =
            "Has alcanzado el límite de solicitudes. Por favor, regresa mañana.";
        }
      }
      get().showNotification({
        text: errorMessage,
        error: true,
      });
      set({ isGenerating: false });
      return null;
    }
  },
});
