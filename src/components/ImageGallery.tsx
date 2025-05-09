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
    borderColor: "lightgrey",
    borderWidth: "2px",
    width: 80,
    height: 80,
    useBorder: true,
  },
  slider: {
    mainColor: "lightgrey",
  },
};

const ImageGallery = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    new MlaradevImageGallery(`#${ref.current.id}`, items, options);
  }, [ref]);

  return (
    <div className="w-full flex flex-col">
      <div id="gallery-container" className="w-full h-fit z-0" ref={ref} />
    </div>
  );
};

export default ImageGallery;
