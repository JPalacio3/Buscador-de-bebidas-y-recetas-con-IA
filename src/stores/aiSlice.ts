import type { StateCreator } from "zustand";
import AIService from "../services/AIService";

export type AISlice = {
  recipe: string;
  generateRecipe: (promp: string) => Promise<void>;
};

export const createAISlice: StateCreator<AISlice, [], [], AISlice> = () => ({
  recipe: "",
  generateRecipe: async (prompt) => {
    await AIService.generateRecipe(prompt);
  },
});
