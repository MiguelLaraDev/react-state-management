import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import type { InstrumentsApiResponse } from "../interfaces/types";

const fetchItems = async (context: { pageParam?: number }): Promise<InstrumentsApiResponse> => {
  const response = await fetch(`/api/instruments?page=${context.pageParam ?? 0}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const InstrumentsList = () => {
  const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  const instruments = data.pages.flatMap((page) => page.instruments);

  return (
    <div className='w-full flex flex-col gap-4'>
      {instruments.map(({ availability, id, name, score, description, price }) => (
        <div
          key={id}
          className='w-full h-[200px] flex flex-row gap-0 p-0 rounded-xl border border-neutral-200 overflow-hidden'
        >
          <div className='w-1/4 min-w-[142px] h-full bg-white py-6'>
            <img src='/images/img-example.webp' className='w-auto h-full mx-auto' />
          </div>

          <div className='flex flex-col gap-1 flex-grow px-8 py-4'>
            <h2 className='font-semibold text-2xl'>{name}</h2>
            <div>{score}</div>

            <ul>
              <li className='text-neutral-600'>{description}</li>
            </ul>
            <p>{availability}</p>
          </div>

          <div className='w-1/4 flex flex-col items-end justify-between p-8'>
            <p className='font-semibold text-3xl tracking-tighter whitespace-nowrap'>{price} €</p>

            <button>
              <FontAwesomeIcon icon={faCartPlus} className='text-2xl text-neutral-700' />
            </button>
          </div>
        </div>
      ))}
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};

export default InstrumentsList;
