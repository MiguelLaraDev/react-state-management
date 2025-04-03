import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import InstrumentItem from "../components/instruments/InstrumentItem";
import useInstrumentFetch from "../hooks/useInstrumentFetch";
import Layout from "../shared/Layout";

const InstrumentsList = () => {
  const { ref, inView } = useInView();

  const { instruments, error, isFetchingNextPage, status, fetchNextPage } = useInstrumentFetch();

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

  if (!instruments) {
    return <div>No data available</div>;
  }

  console.log("render:", new Date().toISOString());

  return (
    <Layout title='Choose your instruments'>
      <div className='w-full flex flex-col gap-4'>
        {instruments.map((instrument) => (
          <InstrumentItem key={instrument.id} {...instrument} />
        ))}
        <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      </div>
    </Layout>
  );
};

export default InstrumentsList;
