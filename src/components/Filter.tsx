import classNames from "classnames";
import { useRef } from "react";
import useFixedPositionOnScroll from "../hooks/useFixedPositionOnScroll";

const filters = [
  {
    id: 1,
    name: "Categories",
    items: [
      {
        id: 2,
        name: "Guitars",
        amount: 99,
      },
      {
        id: 3,
        name: "Drums",
        amount: 99,
      },
      {
        id: 4,
        name: "Keyboards",
        amount: 99,
      },
      {
        id: 5,
        name: "Microphones",
        amount: 99,
      },
    ],
  },
  {
    id: 6,
    name: "Price range",
    items: [
      {
        id: 7,
        name: "$0 - $50",
        amount: 99,
      },
      {
        id: 8,
        name: "$50 - $100",
        amount: 99,
      },
      {
        id: 9,
        name: "$100 - $200",
        amount: 99,
      },
      {
        id: 10,
        name: "$200 - $500",
        amount: 99,
      },
      {
        id: 11,
        name: "$500+",
        amount: 99,
      },
    ],
  },
  {
    id: 7,
    name: "Availability",
    items: [
      {
        id: 8,
        name: "In stock",
        amount: 99,
      },
      {
        id: 9,
        name: "Out of stock",
        amount: 99,
      },
      {
        id: 10,
        name: "Few-left",
        amount: 99,
      },
    ],
  },
  {
    id: 8,
    name: "Rating",
    items: [
      {
        id: 9,
        name: "1 star",
        amount: 99,
      },
      {
        id: 10,
        name: "2 stars",
        amount: 99,
      },
      {
        id: 11,
        name: "3 stars",
        amount: 99,
      },
      {
        id: 12,
        name: "4 stars",
        amount: 99,
      },
      {
        id: 13,
        name: "5 stars",
        amount: 99,
      },
    ],
  },
];

const Filter = () => {
  const ref = useRef<HTMLDivElement>(null);
  useFixedPositionOnScroll(ref, 70, 10);

  return (
    <div ref={ref} className={classNames("w-full h-full flex flex-col gap-8")}>
      {filters.map(({ name, items }) => {
        return (
          <div key={name} className='flex flex-col gap-2'>
            <h3 className='font-semibold text-lg'>{name}</h3>

            <ul className='flex flex-col gap-0 ml-2'>
              {items.map((item) => (
                <li key={item.id} className='flex flex-row gap-2 items-center'>
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
                    {item.name} ({item.amount})
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
