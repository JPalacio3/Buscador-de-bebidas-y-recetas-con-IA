import type { Drink } from "../types";
import { useAppStore } from "../stores/useAppStore";

type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
  const selectRecipe = useAppStore((state) => state.selectRecipe);

  return (
    <div className="border shadow-lg rounded-xl ">
      <div className="rounded-t-xl overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={`imagen de ${drink.strDrinkThumb}`}
          className="hover:scale-125 transition-transform duration-500 hover:-rotate-2"
        />
      </div>

      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>

        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 text-white mt-5 w-full p-3
          font-bold uppercase text-lg rounded-lg"
          onClick={() => selectRecipe(drink.idDrink)}
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
}
