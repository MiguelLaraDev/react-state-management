import { useInfiniteQuery } from "@tanstack/react-query";
import type { InstrumentsApiResponse } from "../interfaces/types";

const useInstrumentFetch = () => {
  const fetchItems = async (context: { pageParam?: number }): Promise<InstrumentsApiResponse> => {
    const response = await fetch(`/api/instruments?page=${context.pageParam ?? 0}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { data, error, status, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["instruments"],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: fetchItems,
  });

  // TODO: Type this return values:
  return {
    data,
    error,
    isFetchingNextPage,
    status,
    fetchNextPage,
  };
};

export default useInstrumentFetch;
