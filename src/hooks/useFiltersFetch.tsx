import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { FilterOption } from "../interfaces/filters.types";
import type { ApiResponse } from "../interfaces/shared.types";

const fetchItems = async (): Promise<ApiResponse> => {
  const response = await fetch(`/api/filters`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const useFiltersFetch = () => {
  const result = useQuery({ queryKey: ["filters"], queryFn: fetchItems });

  const { data, error, status } = result;

  const filters = useMemo(() => {
    return (data || []) as FilterOption[];
  }, [data]);

  return {
    error,
    filters,
    status,
  };
};

export default useFiltersFetch;
