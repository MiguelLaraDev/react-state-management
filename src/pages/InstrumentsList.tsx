import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import useInstrumentFetch from "../hooks/useInstrumentFetch";
import Layout from "../shared/Layout";
import Score from "../shared/Score";
import { availabilityConfig } from "../utils/configs";

const InstrumentsList = () => {
  const { ref, inView } = useInView();
  const { data, error, isFetchingNextPage, status, fetchNextPage } = useInstrumentFetch();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error?.message}</div>;
  }

  if (!data?.pages) {
    return <div>No data available</div>;
  }

  const instruments = data.pages.flatMap((page) => page.data);

  return (
    <Layout title='Choose your instruments'>
      <div className='w-full flex flex-col gap-4'>
        {instruments.map(({ availability, name, score, description, price }) => (
          <div
            key={name}
            className='w-full h-[200px] flex flex-row gap-0 p-0 rounded-xl border border-neutral-200 overflow-hidden'
          >
            <div className='w-1/4 min-w-[142px] h-full bg-white py-6'>
              <img src='/images/img-example.webp' className='w-auto h-full mx-auto' />
            </div>

            <div className='flex flex-col gap-2 flex-grow px-8 py-4'>
              <h2 className='font-semibold text-2xl'>{name}</h2>

              <Score score={score} />

              <ul>
                <li className='text-neutral-600'>{description}</li>
              </ul>

              <p className={classNames("mt-auto", availabilityConfig[availability].color)}>
                {availabilityConfig[availability].label}
              </p>
            </div>

            <div className='w-1/4 flex flex-col items-end justify-between p-8'>
              <p className='font-bold text-3xl tracking-tighter whitespace-nowrap'>{price} €</p>

              <button>
                <FontAwesomeIcon icon={faCartPlus} className='text-2xl text-neutral-700' />
              </button>
            </div>
          </div>
        ))}
        <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      </div>
    </Layout>
  );
};

export default InstrumentsList;
