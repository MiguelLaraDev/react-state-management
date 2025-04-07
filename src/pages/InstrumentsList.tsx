import { memo } from "react";

import InstrumentItem from "../components/instruments/InstrumentItem";
import Layout from "../components/Layout";
import useInstrumentFetch from "../hooks/useInstrumentFetch";
import type { Instrument } from "../interfaces/instruments.types";
import { useUserSelectionStore } from "../stores/filters.store";

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
  const options = useUserSelectionStore((state) => state.options);

  const { instruments, error, isFetchingNextPage, status, ref } = useInstrumentFetch(options);

  return (
    /* TODO: Add the number of instruments near the title: */
    <Layout title='Choose your instruments'>
      <div className='w-full h-fit flex flex-col gap-4'>
        {status === "pending" && <div className='text-green-500'>Loading...</div>}

        {status === "error" && <div>Error: {error?.message}</div>}

        <List instruments={instruments || []} />

        <div ref={ref} className='text-red-500'>
          {isFetchingNextPage && "Loading..."}
        </div>
      </div>
    </Layout>
  );
};

export default InstrumentsList;
