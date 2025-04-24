import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { Instrument } from "@interfaces/instruments.types";

const fetchInstrumentById = async (slug: string) => {
  const response = await fetch(`/api/instruments/${slug}`);

  return response.json();
};

const useInstrumentPrefetch = (injectedSlug?: string) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<Instrument[] | null | "error">(null);

  const prefetchInstrument = async (slug: string) => {
    await queryClient.prefetchQuery({
      queryKey: ["instrument", slug],
      queryFn: () => fetchInstrumentById(slug),
      staleTime: 5000,
    });
  };

  const getInstrument = async (slug: string) => {
    const cachedData = queryClient.getQueryData(["instrument", slug]) as Instrument[];

    if (cachedData) {
      setData([cachedData[0]]);
      return cachedData;
    }

    const result = await queryClient.fetchQuery({
      queryKey: ["instrument", slug],
      queryFn: () => fetchInstrumentById(slug),
      staleTime: 5000,
    });

    if (result.error) {
      setData("error");
      return;
    }

    setData(result?.[0] ? result : null);
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
