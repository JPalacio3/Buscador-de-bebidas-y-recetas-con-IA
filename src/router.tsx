import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Spinner from "../public/spiner/Spinner";

const FavoritesPage = lazy(() => import("./views/FavoritesPage"));
const IndexPage = lazy(() => import("./views/IndexPage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <IndexPage />
              </Suspense>
            }
            index
          ></Route>

          <Route
            path="/favoritos"
            element={
              <Suspense fallback={<Spinner />}>
                <FavoritesPage />
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
