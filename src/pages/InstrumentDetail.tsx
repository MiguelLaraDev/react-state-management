import { Link } from "react-router-dom";

import classNames from "classnames";
import ImageGallery from "../components/ImageGallery";
import Score from "../components/Score";
import Button from "../components/ui-toolkit/Button";

const InstrumentDetail = () => {
  return (
    <div
      className={classNames(
        "w-full h-fit flex flex-col gap-4 border border-red-500",
        "[&>div]:border [&_div]:border-violet-500"
      )}
    >
      <div id='instrument-details' className='flex flex-col gap-4'>
        <div className='flex flex-row items-center gap-1'>
          <Score score={4} size='???' />
          <p className='text-xs text-neutral-500 font-semibold pt-1'>811</p>
        </div>

        <Link to='/brand/????' className='w-fit min-w-24 h-12 bg-neutral-100'>
          <img src='/images/brands/logo' alt='???' />
        </Link>

        <ImageGallery />

        <p className='text-base leading-snug tracking-normal text-neutral-700'>
          Long description here Long description here Long description here Long description here
          Long description here Long description here Long description here Long description here
          Long description here Long description here Long description here Long description
          here{" "}
        </p>
      </div>

      <div id='buying-info' className='flex flex-col gap-2'>
        <div className='flex flex-col gap-0'>
          <p className='flex flex-row justify-start gap-1 font-bold text-5xl text-neutral-900'>
            89 <span className='!text-lg pt-1'>€</span>
          </p>
          <p className='text-sm'>All prices incl. VAT</p>
        </div>

        <p
          className={classNames("text-sm", {
            "text-green-700": true,
          })}
        >
          In stock
        </p>

        <div className='flex flex-row items-center justify-between'>
          <input type='number' value={1} />

          <Button label='ADD TO BASKET' onClick={() => console.log("add to cart")} />
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;
