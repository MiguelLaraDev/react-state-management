import { memo } from "react";

import InstrumentItem from "../components/instruments/InstrumentItem";
import useInstrumentFetch from "../hooks/useInstrumentFetch";
import type { Instrument } from "../interfaces/instruments.types";
import Layout from "../shared/Layout";

const List = memo<{ instruments: Instrument[] }>(({ instruments }) => {
  return (
    <>
      {instruments.map((instrument) => (
        <InstrumentItem key={instrument.id} {...instrument} />
      ))}
    </>
  );
});

const InstrumentsList = () => {
  const { instruments, error, isFetchingNextPage, status, ref } = useInstrumentFetch();

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error?.message}</div>;
  }

  if (!instruments) {
    return <div>No data available</div>;
  }

  return (
    /* TODO: Add the number of instruments near the title: */
    <Layout title='Choose your instruments'>
      <div className='w-full h-fit flex flex-col gap-4'>
        <List instruments={instruments} />
        <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      </div>
    </Layout>
  );
};

export default InstrumentsList;
