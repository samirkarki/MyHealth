
// Form.js

import React, { useState } from 'react';
import CatInputs from '../../components/form-inputs/CatsInput';

const CatsForm = () => {

    const blankCat = { name: '', age: '' };
    const [catState, setCatState] = useState([
        { ...blankCat },
    ]);

    const addCat = () => {
        setCatState([...catState, { ...blankCat }]);
    };

    const handleCatChange = (e) => {
        const updatedCats = [...catState];
        updatedCats[e.target.dataset.idx][e.target.className] = e.target.value;
        setCatState(updatedCats);
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(catState)
    }

    return (
        <form onSubmit={submitForm}>
            <input
                type="button"
                value="Add New Cat"
                onClick={addCat}
            />
            {
                catState.map((val, idx) => (
                    <CatInputs
                        key={`cat-${idx}`}
                        idx={idx}
                        catState={catState}
                        handleCatChange={handleCatChange}
                    />
                ))
            }
            <input type="submit" value="Submit" />
        </form>
    );
};

export default CatsForm;
