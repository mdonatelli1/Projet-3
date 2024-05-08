import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "./pages/Admin";
import { BasketProvider } from "./contexts/BasketContext";
import { ModalProvider } from "./contexts/ConnexionContext";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Catalogue from "./pages/Catalogue";
import Page404 from "./pages/404";
import About from "./pages/About";
import Panier from "./pages/Panier";
import "./App.css";
import ArticleDetails from "./pages/ArticleDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profil",
    element: (
      <ModalProvider>
        <Profil />
      </ModalProvider>
    ),
  },
  {
    path: "/admin",
    element: (
      <ModalProvider>
        <Admin />
      </ModalProvider>
    ),
  },
  {
    path: "/catalogue",
    element: <Catalogue />,
  },
  {
    path: "/catalogue/:articleId",
    element: <ArticleDetails />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/panier",
    element: (
      <ModalProvider>
        <BasketProvider>
          <Panier />
        </BasketProvider>
      </ModalProvider>
    ),
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
