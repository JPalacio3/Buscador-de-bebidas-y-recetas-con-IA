import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useAppStore } from "../stores/useAppStore";
import type { Recipe } from "../types";

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite);

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="text-lg font-normal">
            {ingredient} - {measure}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  className="relative transform overflow-hidden rounded-3xl
                 bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8
                 sm:w-full sm:max-w-2xl sm:p-6 bg-white/70 backdrop-blur-sm"
                >
                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {selectedRecipe.strDrink}
                  </DialogTitle>

                  <img
                    src={selectedRecipe.strDrinkThumb}
                    alt={`Imagen de ${selectedRecipe.strDrink}`}
                    className="mx-auto w-96 rounded-3xl shadow-lg"
                  />

                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    {"Ingredientes y cantidades"}
                  </DialogTitle>

                  {renderIngredients()}

                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Instrucciones
                  </DialogTitle>
                  <p className="text-lg bg-white/30 p-2 rounded-xl shadow-sm">
                    {selectedRecipe.strInstructions}
                  </p>
                  <div className="md:flex justify-between">
                    <button
                      type="button"
                      className="text-xl text-center p-2 bg-gray-500 mt-4 rounded-lg
                        shadow-lg mx-auto w-full md:w-1/4 text-white font-extrabold uppercase
                      hover:bg-gray-600 transition-colors"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>

                    <button
                      type="button"
                      className="text-xl text-center p-2 bg-orange-400 mt-4 rounded-lg
                        shadow-lg mx-auto w-full md:w-1/2 text-white font-extrabold uppercase
                      hover:bg-orange-500 transition-colors cursor-pointer"
                      onClick={() => handleClickFavorite(selectedRecipe)}
                    >
                      Agregar a Favoritos
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
