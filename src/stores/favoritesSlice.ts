import type { StateCreator } from "zustand";
import type { Recipe } from "../types";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoriteSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
    } else {
      console.log("Agregando a favoritos");

      set({
        favorites: [...get().favorites, recipe],
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
