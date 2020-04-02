import React from "react";
import PropTypes from "prop-types";

const CustomInput = ({
  idx,
  inputState,
  handleChange,
  required,
  title,
  value,
  extraClass = ""
}) => {
  const inputNameId = `name-${idx}`;
  return (
    <div key={`${title}-${idx}`} className={`form-group ${extraClass}`}>
      <label htmlFor={inputNameId}>{`${title}`}</label>
      {required ? (
        <input
          type="text"
          name={inputNameId}
          data-idx={idx}
          id={inputNameId}
          key={inputNameId}
          className={`name form-control`}
          value={value}
          onChange={handleChange}
          required
        />
      ) : (
        <input
          type="text"
          name={inputNameId}
          data-idx={idx}
          id={inputNameId}
          key={inputNameId}
          className={`name form-control`}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

CustomInput.propTypes = {
  idx: PropTypes.number,
  inputState: PropTypes.array,
  handleChange: PropTypes.func,
  required: PropTypes.bool
};

export default CustomInput;
