import classNames from "classnames";

const FiltersLoading = () => {
  return (
    <>
      {[0, 1, 2].map((i) => {
        return (
          <div
            key={`filter-ph-${i}`}
            className={classNames(
              "w-3/4 flex flex-col gap-4 mb-6",
              "[&_span]:animate-pulse [&_span]:bg-neutral-100 [&_span]:rounded-lg",
              "[&_span]:h-4 [&_span]:bg-neutral-200 [&_span]:rounded-lg [&_span]:ml-2",
              "[&_span]:first:w-1/2 [&_span]:first:h-6 [&_span]:first:ml-0",
            )}
          >
            <span />
            <span />
            <span />
            <span />
          </div>
        );
      })}
    </>
  );
};

export default FiltersLoading;
