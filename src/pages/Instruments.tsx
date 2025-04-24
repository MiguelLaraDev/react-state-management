import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

import InstrumentsListLoading from "@/components/instruments/InstrumentsListLoading";
import InstrumentItem from "@components/instruments/InstrumentItem";
import SortingBox from "@components/SortingBox";
import useInstrumentFetch from "@hooks/useInstrumentFetch";
import type { Instrument } from "@interfaces/instruments.types";
import { useUiStore } from "@stores/ui.store";
import Button from "@ui-toolkit/Button";

const List = memo<{ instruments: Instrument[] }>(({ instruments }) => {
  return (
    <>
      {instruments.map((instrument) => (
        <InstrumentItem key={instrument.id} {...instrument} />
      ))}
    </>
  );
});

const Instruments = () => {
  const { instruments, error, isFetchingNextPage, status, ref } = useInstrumentFetch();
  const { toggleFilter } = useUiStore();

  return (
    <div className="w-full h-fit flex flex-col gap-4">
      {status === "error" && <div>Error: {error?.message}</div>}

      {status === "pending" && <InstrumentsListLoading />}

      {status === "success" && (
        <>
          <div className="flex flex-row items-center">
            <Button
              className="md:hidden md:pointer-events-none"
              label="Filter"
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

export default Instruments;
