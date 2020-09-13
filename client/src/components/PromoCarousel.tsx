import React, { FunctionComponent } from "react";

const images = [
  "/images/promo1.jpg",
  "/images/promo2.jpg",
  "/images/promo3.jpg",
];

const PromoCarousel: FunctionComponent = () => {
  return (
    <>
      <div className="PromoCarousel">
        <div className="PromoCarousel__items">
          <img src={images[0]} alt="promo1" />
        </div>
        <div className="PromoCarousel__items">
          <img src={images[1]} alt="promo1" />
        </div>
        <div className="PromoCarousel__items">
          <img src={images[2]} alt="promo1" />
        </div>
      </div>
    </>
  );
};

export default PromoCarousel;
