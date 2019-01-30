import React from 'react';
import propTypes from 'prop-types';
import { Lable, Input } from './index.style'

export default function index(props) {
  const {
    type, label, value, onChange, name, width, placeholder
  } = props;
  return (
        <>
          <Lable htmlFor={name}>
            {label}
            {' '}
            :
            <Input
              name={name}
              type={type}
              style={{ width }}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </Lable>
        </>
  );
}
index.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string,
  width: propTypes.string,
};
