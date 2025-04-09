import { useQueryClient } from "@tanstack/react-query";

const fetchInstrumentById = async (id: number) => {
  const response = await fetch(`/api/instruments/${id}`);

  if (!response.ok) throw new Error("Network response was not ok");

  return response.json();
};

const useInstrumentPrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchInstrument = async (instrumentId: number) => {
    await queryClient.prefetchQuery({
      queryKey: ["instrument", instrumentId],
      queryFn: () => fetchInstrumentById(instrumentId),
      staleTime: 5000,
    });
  };

  return {
    prefetchInstrument,
  };
};

export default useInstrumentPrefetch;
