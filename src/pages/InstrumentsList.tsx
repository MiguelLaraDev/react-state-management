import { memo } from "react";

import InstrumentItem from "../components/instruments/InstrumentItem";
import InstrumentLoading from "../components/instruments/InstrumentLoading";
import Layout from "../components/Layout";
import SortingBox from "../components/SortingBox";
import useInstrumentFetch from "../hooks/useInstrumentFetch";
import type { Instrument } from "../interfaces/instruments.types";
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
  const { instruments, error, isFetchingNextPage, status, ref } = useInstrumentFetch();
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
        {status === "error" && <div>Error: {error?.message}</div>}

        {status === "pending" && <InstrumentLoading />}

        {status === "success" && (
          <>
            <SortingBox />

            <List instruments={instruments || []} />
          </>
        )}

        <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      </div>
    </Layout>
  );
};

export default InstrumentsList;
