import { Link } from "react-router-dom";

import classNames from "classnames";
import ImageGallery from "../components/ImageGallery";
import Score from "../components/Score";
import Button from "../components/ui-toolkit/Button";

const InstrumentDetail = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <div id='instrument-details' className='flex flex-col gap-4 md:col-span-3'>
        <div className='flex flex-row items-center gap-1'>
          <Score score={4} />
          <p className='text-xs text-neutral-500 font-semibold pt-1'>811</p>
        </div>

        <Link to='/brand/????' className='w-fit h-fit bg-neutral-100'>
          <img src='/images/brands/brand_example.gif' alt='???' />
        </Link>

        <ImageGallery />

        <p className='text-base leading-snug tracking-normal text-neutral-700'>
          Long description here Long description here Long description here Long description here
          Long description here Long description here Long description here Long description here
          Long description here Long description here Long description here Long description
          here{" "}
        </p>
      </div>

      <div id='buying-info' className='flex flex-col gap-2 md:col-span-1 md:gap-4'>
        <div className='flex flex-col gap-0 md:gap-1'>
          <p
            className={classNames(
              "flex flex-row justify-start gap-1 font-bold text-5xl text-neutral-900",
              "md:text-6xl"
            )}
          >
            89 <span className='!text-lg pt-1 md:!text-2xl'>€</span>
          </p>
          <p className='text-sm md:text-base'>All prices incl. VAT</p>
        </div>

        <p
          className={classNames("text-sm md:text-base", {
            "text-green-700": true,
          })}
        >
          In stock
        </p>

        <div className='w-full flex flex-row items-center justify-between gap-4'>
          {/* TODO: It should be a <select></select>: */}
          <input
            type='number'
            className={classNames(
              "w-fit max-w-16 bg-neutral-200 px-4 py-2 rounded-full",
              "appearance-none"
            )}
          />

          <Button label='ADD TO BASKET' onClick={() => console.log("add to cart")} />
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;
