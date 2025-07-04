import { useEffect, useMemo, useState, type FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (Object.values(searchFilters).includes("")) {
      console.error("Por favor, completa todos los campos.");
      return;
    }

    // Consultar las recetas
    searchRecipes(searchFilters);
    // Hacer scroll suave hacia abajo para mostrar los resultados
    window.scrollTo({ top: 720, behavior: "smooth" });
  };

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
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg
            space-y-6"
            onSubmit={(e) => handleSubmit(e)}
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
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                {" "}
                Categoria
              </label>

              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                onChange={handleChange}
                // value={searchFilters.category}
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
              uppercase font-extra-bold w-full p-2 rounded-lg transition-colors duration-300
            hover:shadow-lg hover:shadow-orange-500/50"
            />
          </form>
        )}
      </div>
    </header>
  );
}
