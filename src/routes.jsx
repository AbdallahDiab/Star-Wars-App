import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Home from "./components/appViews/home";
import Login from "./components/authViews/login";
import { Spin } from "antd";

export default function AppRoutes() {
  const isAuthenticated = localStorage.getItem("sw-token");
  const routing = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: isAuthenticated ? (
        <Suspense fallback={<Spin />}>
          <Home />
        </Suspense>
      ) : (
        <Navigate to="/login" />
      ),
    },
  ]);
  return routing;
}
