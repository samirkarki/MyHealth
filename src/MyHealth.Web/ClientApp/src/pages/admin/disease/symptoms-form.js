// Form.js

import React, { useState } from 'react';
import SymptomsInput from '../../../components/form-inputs/SymptomsInput';

const SymptomsForm = () => {

    const blankSymptom = { name: '' };
    const [symptomState, setSymptomState] = useState([
        { ...blankSymptom },
    ]);

    const addSymptom = () => {
        setSymptomState([...symptomState, { ...blankSymptom }]);
    };

    const handleSymptomChange = (e) => {
        const updatedSymptom = [...symptomState];
        updatedSymptom[e.target.dataset.idx][e.target.className.split(" ")[0]] = e.target.value;
        setSymptomState(updatedSymptom);
    };

    const submitSymptomForm = (e) => {
        e.preventDefault();
        console.log(symptomState)
    }

    return (
        <form onSubmit={submitSymptomForm} style={{marginTop: '5px'}}>
            <input
                type="button"
                className="btn btn-primary btn-sm float-right"
                value="Add New Symptom"
                onClick={addSymptom}
            />
            <div className="clearfix"></div>
            {
                symptomState.map((val, idx) => (
                    <SymptomsInput
                        key={`symptom-${idx}`}
                        idx={idx}
                        symptomsState={symptomState}
                        handleSymptomsChange={handleSymptomChange}
                    />
                ))
            }
            <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
    );
};

export default SymptomsForm;