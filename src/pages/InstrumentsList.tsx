import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

import InstrumentItem from "../components/instruments/InstrumentItem";
import InstrumentLoading from "../components/instruments/InstrumentLoading";
import SortingBox from "../components/SortingBox";
import Button from "../components/ui-toolkit/Button";
import useInstrumentFetch from "../hooks/useInstrumentFetch";
import type { Instrument } from "../interfaces/instruments.types";
import { useUiStore } from "../stores/ui.store";

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
  const { toggleFilter } = useUiStore();

  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      {status === "error" && <div>Error: {error?.message}</div>}

      {status === "pending" && <InstrumentLoading />}

      {status === "success" && (
        <>
          <div className='flex flex-row items-center'>
            <Button
              className='md:hidden md:pointer-events-none'
              label='Filter'
              icon={faSliders}
              onClick={toggleFilter}
            />

            <SortingBox />
          </div>

          <List instruments={instruments || []} />
        </>
      )}

      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};

export default InstrumentsList;
