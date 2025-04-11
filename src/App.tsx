import { RouterProvider } from "react-router-dom";

import useLocalizationFetch from "@hooks/useLocalizationFetch";
import { router } from "./routes/router";

const App = () => {
  useLocalizationFetch();

  return <RouterProvider router={router} />;
};

export default App;
