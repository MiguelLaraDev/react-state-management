import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import type { InstrumentsApiResponse } from "../interfaces/types";

const fetchItems = async (context: { pageParam?: number }): Promise<InstrumentsApiResponse> => {
  const response = await fetch(`/api/instruments?page=${context.pageParam}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const useInstrumentFetch = () => {
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
    return data?.pages.flatMap((page) => page.data) || null;
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
