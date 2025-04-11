import useInstrumentFetch from "@hooks/useInstrumentFetch";
import useInstrumentPrefetch from "@hooks/useInstrumentPrefetch";
import { useLocation, useParams } from "react-router-dom";
import { useLocalizationStore } from "../stores/locale.store";

const MainTitle = () => {
  const { pathname } = useLocation();
  const { locale } = useLocalizationStore();
  const { total } = useInstrumentFetch();
  const { slug } = useParams();
  const { data } = useInstrumentPrefetch(slug);

  const normalizedPathname = pathname.replace(/^\/|\/+$/g, "");
  let title = "";
  let detail = null;

  switch (true) {
    case normalizedPathname === "":
    case normalizedPathname === "instruments":
      title = locale["instruments-page-title"] as string;
      detail = (
        <span className="text-base text-neutral-500 font-semibold ml-4 md:text-2xl">{total}</span>
      );
      break;

    case slug !== undefined:
      title = data?.name || (locale["instrument-detail-default-title"] as string);
      break;

    default:
      title = locale["app-default-title"] as string;
      break;
  }

  return (
    <h1 className="font-semibold text-2xl leading-5 tracking-tight md:text-5xl md:leading-tight">
      {title}
      {detail}
    </h1>
  );
};

export default MainTitle;
