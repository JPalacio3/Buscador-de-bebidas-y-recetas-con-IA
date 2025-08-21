import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import { useSwipeable } from "react-swipeable";
import Footer from "../components/Footer";

export default function Layout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);
  const modal = useAppStore((state) => state.modal);
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/", "/favoritos", "/generate"];

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (modal) return;
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      if (modal) return;
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  });

  return (
    <div {...handlers} className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mx-auto py-8 flex-grow">
        <Outlet />
      </main>

      <Modal />
      <Notification />
      <Footer />
    </div>
  );
}
