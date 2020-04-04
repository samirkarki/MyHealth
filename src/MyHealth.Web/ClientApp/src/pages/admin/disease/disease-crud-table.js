import React from 'react'

const DiseaseTable = ({ checkedItems, selectDiseaseFn, ...props }) => {
    // console.log(checkedItems[item.name])
    return (
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.data.length > 0 ? (
                    props.data.map(item => (
                        <tr key={item.id}>
                            <td id={item.id}> 
                                <input type="checkbox" name={item.id} value={item} onChange={selectDiseaseFn(item)} checked={item.selected}/> 
                            </td>
                            <td>{item.name}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        props.editRow(item)
                                    }}
                                    className="btn btn-secondary btn-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        props.showSymptoms(item)
                                    }}
                                    className="btn btn-secondary btn-sm"
                                    style={{ marginLeft: '10px' }}
                                >
                                    Symptoms
                                </button>
                                <button
                                    onClick={() => props.delete(item.id)}
                                    className="btn btn-primary btn-sm"
                                    style={{ marginLeft: '15px'}}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={3}>No data</td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
}

export default DiseaseTable;