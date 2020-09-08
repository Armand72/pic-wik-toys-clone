import React, { FunctionComponent } from "react";

const Popup: FunctionComponent = (props: any) => {
  console.log(props);
  return (
    <>
      <div className={`popup ${props.class}`}>
        <p>{props.message}</p>
      </div>
    </>
  );
};

export default Popup;
