import React, { FunctionComponent } from "react";
import Super from "../assets/img/super";

const Loader: FunctionComponent = (props: any) => {
  return (
    <>
      <div className="loader">
        <div className="loader__image">
          <Super />
        </div>
      </div>
    </>
  );
};

export default Loader;
