// src/layouts/Layout.tsx (Código modificado)

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import Notification from "../components/Notification";
import { useSwipeable } from "react-swipeable"; // 1. Importar el hook

export default function Layout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);
  const navigate = useNavigate(); // Hook para navegar
  const location = useLocation(); // Hook para obtener la ruta actual

  // 2. Definir el orden de las rutas para la navegación por swipe
  const routes = ["/", "/favoritos", "/generate"];

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]); // Buena práctica: agregar dependencias al useEffect

  // 3. Configurar los manejadores de swipe
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = routes.indexOf(location.pathname);
      // Si no es la última página, navega a la siguiente
      if (currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      const currentIndex = routes.indexOf(location.pathname);
      // Si no es la primera página, navega a la anterior
      if (currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true, // Previene el scroll vertical mientras se hace swipe horizontal
    trackMouse: true, // Permite probar con el mouse en el escritorio
  });

  return (
    <>
      <Header />

      {/* 4. Aplicar los manejadores de swipe al contenedor principal */}
      <main {...handlers} className="container mx-auto py-8">
        <Outlet />
      </main>

      <Modal />
      <Notification />
    </>
  );
}
