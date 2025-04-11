import classNames from "classnames";
import { useMemo } from "react";
import { isMobile } from "react-device-detect";

import type { Filter } from "../../interfaces/filters.types";
import { useUserSelectionStore } from "../../stores/filters.store";
import { useLocalizationStore } from "../../stores/locale.store";
import { useUiStore } from "../../stores/ui.store";
import useFiltersFetch from "../@hooks/useFiltersFetch";
import useFixedPositionOnScroll from "../@hooks/useFixedPositionOnScroll";
import useScrollDisabled from "../@hooks/useScrollDisable";
import Score from "../Score";
import ButtonClose from "../ui-toolkit/ButtonClose";
import Checkbox from "../ui-toolkit/Checkbox";
import FiltersLoading from "./FiltersLoading";

const Filter = () => {
  const { locale } = useLocalizationStore();

  const result = useFiltersFetch();
  const { status, error } = result;
  const filters = useMemo(() => result.filters, [result.filters]);

  const store = useUserSelectionStore();
  const { filterIsOpen, toggleFilter } = useUiStore();

  useFixedPositionOnScroll(isMobile ? null : "filter", 70, 10);
  useScrollDisabled(isMobile && filterIsOpen);

  const onFilterItemSelected = (filterType: Filter, optionId: string) => {
    store.toggleOption(filterType, optionId);
  };

  return (
    <div
      id="filter"
      className={classNames(
        "w-full h-fit flex flex-col gap-8 z-50 p-4 bg-white",
        "relative -left-[100vw]",
        "pointer-events-auto",
        "transition-transform duration-300 ease-in-out",
        isMobile && {
          "translate-x-0": !filterIsOpen,
          "translate-x-full": filterIsOpen,
        },
        "md:left-0 md:z-1 md:bg-transparent md:p-0",
      )}
    >
      <div className="flex flex-row items-center justify-between visible md:hidden">
        <h2 className="font-semibold text-xl">Filters</h2>

        <ButtonClose onClick={toggleFilter} />
      </div>

      {error && <div>Error: {error.message}</div>}

      {status === "pending" && <FiltersLoading />}

      {status === "success" &&
        filters.map((filter) => {
          const items = filter.id === "score" ? [...filter.items].reverse() : filter.items;

          return (
            <div key={filter.id} className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg">{locale[filter.id] as string}</h3>

              <ul className="flex flex-col gap-1 ml-2">
                {items.map((item) => {
                  const label =
                    filter.id === "score" ? null : ((locale[item.id] as string) ?? item.id);

                  // TODO: Memoize item:
                  return (
                    <li key={item.id} className="flex flex-row gap-2 items-center">
                      <Checkbox
                        label={label}
                        onClick={() => onFilterItemSelected(filter.id, item.id)}
                      />

                      {filter.id === "score" && <Score score={parseInt(item.id) - 1} />}

                      <span className="text-xs">({item.count})</span>
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
