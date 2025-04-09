import { useMatches, type UIMatch } from "react-router-dom";

const TitleOutlet = () => {
  const matches = useMatches();
  const match = matches.find((m) => (m.handle as Record<string, string>)?.title) as UIMatch<
    string,
    Record<string, string>
  >;

  // const { locale } = useLocalizationStore();
  // const { total } = useInstrumentFetch();

  // const title = (
  //   <span>
  //     {locale["instruments-page-title"] || "Instruments"}
  //     <span className='text-2xl text-neutral-500 font-semibold ml-4'>{total}</span>
  //   </span>
  // );

  const title = match?.handle?.title || "Default Title";

  return <h1>{title}</h1>;
};

export default TitleOutlet;
