import React from 'react'

const DiseaseTable = ({ ...props }) => {
    return (
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.data.length > 0 ? (
                    props.data.map(item => (
                        <tr key={item.id}>
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