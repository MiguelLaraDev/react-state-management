const ImageGallery = () => {
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex flex-row items-center justify-center'>
        <img
          src='/images/instrument_large_example.jpg'
          className='w-full h-auto p-8 md:w-auto md:h-[40vh] image-rendering-smooth'
        />
      </div>
      <div className='w-full h-20 bg-neutral-100'>TODO: Slider here...</div>
    </div>
  );
};

export default ImageGallery;
