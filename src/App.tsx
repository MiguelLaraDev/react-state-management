import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import useLocalizationFetch from "./hooks/useLocalizationFetch";
import Instruments from "./pages/Instruments";

const App = () => {
  useLocalizationFetch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>Error page</div>,
      hydrateFallbackElement: <p>Loading...</p>,
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
                import("./pages/InstrumentDetail").then((module) => ({
                  element: <module.default />,
                })),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
