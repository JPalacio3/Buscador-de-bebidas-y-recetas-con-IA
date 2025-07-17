import { create } from "zustand";
import { createRecipeSlice, type RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createFavoriteSlice, type FavoritesSliceType } from "./favoritesSlice";
import type { NotificationSliceType } from "./notificationSlice";
import { createNotificationSlice } from "./notificationSlice";
import type { AISlice } from "./aiSlice";
import { createAISlice } from "./aiSlice";

export const useAppStore = create<
  RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISlice
>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a),
  }))
);
