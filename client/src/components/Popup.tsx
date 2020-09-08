import React, { FunctionComponent } from "react";

const Popup: FunctionComponent = (props: any) => {
  return (
    <>
      <div className={`popup ${props.class}`}>
        <p>{props.message}</p>
      </div>
    </>
  );
};

export default Popup;
