import { memo } from "react";

import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import InstrumentItem from "../components/instruments/InstrumentItem";
import InstrumentLoading from "../components/instruments/InstrumentLoading";
import SortingBox from "../components/SortingBox";
import useInstrumentFetch from "../hooks/useInstrumentFetch";
import type { Instrument } from "../interfaces/instruments.types";
import { useLocalizationStore } from "../stores/locale.store";
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
  const { instruments, total, error, isFetchingNextPage, status, ref } = useInstrumentFetch();
  const { locale } = useLocalizationStore();
  const { toggleFilter } = useUiStore();

  const title = (
    <span>
      {locale["instruments-page-title"] || "Instruments"}
      <span className='text-2xl text-neutral-500 font-semibold ml-4'>{total}</span>
    </span>
  );

  console.log(title);

  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      {status === "error" && <div>Error: {error?.message}</div>}

      {status === "pending" && <InstrumentLoading />}

      {status === "success" && (
        <>
          <div className='flex flex-row items-center'>
            {/* TODO: Move button to a separate component: */}
            <button
              className={classNames(
                "flex flex-row items-center gap-2 bg-black text-white text-sm px-4 py-1",
                "rounded-4xl md:hidden md:pointer-events-none"
              )}
              onClick={toggleFilter}
            >
              <FontAwesomeIcon icon={faSliders} />
              <p>Filter</p>
            </button>

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
