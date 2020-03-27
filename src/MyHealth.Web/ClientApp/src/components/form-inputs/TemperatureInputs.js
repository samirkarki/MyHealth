// CatInputs.js

import React from 'react';
import PropTypes from 'prop-types';

const TemperatureInputs = ({ idx, temperatureState, handleTemperatureChange }) => {
    const temperatureNameId = `name-${idx}`;
    return (
        <div key={`disease-${idx}`} className="form-group">
            <label htmlFor={temperatureNameId}>{`Temperature #${idx + 1}`}</label>
            <input
                type="text"
                name={temperatureNameId}
                data-idx={idx}
                id={temperatureNameId}
                className="name form-control"
                value={temperatureState[idx].name}
                onChange={handleTemperatureChange}
            />
        </div>
    );
};

TemperatureInputs.propTypes = {
    idx: PropTypes.number,
    temperatureState: PropTypes.array,
    handleTemperatureChange: PropTypes.func,
};

export default TemperatureInputs;


