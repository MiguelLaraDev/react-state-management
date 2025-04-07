import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { memo } from "react";

import type { Instrument } from "../../interfaces/instruments.types";
import { useCartStore, type CartStoreItem } from "../../stores/cart.store";
import { availabilityConfig } from "../../utils/configs";
import Score from "../Score";

const InstrumentItem = ({
  availability,
  description,
  id,
  image,
  name,
  price,
  score,
  slug,
}: Instrument) => {
  const { add } = useCartStore();

  const onCartButtonClicked = () => {
    add({ id, image, name, price, slug } as CartStoreItem);
  };

  return (
    <div className='w-full h-[200px] flex flex-row gap-0 p-0 rounded-xl border border-neutral-200 overflow-hidden'>
      <div className='w-1/4 min-w-[142px] h-full bg-white py-6'>
        <img src='/images/img-example.webp' className='w-auto h-full mx-auto' />
      </div>

      <div className='flex flex-col gap-2 flex-grow px-8 py-4'>
        <h2 className='font-semibold text-2xl'>{name}</h2>

        <Score score={score} />

        <ul>
          <li className='text-neutral-600'>{description}</li>
        </ul>

        <p className={classNames("mt-auto", availabilityConfig[availability].color)}>
          {availabilityConfig[availability].label}
        </p>
      </div>

      <div className='w-1/4 flex flex-col items-end justify-between p-8'>
        <p className='font-bold text-3xl tracking-tighter whitespace-nowrap'>{price} €</p>

        <button
          className={classNames(
            "w-12 h-12 rounded-full p-4",
            "flex items-center justify-center",
            "cursor-pointer hover:bg-neutral-200"
          )}
          onClick={onCartButtonClicked}
        >
          <FontAwesomeIcon icon={faCartPlus} className='text-2xl text-neutral-700' />
        </button>
      </div>
    </div>
  );
};
export default memo(InstrumentItem);
