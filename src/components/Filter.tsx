import classNames from "classnames";

import { useMemo } from "react";
import useFiltersFetch from "../hooks/useFiltersFetch";
import useFixedPositionOnScroll from "../hooks/useFixedPositionOnScroll";
import type { Filter } from "../interfaces/filters.types";
import { useUserSelectionStore } from "../stores/filters.store";
import { useLocalizationStore } from "../stores/locale.store";
import FiltersLoading from "./filters/FiltersLoading";
import Checkbox from "./Checkbox";
import Score from "./Score";

const Filter = () => {
  useFixedPositionOnScroll("filter", 70, 10);

  const { locale } = useLocalizationStore();

  const result = useFiltersFetch();
  const { status, error } = result;
  const filters = useMemo(() => result.filters, [result.filters]);

  const store = useUserSelectionStore();

  const onFilterItemSelected = (filterType: Filter, optionId: string) => {
    store.toggleOption(filterType, optionId);
  };

  return (
    <div id='filter' className={classNames("w-full h-full flex flex-col gap-8")}>
      {error && <div>Error: {error.message}</div>}

      {status === "pending" && <FiltersLoading />}

      {status === "success" &&
        filters.map((filter) => {
          const items = filter.id === "score" ? [...filter.items].reverse() : filter.items;

          return (
            <div key={filter.id} className='flex flex-col gap-2'>
              <h3 className='font-semibold text-lg'>{locale[filter.id]}</h3>

              <ul className='flex flex-col gap-1 ml-2'>
                {items.map((item) => {
                  const label = filter.id === "score" ? null : (locale[item.id] ?? item.id);

                  // TODO: Memoize item:
                  return (
                    <li key={item.id} className='flex flex-row gap-2 items-center'>
                      <Checkbox
                        label={label}
                        onClick={() => onFilterItemSelected(filter.id, item.id)}
                      />

                      {filter.id === "score" && <Score score={parseInt(item.id) - 1} />}

                      <span className='text-xs'>({item.count})</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default Filter;
