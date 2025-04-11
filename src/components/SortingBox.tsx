import { faCheck, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import type { Filter } from "../interfaces/filters.types";
import type { SortDirection } from "../interfaces/shared.types";
import { useUserSelectionStore } from "../stores/filters.store";

type SortingBoxItem = {
  id: string;
  sort: {
    field: Filter | "name";
    direction: SortDirection;
  };
  label: string;
};

const items: SortingBoxItem[] = [
  {
    id: "price-asc",
    sort: { field: "price", direction: "asc" },
    label: "Price: low to high",
  },
  {
    id: "price-desc",
    sort: { field: "price", direction: "desc" },
    label: "Price: high to low",
  },
  {
    id: "alphabet-asc",
    sort: { field: "name", direction: "asc" },
    label: "Alphabet (A-Z)",
  },
  {
    id: "alphabet-desc",
    sort: { field: "name", direction: "desc" },
    label: "Alphabet (Z-A)",
  },
];

const SortingBox = () => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("price-asc");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { updateSortBy } = useUserSelectionStore();

  const toggleDropdown = () => {
    // TODO: Trigger animation here?

    setExpanded((v) => !v);
  };

  const onItemsSelected = (data: SortingBoxItem) => {
    setSelected(data.id);
    setExpanded(false);
    updateSortBy(data.sort);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-8 flex flex-row items-center justify-end">
      <div ref={dropdownRef} id="sorting-dropdown" className="relative flex flex-col gap-4">
        <button className={classNames("w-fit h-8 flex flex-row items-center gap-2 md:px-4", "font-semibold", "hover:text-violet-700 cursor-pointer")} onClick={toggleDropdown}>
          {items.find(({ id }) => id === selected)?.label}
          <FontAwesomeIcon icon={faSort} />
        </button>

        {expanded && (
          <ul className={classNames("absolute top-10 right-4 py-2 bg-red-300", "flex flex-col items-end gap-2", "shadow-sm rounded-md bg-white border border-neutral-300")}>
            {items.map((item) => (
              <li
                key={item.id}
                className={classNames("w-full px-4", "flex flex-row items-center gap-2 whitespace-nowrap", "hover:bg-violet-100 cursor-pointer font-thin", { "text-violet-700": selected === item.id })}
                onClick={() => onItemsSelected(item)}
              >
                <span className="w-4 h-4 flex flex-row items-center">{selected === item.id && <FontAwesomeIcon icon={faCheck} />}</span>

                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortingBox;
