import type { StateCreator } from "zustand";
import { getCategories } from "../services/RecipeService";
import type { Categories, SearchFilter } from "../types/index";

export type RecipesSliceType = {
  categories: Categories;
  fetchCategories: () => Promise<void>;
  searchRecipes: (SearchFilter: SearchFilter) => Promise<void>;
};
export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },

  searchRecipes: async (SearchFilter) => {
    console.log(SearchFilter);
  },
});
