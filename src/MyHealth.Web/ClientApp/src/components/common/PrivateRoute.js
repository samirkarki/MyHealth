import React, { Component, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, returnLoggedInUser } from '../../store/actions/authAction';


const PrivateRoutes = ({ component: Component, ...rest }) => {

    const dispatch = useDispatch()

    const checkAuth = () => {
        const user = dispatch(returnLoggedInUser())
        if (user) {
            return true;
        }else{
            return false;
        }
    };
    

    return (
        <Route exact
            {...rest}
            render={props => 
                checkAuth() === true ? (
                    <Component {...props} />
                ): (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default PrivateRoutes;