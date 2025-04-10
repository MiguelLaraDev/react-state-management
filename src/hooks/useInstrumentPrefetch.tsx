import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { Instrument } from "../interfaces/instruments.types";

const fetchInstrumentById = async (slug: string) => {
  const response = await fetch(`/api/instruments/${slug}`);

  if (!response.ok) throw new Error("Network response was not ok");

  return response.json();
};

const useInstrumentPrefetch = (injectedSlug?: string) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<Instrument | null>(null);

  const prefetchInstrument = async (slug: string) => {
    await queryClient.prefetchQuery({
      queryKey: ["instrument", slug],
      queryFn: () => fetchInstrumentById(slug),
      staleTime: 5000,
    });
  };

  const getInstrument = async (slug: string) => {
    const cachedData = queryClient.getQueryData(["instrument", slug]);

    if (cachedData) {
      return cachedData;
    }

    const result = await queryClient.fetchQuery({
      queryKey: ["instrument", slug],
      queryFn: () => fetchInstrumentById(slug),
      staleTime: 5000,
    });

    setData(result?.[0] || null);
  };

  useEffect(() => {
    if (!injectedSlug) {
      return;
    }

    getInstrument(injectedSlug);
  }, [injectedSlug]);

  return {
    data,
    prefetchInstrument,
  };
};

export default useInstrumentPrefetch;
