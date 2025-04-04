import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import type { Filter } from "../interfaces/filters.types";
import type { Instrument } from "../interfaces/instruments.types";
import type { InstrumentApiResponse } from "../interfaces/shared.types";

const fetchItems = async (context: { pageParam?: number }): Promise<InstrumentApiResponse> => {
  const response = await fetch(`/api/instruments?page=${context.pageParam}?filters=`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const useInstrumentFetch = (filters?: Record<Filter, string[]>) => {
  // TODO: Parse filters, and inject into the fetch:
  console.log("Filters:", filters);

  const { ref, inView } = useInView();

  const { data, error, status, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["instruments"],
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
