import { useLocation } from "react-router-dom";
import useInstrumentFetch from "../hooks/useInstrumentFetch";
import { useLocalizationStore } from "../stores/locale.store";

const MainTitle = () => {
  const { pathname } = useLocation();
  const { locale } = useLocalizationStore();
  const { total } = useInstrumentFetch();

  const normalizedPathname = pathname.replace(/\/+$/, "");
  let title = "";
  let detail = null;

  switch (true) {
    case normalizedPathname === "/":
    case normalizedPathname === "/instruments":
      title = locale["instruments-page-title"];
      detail = (
        <span className='text-base text-neutral-500 font-semibold ml-4 md:text-2xl'>{total}</span>
      );
      break;

    case /^\/instruments\/[^/]+$/.test(normalizedPathname):
      const slug = normalizedPathname.split("/")[2];
      title = `${slug.replace(/-/g, " ")} corresponding title`; // Dynamic title
      break;

    default:
      title = "Welcome to your instruments store!"; // TODO: Pull it from localization...
      break;
  }

  return (
    <h1 className='font-semibold text-2xl leading-5 tracking-tight md:text-5xl md:leading-tight'>
      {title}
      {detail}
    </h1>
  );
};

export default MainTitle;
