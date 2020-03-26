import axios from 'axios';

import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });
    // get token from state
    const token = getState().authReducer.token;
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // if token, add header to config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({ type: USER_LOADED, payload: res.data })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: AUTH_ERROR })
        })
}


// Login
export const login = (username, password) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: LOGIN_FAIL })
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
        config.headers['Authorization'] = `Token ${token}`;
    }


    axios.post('/api/auth/logout', null, config)
        .then(res => {
            dispatch({ type: LOGOUT_SUCCESS })
        })
        .catch(err => {
            console.log(err);
        })
}



// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().authReducer.token;
  
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
  
    return config;
};