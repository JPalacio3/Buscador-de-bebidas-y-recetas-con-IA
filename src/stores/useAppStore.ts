import { create } from "zustand";
import { createRecipeSlice, type RecipesSliceType } from "./recipeSlice";

export const useAppStore = create<RecipesSliceType>((...a) => ({
  ...createRecipeSlice(...a),
}));
