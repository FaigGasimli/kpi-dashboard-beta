import React, { lazy } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

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
const TaskManagement = lazy(() => import("../pages/taskmanagement/management"));
const Employees = lazy(() => import("../pages/shr/employees/employees"));
const Notifications = lazy(() => import("../pages/notifications/index"));
const Profile = lazy(() => import("../pages/profile/index"));
const Finance = lazy(() => import("../pages/finance/index"));
const TechnicalSupport = lazy(() => import("../pages/technical-support/index"));
const UserRoles = lazy(() => import("../pages/user-roles/index"));
const Settings = lazy(() => import("../pages/settings/index"));
const Trainings = lazy(() => import("../pages/trainings"));
const Benefits = lazy(() => import("../pages/benefits"));

function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/loginform" replace />;
  }
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/loginform",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "kpisummary", element: <Summary /> },
          { path: "performance", element: <Performance /> },
          { path: "shr", element: <Shr /> },
          { path: "kpi", element: <KPI /> },
          { path: "shrperfromance", element: <ShrPerformance /> },
          { path: "management", element: <TaskManagement /> },
          { path: "employees", element: <Employees /> },
          { path: "employees/:id", element: <Employees /> },
          { path: "notifications", element: <Notifications /> },
          { path: "profile", element: <Profile /> },
          { path: "finance", element: <Finance /> },
          { path: "technical-support", element: <TechnicalSupport /> },
          { path: "user-roles", element: <UserRoles /> },
          { path: "settings", element: <Settings /> },
          { path: "dashboard/trainings", element: <Trainings /> },
          { path: "dashboard/trainings/:trainingId", element: <Trainings /> },
          { path: "dashboard/benefits", element: <Benefits /> },
        ],
      },
    ],
  },
]);
