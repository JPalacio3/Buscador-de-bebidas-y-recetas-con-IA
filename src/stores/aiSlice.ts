import type { StateCreator } from "zustand";
import AIService from "../services/AIService";

export type AISlice = {
  recipe: string;
  isGenerating: boolean;
  generateRecipe: (prompt: string) => Promise<string>;
};

export const createAISlice: StateCreator<AISlice, [], [], AISlice> = (set) => ({
  recipe: "",
  isGenerating: false,
  generateRecipe: async (prompt) => {
    set({ recipe: "", isGenerating: true });
    const data = await AIService.generateRecipe(prompt);
    set({ recipe: data, isGenerating: false });
    return data;
  },
});
