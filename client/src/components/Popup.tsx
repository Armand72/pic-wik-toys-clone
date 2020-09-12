import React, { FunctionComponent } from "react";

export interface Popup {
  class: string;
  message: string;
}

const Popup: FunctionComponent<Popup> = (props) => {
  return (
    <>
      <div className={`popup ${props.class}`}>
        <p>{props.message}</p>
      </div>
    </>
  );
};

export default Popup;
