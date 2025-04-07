import { faCheck, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";

const items = [
  {
    id: "price-asc",
    label: "Price: low to high",
  },
  {
    id: "price-desc",
    label: "Price: high to low",
  },
  {
    id: "alphabet-asc",
    label: "Alphabet (A-Z)",
  },
  {
    id: "alphabet-desc",
    label: "Alphabet (Z-A)",
  },
];

const SortingBox = () => {
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState("price-asc");

  const toggleDropdown = () => {
    // TODO: Trigger animation here?

    setExpanded((v) => !v);
  };

  const onItemsSelected = (id: string) => {
    setSelected(id);
    setExpanded(false);
  };

  return (
    <div className='w-full h-8 flex flex-row items-center justify-end'>
      <div id='sorting-dropdown' className='relative flex flex-col gap-4'>
        <button
          className={classNames(
            "w-fit h-8 flex flex-row items-center gap-2 px-4",
            "font-semibold",
            "hover:text-violet-700 cursor-pointer"
          )}
          onClick={toggleDropdown}
        >
          {items.find(({ id }) => id === selected)?.label}
          <FontAwesomeIcon icon={faSort} />
        </button>

        {expanded && (
          <ul
            className={classNames(
              "absolute top-10 right-4 py-2 bg-red-300",
              "flex flex-col items-end gap-2",
              "shadow-sm rounded-md bg-white border border-neutral-300"
            )}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className={classNames(
                  "w-full px-4",
                  "flex flex-row items-center gap-2 whitespace-nowrap",
                  "hover:bg-violet-100 cursor-pointer font-thin",
                  { "text-violet-700": selected === item.id }
                )}
                onClick={() => onItemsSelected(item.id)}
              >
                <span className='w-4 h-4 flex flex-row items-center'>
                  {selected === item.id && <FontAwesomeIcon icon={faCheck} />}
                </span>

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
