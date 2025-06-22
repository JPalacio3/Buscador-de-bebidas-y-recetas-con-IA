import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function IndexPage() {
  const drinks = useAppStore((state) => state.drinks);

  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks]);

  return (
    <>
      <h1 className="text-6xl font-extrabold">Recetas</h1>

      {hasDrinks ? (
        <>
          <p>Si hay bebidas</p>
        </>
      ) : (
        <p>No hay bebidas</p>
      )}
    </>
  );
}
