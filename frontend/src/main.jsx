import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardHome from "./components/dashboard/DashboardHome.jsx";
import UploadResume from "./components/dashboard/UploadResume.jsx";
import ATSAnalysis from "./components/dashboard/ATSAnalysis.jsx";
import JobMatches from "./components/dashboard/JobMatches.jsx";
import Roadmap from "./components/dashboard/Roadmap.jsx";
import Resume from "./components/dashboard/Resume.jsx";
import setupAxios from "./utils/axiosConfig.js";
import { ToastContainer } from "react-toastify";
import { fetchIpLookup } from "./utils/iplookup.js";
import { Toaster } from "@/components/ui/sonner";

// call setup axios
setupAxios();
fetchIpLookup().then((res) => {
  console.log("ip", res);
  localStorage.setItem("ipLookup", JSON.stringify(res));
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
      {
        path: "analysis",
        element: <ATSAnalysis />,
      },
      {
        path: "jobs",
        element: <JobMatches />,
      },
      {
        path: "roadmap",
        element: <Roadmap />,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Toaster theme="light" />
    <RouterProvider router={router} />,
  </>,
  // </StrictMode>
);
