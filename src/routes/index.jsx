import React, { lazy, Suspense, useContext } from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));


// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     return <Navigate to="/registration" />;
//   }

//   return children;
// };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/loginform",
    element: <Login/>,
  },
]);
