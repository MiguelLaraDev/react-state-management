import useLocalizationFetch from "./hooks/useLocalizationFetch";
import InstrumentsList from "./pages/InstrumentsList";

const App = () => {
  useLocalizationFetch();

  return <InstrumentsList />;
};

export default App;
