import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import { useSwipeable } from "react-swipeable";

export default function Layout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/", "/favoritos", "/generate"];

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="min-h-screen bg-gray-100 ">
      <Header />

      <main className="container mx-auto py-8">
        <Outlet />
      </main>

      <Modal />
      <Notification />
    </div>
  );
}
