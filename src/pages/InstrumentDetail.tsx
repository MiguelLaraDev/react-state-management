import ImageGallery from "../components/ImageGallery";
import Score from "../components/Score";
import Button from "../components/ui-toolkit/Button";

const InstrumentDetail = () => {
  return (
    <div className='border border-red-500'>
      <div>
        <Score score={4} />
        <p>811</p>
      </div>

      <img src='/images/brands/logo' alt='??' />

      <ImageGallery />

      <p>B-stock from 66 € available</p>

      <div>
        <p>89 €</p>
        <p>All prices incl. VAT</p>
      </div>

      <p>In stock</p>

      <div>
        <input type='number' value={1} />
        <Button label='ADD TO BASKET' onClick={() => console.log("add to cart")} />
      </div>

      <p>Long description here</p>
    </div>
  );
};

export default InstrumentDetail;
