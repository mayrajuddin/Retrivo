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

import { itemsLoader } from "./DataLoad/loadData";
import ReportItem from "../pages/Dashboard/ReportItem";
import AdminProfile from "../components/Admin/AdminProfile";

export  const router = createBrowserRouter([
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
  // DASHBOARD ENTRY
  // =========================
  {
    path: "/dashboard",
    Component: DashboardRedirect,
  },

  // =========================
  // USER DASHBOARD
  // =========================
  {
    path: "/dashboard/home",
    Component: DashboardLayout,

    children: [
      {
        index: true,
        Component: DashboardHome,
      },
    ],
  },
  {
    path: "/dashboard/report-item",
    Component: DashboardLayout,
    children:[
      {
        index : true,
        Component: ReportItem,
      },
    ]
  },
  {
    path: "/dashboard/reports",
    Component: DashboardLayout,

    children: [
      {
        index: true,
        Component: MyReports,
      },
    ],
  },

  {
    path: "/dashboard/claims",
    Component: DashboardLayout,

    children: [
      {
        index: true,
        Component: ClaimRequests,
      },
    ],
  },
  
  {
  id: "dash",
  path: "/dashboard/verification",
  Component: DashboardLayout,
  loader: itemsLoader,

  children: [
    {
      index: true,
      Component: OwnershipVerification,
    },
  ],
},

  {
    path: "/dashboard/profile",
    Component: DashboardLayout,

    children: [
      {
        index: true,
        Component: Profile,
      },
    ],
  },

  // =========================
  // ADMIN DASHBOARD
  // =========================
  {
    path: "dashboard/admin",
    Component: AdminLayout,

    children: [
      {
        index: true,
        Component: AdminHome,
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
        path: 'profile',
        Component: AdminProfile
      }
    ],
  },
]);