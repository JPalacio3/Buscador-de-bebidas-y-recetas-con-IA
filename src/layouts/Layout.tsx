import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import Notification from "../components/Notification";

export default function Layout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  });
  return (
    <>
      {/* Este componente se renderiza en todas las páginas de la aplicación. */}
      <Header />

      {/* Este snippet es la parte dinámica de las páginas que renderiza el contenido de las rutas hijas. */}
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  );
}
