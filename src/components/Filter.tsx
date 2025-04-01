import classNames from "classnames";

const filters = [
  {
    id: 1,
    name: "Categories",
    items: [
      {
        id: 2,
        name: "Guitars",
      },
      {
        id: 3,
        name: "Drums",
      },
      {
        id: 4,
        name: "Keyboards",
      },
      {
        id: 5,
        name: "Microphones",
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
      },
      {
        id: 8,
        name: "$50 - $100",
      },
      {
        id: 9,
        name: "$100 - $200",
      },
      {
        id: 10,
        name: "$200 - $500",
      },
      {
        id: 11,
        name: "$500+",
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
      },
      {
        id: 9,
        name: "Out of stock",
      },
      {
        id: 10,
        name: "Few-left",
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
      },
      {
        id: 10,
        name: "2 stars",
      },
      {
        id: 11,
        name: "3 stars",
      },
      {
        id: 12,
        name: "4 stars",
      },
      {
        id: 13,
        name: "5 stars",
      },
    ],
  },
];

const Filter = () => {
  return (
    <div className='w-full h-full flex flex-col gap-8'>
      {filters.map(({ name, items }) => {
        return (
          <div key={name} className='flex flex-col gap-2'>
            <h2 className='font-semibold text-lg'>{name}</h2>

            <ul className='flex flex-col gap-0 ml-2'>
              {items.map((item) => (
                <li key={item.id} className='flex flex-row gap-2 items-center'>
                  <input
                    type='checkbox'
                    className={classNames(
                      "relative peer shrink-0",
                      "appearance-none w-6 h-6 border border-neutral-400 rounded-sm bg-white",
                      "mt-1",
                      "checked:bg-neutral-100",
                      "focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-neutral-100",
                      "disabled:border-steel-400 disabled:bg-steel-400"
                    )}
                  />
                  <label className='font-thin'>{item.name}</label>
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
