const InstrumentDetailLoading = () => {
  return (
    <div className="w-full flex flex-col gap-4 md:flex-row">
      <div className="flex-grow flex-1 bg-neutral-200 animate-pulse rounded-xl md:h-128" />
      <div className="flex-grow flex-1 bg-neutral-200 animate-pulse rounded-xl md:h-64" />
    </div>
  );
};

export default InstrumentDetailLoading;
