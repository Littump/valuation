import Layout from "./components/UI/Layout/Layout.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent.jsx";
import { Portfolio } from "./components/Portfolio/Portfolio.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Analysis from "./components/Analysis/Analysis.jsx";
import Login from "./components/Login/Login.jsx";
import Analytics from "./components/Analytics/Analytics.jsx";
import About from "./components/About/About.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <ErrorComponent />,
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
    errorElement: <ErrorComponent />,
  },
  {
    path: "/analysis",
    element: (
      <Layout>
        <Analysis />
      </Layout>
    ),
    errorElement: <ErrorComponent />,
  },
  {
    path: "/analytics",
    element: (
      <Layout>
        <Analytics />
      </Layout>
    ),
    errorElement: <ErrorComponent />,
  },
  {
    path: "/info",
    element: (
      <Layout>
        <Portfolio />
      </Layout>
    ),
    errorElement: <ErrorComponent />,
  },
  {
    path: "/login",
    element: (
      <div className=" dark:bg-dark-400 min-h-[100vh]">
        <Login />
      </div>
    ),
    errorElement: <ErrorComponent />,
  },
]);

function App() {
  let theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "light";
    }
  }, [theme]);
  return <RouterProvider router={router} />;
}

export default App;
