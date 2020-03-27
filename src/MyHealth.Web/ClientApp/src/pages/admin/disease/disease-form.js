// Form.js

import React, { useState } from 'react';
import DiseaseInputs from '../../../components/form-inputs/DiseaseInputs';

const DiseaseForm = () => {

    const blankDisease = { name: '' };
    const [diseaseState, setDiseaseState] = useState([
        { ...blankDisease },
    ]);

    const addDisease = () => {
        setDiseaseState([...diseaseState, { ...blankDisease }]);
    };

    const handleDiseaseChange = (e) => {
        const updatedDisease = [...diseaseState];
        updatedDisease[e.target.dataset.idx][e.target.className.split(" ")[0]] = e.target.value;
        setDiseaseState(updatedDisease);
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(diseaseState)
    }

    return (
        <form onSubmit={submitForm} style={{marginTop: '5px'}}>
            <input
                type="button"
                className="btn btn-primary btn-sm float-right"
                value="Add New Disease"
                onClick={addDisease}
            />
            <div className="clearfix"></div>
            {
                diseaseState.map((val, idx) => (
                    <DiseaseInputs
                        key={`disease-${idx}`}
                        idx={idx}
                        diseaseState={diseaseState}
                        handleDiseaseChange={handleDiseaseChange}
                    />
                ))
            }
            <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
    );
};

export default DiseaseForm;