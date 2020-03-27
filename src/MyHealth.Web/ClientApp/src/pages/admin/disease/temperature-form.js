// Form.js

import React, { useState } from 'react';
import TemperatureInputs from '../../../components/form-inputs/TemperatureInputs';

const TemperatureForm = () => {

    const blankTemperature = { name: '' };
    const [temperatureState, setTemperatureState] = useState([
        { ...blankTemperature },
    ]);

    const addTemperature = () => {
        setTemperatureState([...temperatureState, { ...blankTemperature }]);
    };

    const handleTemperatureChange = (e) => {
        const updatedTemperature = [...temperatureState];
        updatedTemperature[e.target.dataset.idx][e.target.className.split(" ")[0]] = e.target.value;
        setTemperatureState(updatedTemperature);
    };

    const submitTemperatureForm = (e) => {
        e.preventDefault();
        console.log(temperatureState)
    }

    return (
        <form onSubmit={submitTemperatureForm} style={{marginTop: '5px'}}>
            <input
                type="button"
                className="btn btn-primary btn-sm float-right"
                value="Add New Temperature"
                onClick={addTemperature}
            />
            <div className="clearfix"></div>
            {
                temperatureState.map((val, idx) => (
                    <TemperatureInputs
                        key={`temperature-${idx}`}
                        idx={idx}
                        temperatureState={temperatureState}
                        handleTemperatureChange={handleTemperatureChange}
                    />
                ))
            }
            <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
    );
};

export default TemperatureForm;