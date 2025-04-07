import { useInfiniteQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import type { Filter } from "../interfaces/filters.types";
import type { Instrument } from "../interfaces/instruments.types";
import type { InstrumentApiResponse } from "../interfaces/shared.types";

type InjectedFilters = Record<Filter, string[]>;

const parseFilters = (filters: InjectedFilters) => {
  return Object.entries(filters).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value.join("|")}`,
    ""
  );
};

const fetchItems = async (context: QueryFunctionContext): Promise<InstrumentApiResponse> => {
  const { pageParam, queryKey } = context;
  const urlParams = queryKey[1];
  const url = `/api/instruments?page=${pageParam}${urlParams}`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Network response was not ok");

  return response.json();
};

const useInstrumentFetch = (filters: InjectedFilters) => {
  const { ref, inView } = useInView();
  const urlParams = useMemo(() => parseFilters(filters), [filters]);

  const { data, error, status, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["instruments", urlParams],
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
