import React, { Component, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, returnLoggedInUser } from '../../store/actions/authAction';


const AdminRoutes = ({ component: Component, ...rest }) => {

    const dispatch = useDispatch()

    const checkAuth = () => {
        const user = dispatch(returnLoggedInUser())
        if (user) {
            if(user.isAdmin == true || user.isAdmin == "True") {
                return true
            }
            return false;
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
                    <Redirect to="/" />
                )
            }
        />
    )
}

export default AdminRoutes;