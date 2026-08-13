import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import { itemsLoader } from "./DataLoad/loadData";
import BrowseItems from "../pages/BrowseItems/BrowseItems";
import ReportItem from "../pages/ReportItem/ReportItem";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
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
        Component: BrowseItems
      },
      {
        path: "report-item",
        Component: ReportItem,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: DashboardHome,
  },
]);
