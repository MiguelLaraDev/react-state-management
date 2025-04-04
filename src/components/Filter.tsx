import classNames from "classnames";
import { useRef } from "react";
import useFiltersFetch from "../hooks/useFiltersFetch";
import useFixedPositionOnScroll from "../hooks/useFixedPositionOnScroll";

const Filter = () => {
  const { filters, status, error } = useFiltersFetch();

  const ref = useRef<HTMLDivElement>(null);
  useFixedPositionOnScroll(ref, 70, 10);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div ref={ref} className={classNames("w-full h-full flex flex-col gap-8")}>
      {filters.map(({ title, items }) => {
        return (
          <div key={title} className='flex flex-col gap-2'>
            <h3 className='font-semibold text-lg'>{title}</h3>

            <ul className='flex flex-col gap-0 ml-2'>
              {items.map((item) => (
                <li key={item.label} className='flex flex-row gap-2 items-center'>
                  <input
                    type='checkbox'
                    className={classNames(
                      "relative peer shrink-0",
                      "appearance-none w-6 h-6 border border-neutral-400 rounded-sm bg-white",
                      "mt-1 cursor-pointer",
                      "checked:bg-neutral-100",
                      "focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-neutral-100",
                      "disabled:border-steel-400 disabled:bg-steel-400 disabled:cursor-not-allowed"
                    )}
                  />
                  <svg
                    className='absolute w-4 h-4 mt-1 ml-1 hidden peer-checked:block pointer-events-none'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <label className='font-thin'>
                    {item.label} ({item.count})
                  </label>
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
