const InstrumentDetailLoading = () => {
  return (
    <div className="w-full flex flex-col gap-4 md:flex-row md:h-32">
      <div className="flex-grow flex-1 bg-neutral-200 animate-pulse rounded-xl" />
      <div className="flex-grow flex-1 bg-neutral-200 animate-pulse rounded-xl" />
    </div>
  );
};

export default InstrumentDetailLoading;
