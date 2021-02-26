import React, { useContext, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { GroupBuyContext } from '../store.jsx';

export default function ListingImagesCarousel({ listImages }) {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { listings } = store;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, event) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel id="carousel-listing-images" activeIndex={index} onSelect={handleSelect}>
      {listImages.map((imageSrc) => (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imageSrc}
            alt="..."
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
