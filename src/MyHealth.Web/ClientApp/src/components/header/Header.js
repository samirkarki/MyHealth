import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authAction';

const Header = () => {


    const dispatch = useDispatch();
    const auth = useSelector(state => state.authReducer);

    const guestLinks = () => {
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link to="/test-covid" className="nav-link">Test Yourself</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        )
    }

    const authLinks = () => {
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link to="/test-covid" className="nav-link">Test Yourself</Link>
                </li>
                <li className="nav-item">
                    <Link to="/result" className="nav-link">Result</Link>
                </li>
                {/* <li className="nav-item">
                    <Link to="/user-profile" className="nav-link">Profile</Link>
                </li> */}
                {(auth.user.isAdmin == 'True' || auth.user.isAdmin == true) && <li className="nav-item">
                    <Link to="/admin/management" className="nav-link">Admin</Link>
                </li>}
                <li className="nav-item">
                    <Link to="/" onClick={() => dispatch(logout())} className="nav-link">Logout</Link>
                </li>
            </ul>
        )
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">COVID Nepal</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    {auth.isAuthenticated ? authLinks() : guestLinks()}
                </div>
            </div>
        </nav>
    )
}

export default Header;