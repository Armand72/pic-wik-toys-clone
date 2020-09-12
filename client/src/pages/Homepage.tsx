import React, { FunctionComponent } from "react";
import Carousel from "../components/Carousel";
import CatchPhrase from "../components/Catchphrase";
import DeliveryCarousel from "../components/DeliveryCarousel";
import ToyPresentation from "../components/ToyPresentation";
import PromoCarousel from "../components/PromoCarousel";
import Newsletter from "../components/Newsletter";
import ScrollTop from "../utils/ScrollTop";

const Homepage: FunctionComponent = () => {
  ScrollTop();
  return (
    <>
      <Carousel />
      <CatchPhrase />
      <PromoCarousel />
      <DeliveryCarousel />
      <ToyPresentation />
      <DeliveryCarousel />
      {/* <Newsletter /> */}
    </>
  );
};

export default Homepage;
