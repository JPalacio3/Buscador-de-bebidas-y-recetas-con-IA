import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import {
  createNotificationSlice,
  type NotificationSliceType,
} from "./notificationSlice";
import type { RecipesSliceType } from "./recipeSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoriteSlice: StateCreator<
  FavoritesSliceType & RecipesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
      // Show Notification
      createNotificationSlice(set, get, api).showNotification({
        text: "Receta eliminada de favoritos",
        error: false,
      });
    } else {
      set({
        favorites: [...get().favorites, recipe],
      });
      // Show Notification
      createNotificationSlice(set, get, api).showNotification({
        text: "Receta agregada a favoritos",
        error: false,
      });
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },

  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },

  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
