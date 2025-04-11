import classNames from "classnames";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { Link, useParams } from "react-router-dom";

import ImageGallery from "@components/ImageGallery";
import AvailabilityBadge from "@components/instruments/AvailabilityBadge";
import Score from "@components/Score";
import useInstrumentPrefetch from "@hooks/useInstrumentPrefetch";
import { useCartStore, type CartStoreItem } from "@stores/cart.store";
import Button from "@ui-toolkit/Button";
import Selector from "@ui-toolkit/Selector";

interface QuantityItem {
  id: string;
  label: string;
}

const getQuantityItems = (): QuantityItem[] => {
  return Array.from({ length: 10 }).map((_, index) => ({
    id: String(index + 1),
    label: String(index + 1),
  }));
};

const quantityItems = getQuantityItems();

const InstrumentDetail = () => {
  const { add } = useCartStore();
  const { slug } = useParams();
  const { data } = useInstrumentPrefetch(slug);
  const [quantity, setQuantity] = useState<string>(quantityItems[0].id);

  if (!data) {
    return <div className="text-green-700 text-2xl">...loading</div>;
  }

  if (data?.length === 0) {
    return <div className="text-red-700 text-2xl">Ups, no instrument found...</div>;
  }

  const { id, name, image, price, availability, long_description, reviewers } = data[0];

  const onCartButtonClicked = () => {
    add({ id, image, name, price, slug } as CartStoreItem, parseInt(quantity));
  };

  const description = (
    <p className="text-xl leading-snug tracking-normal text-neutral-700">{long_description}</p>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
      <div id="instrument-details" className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-1">
          <Score score={4} />
          <p className="text-xs text-neutral-500 font-semibold pt-1">{reviewers}</p>
        </div>

        <Link to="/brand/????" className="w-fit h-fit bg-neutral-100">
          <img src="/images/brands/brand_example.gif" alt="???" />
        </Link>

        <ImageGallery />

        {!isMobile && description}
      </div>

      <div id="buying-box" className="flex flex-col gap-2 md:gap-4 overflow-hidden">
        <div className="flex flex-col gap-0 md:gap-1">
          <p
            className={classNames(
              "flex flex-row justify-start gap-1 font-bold text-5xl text-neutral-900",
              "md:text-6xl",
            )}
          >
            {price} <span className="!text-lg pt-1 md:!text-2xl">€</span>
          </p>
          <p className="text-sm md:text-base">All prices incl. VAT</p>
        </div>

        <AvailabilityBadge status={availability} />

        <div className="w-full flex flex-row items-center justify-between gap-4">
          <Selector
            name="quantity"
            selected={quantity}
            items={quantityItems}
            onSelect={setQuantity}
          />

          <Button label="ADD TO BASKET" size="md" onClick={onCartButtonClicked} />
        </div>
      </div>

      {isMobile && description}
    </div>
  );
};

export default InstrumentDetail;
