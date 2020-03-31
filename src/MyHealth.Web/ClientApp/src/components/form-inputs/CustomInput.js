import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({ idx, inputState, handleChange, required, title }) => {
    const inputNameId = `name-${idx}`;
    return (
        <div key={`${title}-${idx}`} className="form-group">
            <label htmlFor={inputNameId}>{`${title} #${idx + 1}`}</label>
            {required ? (<input
                type="text"
                name={inputNameId}
                data-idx={idx}
                id={inputNameId}
                className="name form-control"
                value={inputState[idx].name}
                onChange={handleChange}
                required
            />) : (
                    <input
                        type="text"
                        name={inputNameId}
                        data-idx={idx}
                        id={inputNameId}
                        className="name form-control"
                        value={inputState[idx].name}
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
