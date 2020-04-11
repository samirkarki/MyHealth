import React from 'react'

const UserTable = ({ updateAdminFlag, ...props }) => {
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
                          checked={item.isAdmin}
                          key={`chk-${item.id}`}
                          id={`chk-${item.id}`}
                          onChange={updateAdminFlag.bind(this, item)}
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