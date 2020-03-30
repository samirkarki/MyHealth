import React, { Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const AdminRoutes = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer);

    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isLoading) {
                    return <h2>Loading...</h2>
                } else if (!auth.isAuthenticated) {
                    return <Redirect to="/login" />
                } else {
                    if(auth.user.Role !== 'Admin') {
                        return <Redirect to="/" />
                    }else{
                        return <Component {...props} />
                    }
                }
            }}
        />
    )
}

export default AdminRoutes;