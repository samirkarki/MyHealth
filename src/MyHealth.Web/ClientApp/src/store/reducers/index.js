import { combineReducers } from 'redux';
import authReducer from './authReducer';
import countryReducer from './countryReducer';
import diseaseReducer from './diseaseReducer';
import symptomsReducer from './symptomsReducer';
import questionReducer from './questionReducer';
import userReducer from './userReducer';

export default combineReducers({
    authReducer,
    countryReducer,
    diseaseReducer,
    symptomsReducer,
    questionReducer,
    userReducer
});