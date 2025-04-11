import type { FilterOption } from "@interfaces/filters.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchItems = async (): Promise<FilterOption[]> => {
  const response = await fetch("/api/filters");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const useFiltersFetch = () => {
  // TODO: Review it, we have the filters stored twice.
  // In the useState, and in the react-query.
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
