import React, { FunctionComponent } from "react";

export interface Props {
  label: string;
  name: string;
  getData: any;
  type?: string;
}

const Input: FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="input">
        <label className="input__label text--small">{props.label}</label>
        <input
          className="input__input"
          onChange={props.getData}
          name={props.name}
          type={props.type}
        />
      </div>
    </>
  );
};

export default Input;
