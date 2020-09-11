import React, { FunctionComponent, useState, useEffect } from "react";

import ToyCarousel from "./ToyCarousel";

const ToyPresentation: FunctionComponent = () => {
  return (
    <>
      <div className="presentation">
        <div className="presentation__picture-girl">
          <img src="/images/victoria.png" alt="girl"></img>
        </div>
        <h2 className="presentation__title">
          <span>La sélection de</span>
          <span>Victoria</span>
        </h2>
        <p className="presentation__subtitle">
          Une petite fille d'aujourd'hui, énergique et déterminée !
        </p>
        <p className="presentation__paragraph">
          Comme il fait beau, chez moi c’est concours de sauts sur le trampo !
          Sinon, comme les grands j’ai aussi ma maison : j’y prépare des
          barbecues pour mes peluches, et parfois j'invite aussi mes frères…
          Quand ils sont sages !
        </p>
      </div>

      <ToyCarousel />
    </>
  );
};

export default ToyPresentation;
