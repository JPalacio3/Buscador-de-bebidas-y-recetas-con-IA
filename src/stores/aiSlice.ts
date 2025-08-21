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
      // The service now calls our secure backend
      const data = await AIService.generateRecipe(prompt);
      set({ recipe: data, isGenerating: false });
      return data;
    } catch (error: unknown) {
      // The error message is now propagated from our backend service
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      
      get().showNotification({
        text: errorMessage,
        error: true,
      });
      set({ isGenerating: false });
      return null;
    }
  },
});