// CatInputs.js

import React from 'react';
import PropTypes from 'prop-types';

const InfectedCountryInput = ({ idx, infectedCountryState, handleInfectedCountryChange }) => {
    const countryNameId = `name-${idx}`;
    return (
        <div key={`disease-${idx}`} className="form-group">
            <label htmlFor={countryNameId}>{`Country #${idx + 1}`}</label>
            <input
                type="text"
                name={countryNameId}
                data-idx={idx}
                id={countryNameId}
                className="name form-control"
                value={infectedCountryState[idx].name}
                onChange={handleInfectedCountryChange}
            />
        </div>
    );
};

InfectedCountryInput.propTypes = {
    idx: PropTypes.number,
    infectedCountryState: PropTypes.array,
    handleInfectedCountryChange: PropTypes.func,
};

export default InfectedCountryInput;

