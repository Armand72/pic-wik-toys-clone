import React, { FunctionComponent } from "react";
import Carousel from "../components/Carousel";
import CatchPhrase from "../components/Catchphrase";
import DeliveryCarousel from "../components/DeliveryCarousel";
import ToyPresentation from "../components/ToyPresentation";
import Newsletter from "../components/Newsletter";

const Homepage: FunctionComponent = () => {
  return (
    <>
      <Carousel />
      <CatchPhrase />
      <ToyPresentation />
      <DeliveryCarousel />
      <Newsletter />
    </>
  );
};

export default Homepage;
