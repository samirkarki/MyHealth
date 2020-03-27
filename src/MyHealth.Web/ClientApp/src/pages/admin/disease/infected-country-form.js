// Form.js

import React, { useState } from 'react';
import InfectedCountryInput from '../../../components/form-inputs/InfectedCountryInput';

const InfectedCountryForm = () => {

    const blankCountry = { name: '' };
    const [infectedCountryState, setInfectedCountryState] = useState([
        { ...blankCountry },
    ]);

    const addInfectedCountry = () => {
        setInfectedCountryState([...infectedCountryState, { ...blankCountry }]);
    };

    const handleInfectedCountryChange = (e) => {
        const updatedCountry = [...infectedCountryState];
        updatedCountry[e.target.dataset.idx][e.target.className.split(" ")[0]] = e.target.value;
        setInfectedCountryState(updatedCountry);
    };

    const submitCountryForm = (e) => {
        e.preventDefault();
        console.log(infectedCountryState)
    }

    return (
        <form onSubmit={submitCountryForm} style={{marginTop: '5px'}}>
            <input
                type="button"
                className="btn btn-primary btn-sm float-right"
                value="Add New Country"
                onClick={addInfectedCountry}
            />
            <div className="clearfix"></div>
            {
                infectedCountryState.map((val, idx) => (
                    <InfectedCountryInput
                        key={`country-${idx}`}
                        idx={idx}
                        infectedCountryState={infectedCountryState}
                        handleInfectedCountryChange={handleInfectedCountryChange}
                    />
                ))
            }
            <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
    );
};

export default InfectedCountryForm;