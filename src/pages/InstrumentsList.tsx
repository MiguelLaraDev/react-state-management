import { memo } from "react";

import InstrumentItem from "../components/instruments/InstrumentItem";
import Layout from "../components/Layout";
import useInstrumentFetch from "../hooks/useInstrumentFetch";
import type { Instrument } from "../interfaces/instruments.types";
import { useUserSelectionStore } from "../stores/filters.store";
import { useLocalizationStore } from "../stores/locale.store";

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

  const { locale } = useLocalizationStore();

  const title = (
    <span>
      {locale["instruments-page-title"] || "Instruments"}
      {/* TODO: Add the number of instruments near the title: */}
      <span className='text-lg text-neutral-500 font-semibold ml-2'>(NNN)</span>
    </span>
  );

  return (
    <Layout title={title}>
      <div className='w-full h-fit flex flex-col gap-4'>
        {status === "pending" && <h1 className='text-green-500 text-5xl'>Loading...</h1>}

        {status === "error" && <div>Error: {error?.message}</div>}

        <List instruments={instruments || []} />

        <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      </div>
    </Layout>
  );
};

export default InstrumentsList;
