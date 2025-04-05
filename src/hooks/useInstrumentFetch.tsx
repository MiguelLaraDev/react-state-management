import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import type { Filter } from "../interfaces/filters.types";
import type { Instrument } from "../interfaces/instruments.types";
import type { InstrumentApiResponse } from "../interfaces/shared.types";

const convertFiltersToQueryParam = (filters: Record<Filter, string[]>) => {
  return Object.entries(filters).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value.join("|")}`,
    ""
  );
};

const useInstrumentFetch = (filters: Record<Filter, string[]>) => {
  console.log(filters);

  const { ref, inView } = useInView();

  const fetchItems = async (context: { pageParam?: number }): Promise<InstrumentApiResponse> => {
    const param = convertFiltersToQueryParam(filters);
    const url = `/api/instruments?page=${context.pageParam}&${param}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Network response was not ok");

    return response.json();
  };

  const { data, error, status, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["instruments" /* filters */],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: fetchItems,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const instruments = useMemo(() => {
    return data?.pages.flatMap((page) => page.data as Instrument[]) || null;
  }, [data]);

  return {
    error,
    instruments,
    isFetchingNextPage,
    status,
    ref,
  };
};

export default useInstrumentFetch;
