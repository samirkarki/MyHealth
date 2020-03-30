// CatInputs.js

import React from 'react';
import PropTypes from 'prop-types';

const DiseaseInputs = ({ idx, diseaseState, handleDiseaseChange, required }) => {
    const diseaseNameId = `name-${idx}`;
    return (
        <div key={`disease-${idx}`} className="form-group">
            <label htmlFor={diseaseNameId}>{`Disease #${idx + 1}`}</label>
            {required ? (<input
                type="text"
                name={diseaseNameId}
                data-idx={idx}
                id={diseaseNameId}
                className="name form-control"
                value={diseaseState[idx].name}
                onChange={handleDiseaseChange}
                required
            />) : (
                    <input
                        type="text"
                        name={diseaseNameId}
                        data-idx={idx}
                        id={diseaseNameId}
                        className="name form-control"
                        value={diseaseState[idx].name}
                        onChange={handleDiseaseChange}
                    />
                )}
        </div>
    );
};

DiseaseInputs.propTypes = {
    idx: PropTypes.number,
    diseaseState: PropTypes.array,
    handleDiseaseChange: PropTypes.func,
    required: PropTypes.bool
};

export default DiseaseInputs;


