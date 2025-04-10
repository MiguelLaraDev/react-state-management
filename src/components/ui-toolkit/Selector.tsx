import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useRef } from "react";

interface SelectorProps {
  name: string;
  items: {
    id: string;
    label: string;
  }[];
  selected: string;
  onSelect: (id: string) => void;
}

const Selector = ({ selected, name, items, onSelect }: SelectorProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleWrapperClick = () => {
    if (selectRef.current) {
      selectRef.current.focus(); // Needed for some browsers
      selectRef.current.click(); // Triggers the dropdown
    }
  };

  return (
    <div
      className={classNames(
        "relative inline-block w-12 h-12 min-w-20 bg-neutral-200 px-2 rounded-full",
        "flex flex-row items-center justify-center overflow-hidden",
        "cursor-pointer hover:bg-neutral-300"
      )}
      onClick={handleWrapperClick}
    >
      <select
        ref={selectRef}
        name={name}
        className={classNames(
          "ml-4 h-full",
          "appearance-none",
          "focus:outline-none",
          "flex flex-row items-center"
        )}
        defaultValue={selected}
      >
        <option value='' disabled hidden>
          {selected}
        </option>

        {items.map(({ id, label }) => (
          <option key={id} value={id} onClick={() => onSelect(id)} className='pl-4'>
            {label}
          </option>
        ))}
      </select>

      <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
        <FontAwesomeIcon icon={faSort} className='text-neutral-500' />
      </div>
    </div>
  );
};

export default Selector;
