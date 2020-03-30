import { combineReducers } from 'redux';
import authReducer from './authReducer';
import countryReducer from './countryReducer';
import diseaseReducer from './diseaseReducer';
import symptomsReducer from './symptomsReducer';

export default combineReducers({
    authReducer,
    countryReducer,
    diseaseReducer,
    symptomsReducer
});