import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fetchItems = async ({ pageParam = 0 }) => {
  const response = await fetch(`/api/user?page=${pageParam}`);

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

  console.log(data);

  return (
    <div className='w-full flex flex-col gap-4'>
      {Array.from({ length: 100 }, (_, i) => (
        <div
          key={i}
          className='w-full h-48 flex flex-row gap-0 p-0 rounded-xl border border-neutral-200 overflow-hidden'
        >
          <div className='w-1/4 h-full bg-white py-6'>
            <img src='/images/img-example.webp' className='w-auto h-full mx-auto' />
          </div>

          <div className='flex flex-col gap-1 flex-grow px-8 py-4'>
            <h2 className='font-semibold text-2xl'>Instrument name</h2>
            <div>Instrument rating</div>

            <ul>
              <li className='text-neutral-600'>Instrument description</li>
              <li className='text-neutral-600'>Instrument description</li>
            </ul>
            <p>Instrument Availability</p>
          </div>

          <div className='w-1/4 flex flex-col items-end justify-between p-8'>
            <p className='font-semibold text-3xl tracking-tighter'>300 €</p>

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
