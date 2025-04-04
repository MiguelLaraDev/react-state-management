import classNames from "classnames";

import useFiltersFetch from "../hooks/useFiltersFetch";
import useFixedPositionOnScroll from "../hooks/useFixedPositionOnScroll";
import type { Filter } from "../interfaces/filters.types";
import Checkbox from "./Checkbox";

// TODO: Import all locales from an api...
const titles: Record<Filter, string> = {
  category: "Categories",
  price: "Price",
  score: "Score",
  availability: "Availability",
};

const Filter = () => {
  const { filters, status, error } = useFiltersFetch();

  useFixedPositionOnScroll("filter", 70, 10);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div id='filter' className={classNames("w-full h-full flex flex-col gap-8")}>
      {filters.map(({ id, items }) => {
        return (
          <div key={id} className='flex flex-col gap-2'>
            <h3 className='font-semibold text-lg'>{titles[id]}</h3>

            <ul className='flex flex-col gap-0 ml-2'>
              {items.map((item) => (
                <li key={item.id} className='flex flex-row gap-2 items-center'>
                  <Checkbox label={item.id} />
                  <span className='text-xs'>({item.count})</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
