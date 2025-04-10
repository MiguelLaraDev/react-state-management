import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

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
  return (
    <div
      className={classNames(
        "relative inline-block h-12 min-w-20 bg-neutral-200 rounded-full",
        "flex flex-row items-center justify-center overflow-hidden",
        "cursor-pointer hover:bg-neutral-300"
      )}
    >
      <select
        name={name}
        className={classNames(
          "w-full h-full pl-4 mx-auto",
          "appearance-none cursor-pointer",
          "focus:outline-none"
        )}
        defaultValue={selected}
        onChange={(e) => onSelect(e.currentTarget.value)}
      >
        <option value='' disabled hidden>
          {selected}
        </option>

        {items.map(({ id, label }) => (
          <option key={id} value={id} className='pl-4'>
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
