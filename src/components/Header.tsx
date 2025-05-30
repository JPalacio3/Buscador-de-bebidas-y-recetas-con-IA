import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Form from "./Form";

export default function Header() {
  const { pathname } = useLocation();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          {/* Logotype */}
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>
          {/* Navegation */}
          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos{" "}
            </NavLink>
          </nav>
        </div>

        {/* Renderiza el formulario solo si estamos en la página de inicio */}
        {isHome && <Form />}
      </div>
    </header>
  );
}
