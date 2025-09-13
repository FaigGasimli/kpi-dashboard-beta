import React, { lazy, Suspense, useContext } from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));
const Summary = lazy(() => import("../pages/summary/kpisummary"));
const Performance = lazy(() => import("../pages/peformance/performance"));
const Layout = lazy(() => import("../layout/index"));
const Shr = lazy(() => import("../pages/shr/shr"));
const KPI = lazy(() => import("../pages/kpi/index"));
const ShrPerformance = lazy(() =>
  import("../pages/shr/sheperformance/shrperformance")
);
const NewBranch = lazy(() => import("../pages/shr/newbranch//newbranch"));
const TaskManagement = lazy(() => import("../pages/taskmanagement/management"));
const Employees = lazy(() => import("../pages/shr/employees/employees"));
const Profile = lazy(() => import("../pages/profile/index"));
const Finance = lazy(() => import("../pages/finance/index"));
const TechnicalSupport = lazy(() => import("../pages/technical-support/index"));
const UserRoles = lazy(() => import("../pages/user-roles/index"));
const Settings = lazy(() => import("../pages/settings/index"));

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     return <Navigate to="/registration" />;
//   }

//   return children;
// };

export const router = createBrowserRouter([
  {
    path: "/loginform",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/kpisummary",
        element: <Summary />,
      },
      {
        path: "/performance",
        element: <Performance />,
      },
      {
        path: "/shr",
        element: <Shr />,
      },
      {
        path: "/kpi",
        element: <KPI />,
      },
      {
        path: "/shrperfromance",
        element: <ShrPerformance />,
      },
      {
        path: "/management",
        element: <TaskManagement />,
      },
      {
        path: "/newbranch",
        element: <NewBranch />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/finance",
        element: <Finance />,
      },
      {
        path: "/technical-support",
        element: <TechnicalSupport />,
      },
      {
        path: "/user-roles",
        element: <UserRoles />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
