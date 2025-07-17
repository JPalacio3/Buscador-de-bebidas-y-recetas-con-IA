
import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./layouts/Layout";
import Spinner from "../public/spiner/Spinner";
import PageTransition from "./layouts/PageTransition"; // 1. Importa el nuevo componente

const IndexPage = lazy(() => import("./views/IndexPage"));
const FavoritesPage = lazy(() => import("./views/FavoritesPage"));
const GenerateAI = lazy(() => import("./views/GenerateAI"));

export default function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          {/* 2. Envuelve cada página con PageTransition */}
          <Route
            path="/"
            element={
              <PageTransition>
                <Suspense fallback={<Spinner />}>
                  <IndexPage />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/favoritos"
            element={
              <PageTransition>
                <Suspense fallback={<Spinner />}>
                  <FavoritesPage />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/generate"
            element={
              <PageTransition>
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
