import classNames from "classnames";
import { useParams } from "react-router-dom";

import Filters from "./Filters";

const FiltersWrapper = () => {
  const { slug } = useParams();

  if (slug) {
    return null;
  }

  return (
    <div
      className={classNames(
        "absolute top-0 left-0 right-0 bottom-0 z-50 pointer-events-none",
        "h-dvh overflow-y-scroll",
        "md:relative md:w-1/4 md:h-fit md:overflow-y-auto"
      )}
    >
      <Filters />
    </div>
  );
};

export default FiltersWrapper;
