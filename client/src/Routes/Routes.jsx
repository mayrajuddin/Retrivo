
import { createBrowserRouter } from "react-router";

import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";

import BrowseItems from "../pages/BrowseItems/BrowseItems";
import ErrorPage from "../pages/ErrorPage";

import DashboardRedirect from "../pages/Dashboard/DashboardRedirect";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyReports from "../pages/Dashboard/MyReports";
import ClaimRequests from "../pages/Dashboard/ClaimRequests";
import OwnershipVerification from "../pages/Dashboard/OwnershipVerification";
import Profile from "../pages/Dashboard/Profile";

import AdminLayout from "../pages/Admin/AdminLayout";
import AdminHome from "../pages/Admin/AdminHome";
import Reports from "../pages/Admin/Reports";
import Users from "../pages/Admin/Users";
import ClaimsVerification from "../pages/Admin/ClaimsVerification";
import AdminProfile from "../components/Admin/AdminProfile";
import ReportItem from "../pages/Dashboard/ReportItem";

import { itemsLoader } from "./DataLoad/loadData";

import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";
import ManageReports from "../pages/Admin/ManageReports";

export const router = createBrowserRouter([
  // =========================
  // MAIN WEBSITE
  // =========================
  {
    id: "root",
    path: "/",
    Component: Root,
    loader: itemsLoader,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "browse-items",
        Component: BrowseItems,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },

  // =========================
  // AUTH
  // =========================
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },

  // =========================
  // PROTECTED DASHBOARD
  // =========================
  {
    path: "/dashboard",
    Component: ProtectedRoute,

    children: [
      {
        index: true,
        Component: DashboardRedirect,
      },

      // USER DASHBOARD HOME
      {
        path: "home",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: DashboardHome,
          },
        ],
      },

      // REPORT ITEM
      {
        path: "report-item",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: ReportItem ,
          },
        ],
      },

      // MY REPORTS
      {
        path: "reports",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: MyReports,
          },
        ],
      },

      // CLAIM REQUESTS
      {
        path: "claims",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: ClaimRequests,
          },
        ],
      },

      // OWNERSHIP VERIFICATION
      {
        path: "verification",
        Component: DashboardLayout,
        loader: itemsLoader,
        children: [
          {
            index: true,
            Component: OwnershipVerification,
          },
        ],
      },

      // USER PROFILE
      {
        path: "profile",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: Profile,
          },
        ],
      },

      // =========================
      // ADMIN ROUTE PROTECTION
      // =========================
      {
        path: "admin",
        Component: AdminRoute,

        children: [
          {
            Component: AdminLayout,

            children: [
              {
                index: true,
                Component: AdminHome,
              },
              {
                path: "manage-reports",
                Component: ManageReports,
              },
              {
                path: "reports",
                Component: Reports,
              },
              {
                path: "users",
                Component: Users,
              },
              {
                path: "claims",
                Component: ClaimsVerification,
              },
              {
                path: "profile",
                Component: AdminProfile,
              },
            ],
          },
        ],
      },
    ],
  },
]);
