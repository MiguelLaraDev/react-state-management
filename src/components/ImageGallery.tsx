import { useEffect, useRef } from "react";

import MlaradevImageGallery from "mlaradev-image-gallery";

const items = [
  {
    id: "pic-1",
    alt: "Example pic",
    sizes: {
      thumbnail: "https://thumbs.static-thomann.de/thumb/thumb110x110/pics/prod/428224.webp",
      large:
        "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_42/428224/17105803_800.jpg",
    },
  },
  {
    id: "pic-2",
    alt: "Example pic",
    sizes: {
      thumbnail:
        "https://thumbs.static-thomann.de/thumb/thumb110x110/pics/bdb/_42/428224/17111548_800.jpg",
      large:
        "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_42/428224/17111548_800.jpg",
    },
  },
];

const options = {
  thumbs: {
    borderColor: "red",
    borderWidth: "2px",
    width: 80,
    height: 80,
    useBorder: true,
  },
  slider: {
    mainColor: "red",
  },
};

const ImageGallery = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const gallery = new MlaradevImageGallery(ref.current.id, items, options);
  }, [ref]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row items-center justify-center">
        <img
          src="/images/instrument_large_example.jpg"
          className="w-full h-auto p-8 md:w-auto md:h-[40vh] image-rendering-smooth"
        />
      </div>
      <div
        id="gallery-container"
        className="w-full h-20 bg-neutral-100 text-xs text-neutral-400"
        ref={ref}
      >
        TODO: Image slider here...
      </div>
    </div>
  );
};

export default ImageGallery;
