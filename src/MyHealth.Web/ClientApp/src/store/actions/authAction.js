import axios from 'axios';
import { decodedToken } from '../../utils/tokenUtility';

import {
    USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS,
    REGISTER_FAIL, REGISTER_SUCCESS, REGISTER_START
} from './types';
import { notifyError, notifySuccess } from '../../components/toast/toast';


// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });
    // get token from state
    const token = getState().authReducer.token;
    // if token, add header to config
    if (token) {
        let userInfo = decodedToken();
        dispatch({ type: USER_LOADED, payload: userInfo })
    } else {
        dispatch({ type: LOGIN_FAIL })
    }
}


// Login 
export const login = (userInfo) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify(userInfo);

    axios.post('/api/authentication', body, config)
        .then(res => {
            console.log(res.data)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            notifySuccess('User logged in successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: LOGIN_FAIL })
            notifyError('Cannot login current user. Please try again.')
        })
}


// register user 
export const register_user = (userInfo) => dispatch => {
    dispatch({ type: REGISTER_START });
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify(userInfo);

    axios.post('/api/users', body, config)
        .then(res => {
            console.log(res.data)
            dispatch({ type: REGISTER_SUCCESS })
            notifySuccess('User added successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: REGISTER_FAIL })
            notifyError('Cannot register the user. Please try again.');
        })
}



// Logout
export const logout = () => (dispatch, getState) => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // get token from state
    const token = getState().authReducer.token;

    // if token, add header to config
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    axios.post('/api/user/logout', null, config)
        .then(res => {
            dispatch({ type: LOGOUT_SUCCESS })
        })
        .catch(err => {
            console.log(err);
        })
}
