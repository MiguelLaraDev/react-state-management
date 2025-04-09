import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import useLocalizationFetch from "./hooks/useLocalizationFetch";
import InstrumentsList from "./pages/InstrumentsList";

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
          element: <InstrumentsList />,
        },
        {
          path: "instruments",
          children: [
            {
              index: true,
              element: <InstrumentsList />,
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
