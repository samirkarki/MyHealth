// CatInputs.js

import React from 'react';
import PropTypes from 'prop-types';

const SymptomsInput = ({ idx, symptomsState, handleSymptomsChange }) => {
    const symptomsNameId = `name-${idx}`;
    return (
        <div key={`disease-${idx}`} className="form-group">
            <label htmlFor={symptomsNameId}>{`Symptoms #${idx + 1}`}</label>
            <input
                type="text"
                name={symptomsNameId}
                data-idx={idx}
                id={symptomsNameId}
                className="name form-control"
                value={symptomsState[idx].name}
                onChange={handleSymptomsChange}
            />
        </div>
    );
};

SymptomsInput.propTypes = {
    idx: PropTypes.number,
    symptomsState: PropTypes.array,
    handleSymptomsChange: PropTypes.func,
};

export default SymptomsInput;


