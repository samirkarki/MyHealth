import React, { Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const PrivateRoutes = ({ component: Component, auth, ...rest }) => {
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
                    return <Component {...props} />
                }
            }}
        />
    )
}

export default PrivateRoutes;