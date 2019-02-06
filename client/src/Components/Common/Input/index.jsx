import React from "react";
import propTypes from "prop-types";
import { Lable, Input } from "./index.style";

export default function index(props) {
  const { type, label, value, onChange, name, width, placeholder } = props;
  return (
    <>
      <Lable htmlFor={name}>
        {label}{" "}
        <Input
          name={name}
          type={type}
          style={{ width }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      </Lable>
    </>
  );
}
index.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func,
  name: propTypes.string.isRequired,
  label: propTypes.string,
  type: propTypes.string,
  width: propTypes.string
};
