import { lazy, Suspense, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./layouts/Layout";
import Spinner from "./components/Spinner";
import PageTransition from "./layouts/PageTransition";

const IndexPage = lazy(() => import("./views/IndexPage"));
const FavoritesPage = lazy(() => import("./views/FavoritesPage"));
const GenerateAI = lazy(() => import("./views/GenerateAI"));

const routesOrder = ["/", "/favoritos", "/generate"];

export default function AppRouter() {
  const location = useLocation();

  const prevIndexRef = useRef(routesOrder.indexOf(location.pathname));

  const currentIndex = routesOrder.indexOf(location.pathname);

  const direction = currentIndex >= prevIndexRef.current ? 1 : -1;

  prevIndexRef.current = currentIndex;

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PageTransition direction={direction}>
                <Suspense fallback={<Spinner />}>
                  <IndexPage />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/favoritos"
            element={
              <PageTransition direction={direction}>
                <Suspense fallback={<Spinner />}>
                  <FavoritesPage />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/generate"
            element={
              <PageTransition direction={direction}>
                <Suspense fallback={<Spinner />}>
                  <GenerateAI />
                </Suspense>
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
