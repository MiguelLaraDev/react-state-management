import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Instrument } from "../interfaces/instruments.types";

const fetchInstrumentById = async (id: number) => {
  const response = await fetch(`/api/instruments/${id}`);

  if (!response.ok) throw new Error("Network response was not ok");

  return response.json();
};

const useInstrumentPrefetch = () => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<Instrument | null>(null);

  const prefetchInstrument = async (instrumentId: number) => {
    await queryClient.prefetchQuery({
      queryKey: ["instrument", instrumentId],
      queryFn: () => fetchInstrumentById(instrumentId),
      staleTime: 5000,
    });
  };

  const getInstrument = async (instrumentId: number) => {
    // Check cache first
    // const cachedData = queryClient.getQueryData(["instrument", instrumentId]);
    // if (cachedData) {
    //   return cachedData;
    // }

    // If not in cache, fetch fresh data
    const result = await queryClient.fetchQuery({
      queryKey: ["instrument", instrumentId],
      queryFn: () => fetchInstrumentById(instrumentId),
      staleTime: 5000,
    });

    console.log("result: ", result?.[0] || null);

    setData(result?.[0] || null);
  };

  return {
    prefetchInstrument,
    getInstrument,
    data,
  };
};

export default useInstrumentPrefetch;
