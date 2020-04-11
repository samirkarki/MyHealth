import React from 'react'

const UserTable = ({ updateAdminFlagFn, ...props }) => {
    return (
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Admin</th>
                </tr>
            </thead>
            <tbody>
                {props.data.length > 0 ? (
                    props.data.map(item => (
                        <tr key={item.id}>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td>{item.userName}</td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    name={item.id} 
                                    value={item} 
                                    onChange={updateAdminFlagFn(item)} 
                                    checked={item.isAdmin}
                                /> 
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={4}>No data</td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
}

export default UserTable;