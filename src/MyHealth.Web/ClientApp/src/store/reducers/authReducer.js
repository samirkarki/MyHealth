import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import {SaveDataToStore, GetDataFromStore, RemoveDataFromStorage} from '../../utils/storageHelper'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: GetDataFromStore('user')
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }
        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS: {
            localStorage.removeItem('token');
            RemoveDataFromStorage('user');

            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', action.payload.token);
            SaveDataToStore('user', action.payload);
            return {
                ...state,
                user: action.payload,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false
            }
        }
        case REGISTER_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case REGISTER_SUCCESS:
        case REGISTER_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }

        default: {
            return state;
        }
    }
}