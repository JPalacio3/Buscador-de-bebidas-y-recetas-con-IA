import { useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const { pathname } = useLocation();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-8">
        <div
          className="flex flex-col gap-5 items-center md:flex-row md:justify-between
        md:mt-20"
        >
          {/* Logotype */}
          <div>
            <img className="w-32 " src="/logo.svg" alt="logotipo" />
          </div>
          {/* Navegation */}
          <nav className="flex flex-col items-center md:flex-row gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold md:mb-0"
                  : "text-white uppercase font-bold md:mb-0"
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold mb-4 lg:mb-0"
                  : "text-white uppercase font-bold md:mb-0"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {/* Renderiza el formulario solo si estamos en la página de inicio */}
        {isHome && (
          <form
            action=""
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow-lg
            space-y-6"
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingredientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Busca recetas por nombre o ingredientes. Ej: Vodka, Tequila,
                Café, etc."
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="categories"
                className="block text-white uppercase font-extrabold text-lg"
              >
                {" "}
                Categoria
              </label>

              <select
                id="categories"
                name="categories"
                className="p-3 w-full rounded-lg focus:outline-none"
                defaultValue="-- Seleccione --"
              >
                <option disabled>-- Seleccione --</option>
                {categories.drinks.map((category) => (
                  <option
                    value={category.strCategory}
                    key={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value={"Buscar Recetas"}
              className="cursor-pointer bg-orange-800 hover:bg-orange-700 text-white
              uppercase
            font-extra-bold w-full p-2 rounded-lg transition-colors duration-300
            hover:shadow-lg hover:shadow-orange-500/50"
            />
          </form>
        )}
      </div>
    </header>
  );
}
