import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { memo } from "react";
import { Link } from "react-router-dom";

import useInstrumentPrefetch from "../../hooks/useInstrumentPrefetch";
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
  const { prefetchInstrument } = useInstrumentPrefetch();

  const onCartButtonClicked = () => {
    add({ id, image, name, price, slug } as CartStoreItem);
  };

  return (
    <div
      className={classNames(
        "w-full h-32 flex flex-row gap-0 p-0 rounded-xl border border-neutral-200 overflow-hidden",
        "md:h-[200px]"
      )}
    >
      <div
        className={classNames(
          "w-[120px] min-w-[120px] h-[120px] bg-white py-6",
          "md:w-1/4 md:min-w-[142px] md:h-full"
        )}
      >
        <Link to={slug} onMouseEnter={() => prefetchInstrument(id)}>
          <img src={image} className={"w-auto h-full mx-auto"} />
        </Link>
      </div>

      <Link
        to={slug}
        className='flex-grow hover:[&_h2]:text-violet-700'
        onMouseEnter={() => prefetchInstrument(id)}
      >
        <div
          className={classNames("w-full h-full flex flex-col gap-2 px-0 py-2", "md:px-8 md:py-4")}
        >
          <h2 className='font-semibold text-base md:text-2xl'>{name}</h2>

          <Score score={score} />

          <p className='text-xs text-neutral-600 md:text-base'>{description}</p>

          <p
            className={classNames(
              "mt-auto text-xs md:text-base",
              availabilityConfig[availability].color
            )}
          >
            {availabilityConfig[availability].label}
          </p>
        </div>
      </Link>

      <div
        className={classNames(
          "w-fit flex flex-col items-end justify-between p-2 pr-4",
          "md:w-1/4 md:p-8"
        )}
      >
        <p
          className={classNames(
            "font-bold text-base tracking-tighter whitespace-nowrap",
            "md:text-3xl"
          )}
        >
          {price} €
        </p>

        <button
          className={classNames(
            "w-6 h-6 rounded-full p-0",
            "flex items-center justify-center",
            "cursor-pointer hover:bg-neutral-200",
            "md:p-4 md:w-12 md:h-12"
          )}
          onClick={onCartButtonClicked}
        >
          <FontAwesomeIcon
            icon={faCartPlus}
            className={classNames("text-base text-neutral-700", "md:text-2xl")}
          />
        </button>
      </div>
    </div>
  );
};
export default memo(InstrumentItem);
