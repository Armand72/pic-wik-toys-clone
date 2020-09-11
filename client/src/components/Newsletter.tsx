import React, { FunctionComponent, useState } from "react";

const Newsletter: FunctionComponent = () => {
  const [visible, setVisible] = useState(true);

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
          <input className="newsletter__input" onFocus={switchVisible} />
        </div>
      </div>
    </>
  );
};

export default Newsletter;
