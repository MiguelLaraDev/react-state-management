import classNames from "classnames";

const InstrumentLoading = () => {
  return (
    <>
      <span className="h-8" />

      {[0, 1, 2, 3, 4].map((i) => {
        return (
          <div
            key={`instrument-ph-${i}`}
            className={classNames(
              "w-full h-[200px] flex flex-row gap-0 p-0 rounded-xl",
              "bg-neutral-200",
              "animate-pulse",
            )}
          />
        );
      })}
    </>
  );
};

export default InstrumentLoading;
