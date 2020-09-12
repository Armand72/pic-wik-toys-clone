import React, { FunctionComponent, useState } from "react";

const Newsletter: FunctionComponent = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const switchVisible = () => {
    setVisible(false);
  };
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
          {visible && (
            <label className="newsletter__label">Adresse email</label>
          )}
          <div className="newsletter__button-container">
            <input className="newsletter__input" onFocus={switchVisible} />
            <button className="button button__secondary d-none-maxls button--small ml newsletter__button">
              M'inscrire
              <div></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
