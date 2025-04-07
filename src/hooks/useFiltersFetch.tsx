import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { FilterOption } from "../interfaces/filters.types";

const fetchItems = async (): Promise<FilterOption[]> => {
  const response = await fetch(`/api/filters`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const useFiltersFetch = () => {
  const [filters, setFilters] = useState<FilterOption[]>([]);

  const result = useQuery({
    queryKey: ["filters"],
    queryFn: fetchItems,
    enabled: filters.length === 0,
  });

  const { data, error, status } = result;

  useEffect(() => {
    if (filters.length === 0 && status === "success") setFilters(data);
  }, [status, data, filters]);

  return {
    error,
    filters,
    status,
  };
};

export default useFiltersFetch;
