import React, { FunctionComponent } from "react";

const Newsletter: FunctionComponent = () => {
  return (
    <>
      <div className="newsletter">
        <p className="newsletter__text">
          Restons en contact, inscrivez-vous à notre newsletter
        </p>
        <div className="newsletter__container">
          <div className="newsletter__icon">
            <p>{">"}</p>
          </div>
          <label className="newsletter__label">Adresse email</label>
          <input className="newsletter__input" />
        </div>
      </div>
    </>
  );
};

export default Newsletter;
