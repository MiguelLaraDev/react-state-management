import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import useLocalizationFetch from "./hooks/useLocalizationFetch";
import InstrumentDetail from "./pages/InstrumentDetail";
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
          // handle: {
          //   title: <h1>TODO: Make it dynamic...</h1>,
          // },
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
              element: <InstrumentDetail />,
              // lazy: () => import("./pages/InstrumentDetail"),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
