// CatInputs.js

import React from "react";
import PropTypes from "prop-types";

const SymptomsInput = ({
  idx,
  symptomsState,
  handleSymptomsChange,
  required
}) => {
  const symptomsNameId = `name-${idx}`;
  return (
    <div key={`disease-${idx}`} className="form-group">
      <label htmlFor={symptomsNameId}>{`Symptoms #${idx + 1}`}</label>

      {required ? (
        <input
          type="text"
          name={symptomsNameId}
          data-idx={idx}
          id={symptomsNameId}
          key={symptomsNameId}
          className="name form-control"
          value={symptomsState[idx].name}
          onChange={handleSymptomsChange}
          required
        />
      ) : (
        <input
          type="text"
          name={symptomsNameId}
          data-idx={idx}
          key={symptomsNameId}
          id={symptomsNameId}
          className="name form-control"
          value={symptomsState[idx].name}
          onChange={handleSymptomsChange}
        />
      )}
    </div>
  );
};

SymptomsInput.propTypes = {
  idx: PropTypes.number,
  symptomsState: PropTypes.array,
  handleSymptomsChange: PropTypes.func,
  required: PropTypes.bool
};

export default SymptomsInput;
