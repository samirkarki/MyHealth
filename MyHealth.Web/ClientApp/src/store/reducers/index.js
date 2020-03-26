import { combineReducers } from 'redux';
import leadReducer from './leadReducer';
import authReducer from './authReducer';

export default combineReducers({
    leadReducer,
    authReducer
});