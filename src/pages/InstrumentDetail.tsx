import classNames from "classnames";
import { Link, useParams } from "react-router-dom";

import ImageGallery from "../components/ImageGallery";
import AvailabilityBadge from "../components/instruments/AvailabilityBadge";
import Score from "../components/Score";
import Button from "../components/ui-toolkit/Button";
import Selector from "../components/ui-toolkit/Selector";
import useInstrumentPrefetch from "../hooks/useInstrumentPrefetch";
import { useCartStore, type CartStoreItem } from "../stores/cart.store";

const quantityItems = () => {
  return Array.from({ length: 10 }).map((_, index) => ({
    id: String(index),
    label: String(index + 1),
  }));
};

const InstrumentDetail = () => {
  const { add } = useCartStore();
  const { slug } = useParams();
  const { data } = useInstrumentPrefetch(slug);

  // TODO: Handle loading and error...
  if (!data) {
    return <div>Ups, no instrument found...</div>;
  }

  const { id, name, image, price, availability, long_description } = data;

  const onCartButtonClicked = () => {
    add({ id, image, name, price, slug } as CartStoreItem);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4'>
      <div id='instrument-details' className='flex flex-col gap-4'>
        <div className='flex flex-row items-center gap-1'>
          <Score score={4} />
          <p className='text-xs text-neutral-500 font-semibold pt-1'>NNN</p>
        </div>

        <Link to='/brand/????' className='w-fit h-fit bg-neutral-100'>
          <img src='/images/brands/brand_example.gif' alt='???' />
        </Link>

        <ImageGallery />

        <p className='text-xl leading-snug tracking-normal text-neutral-700'>{long_description}</p>
      </div>

      <div id='buying-info' className='flex flex-col gap-2 md:gap-4 overflow-hidden'>
        <div className='flex flex-col gap-0 md:gap-1'>
          <p
            className={classNames(
              "flex flex-row justify-start gap-1 font-bold text-5xl text-neutral-900",
              "md:text-6xl"
            )}
          >
            {price} <span className='!text-lg pt-1 md:!text-2xl'>€</span>
          </p>
          <p className='text-sm md:text-base'>All prices incl. VAT</p>
        </div>

        <AvailabilityBadge status={availability} />

        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <Selector
            name='quantity'
            selected='1'
            items={quantityItems()}
            onSelect={() => console.log("onSelect!")}
          />

          <Button label='ADD TO BASKET' size='md' onClick={onCartButtonClicked} />
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;
