import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useLocalizationStore } from "../stores/locale.store";

const fetchItems = async (): Promise<Record<string, string>> => {
  const response = await fetch("/api/locale");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const useLocalizationFetch = () => {
  const { locale, setStrings } = useLocalizationStore();

  const { data } = useQuery({
    queryKey: ["locale"],
    queryFn: fetchItems,
    enabled: Object.keys(locale).length === 0,
  });

  useEffect(() => {
    setStrings(data || {});
  }, [data, setStrings]);
};

export default useLocalizationFetch;
