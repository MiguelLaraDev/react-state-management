import Layout from "@/components/Layout";
import Instruments from "@/pages/Instruments";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1 className="text-red-500 text-3xl">Error page</h1>,
    hydrateFallbackElement: <p className="text-green-500 text-3xl">Loading...</p>,
    children: [
      {
        index: true,
        element: <Instruments />,
      },
      {
        path: "instruments",
        children: [
          {
            index: true,
            element: <Instruments />,
          },
          {
            path: ":slug",
            lazy: () =>
              import("@pages/InstrumentDetail").then((module) => ({
                element: <module.default />,
              })),
          },
        ],
      },
    ],
  },
]);
