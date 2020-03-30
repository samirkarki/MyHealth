import React, { useState, useEffect } from 'react'

const EditDiseaseForm = props => {
    const [disease, setDisease] = useState(props.currentDisease)

    useEffect(() => {
        setDisease(props.currentDisease)
    }, [props])

    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = event => {
        const { name, value } = event.target

        setDisease({ ...disease, [name]: value })
    }

    return (
        <form className="form"
            onSubmit={event => {
                event.preventDefault()
                props.update(disease)
            }}
        >
            <label>Name</label>
            <input type="text" name="name" className="form-control" value={disease.name} onChange={handleInputChange} />

            <br />
            <button className="btn btn-secondary btn-sm">Update</button> 
            <button style={{marginLeft: '25px'}} onClick={() => props.setEditing(false)} className="btn btn-primary btn-sm">
                Cancel
            </button>
        </form>
    )
}

export default EditDiseaseForm