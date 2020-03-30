import React, { useState, useEffect } from 'react'

const EditSymptomForm = props => {
    const [symptom, setSymptom] = useState(props.currentSymptoms)

    useEffect(() => {
        setSymptom(props.currentSymptoms)
    }, [props])

    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = event => {
        const { name, value } = event.target

        setSymptom({ ...symptom, [name]: value })
    }

    return (
        <form className="form"
            onSubmit={event => {
                event.preventDefault()
                props.update(symptom)
            }}
        >
            <label>Name</label>
            <input type="text" name="name" className="form-control" value={symptom.name} onChange={handleInputChange} />

            <br />
            <button className="btn btn-secondary btn-sm">Update</button> 
            <button style={{marginLeft: '25px'}} onClick={() => props.setEditing(false)} className="btn btn-primary btn-sm">
                Cancel
            </button>
        </form>
    )
}

export default EditSymptomForm