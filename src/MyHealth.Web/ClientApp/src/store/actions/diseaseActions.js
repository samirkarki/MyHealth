import axios from 'axios';
import {
    ADD_DISEASE_START, ADD_DISEASE_SUCCESS, ADD_DISEASE_ERROR, UPDATE_DISEASE_ERROR, UPDATE_DISEASE_START, UPDATE_DISEASE_SUCCESS,
    LOAD_DISEASE_ERROR, LOAD_DISEASE_START, LOAD_DISEASE_SUCCESS, DELETE_DISEASE_ERROR, DELETE_DISEASE_START, DELETE_DISEASE_SUCCESS
} from './types';

import { notifyError, notifySuccess } from '../../components/toast/toast';
import { tokenConfig } from '../../utils/tokenUtility';


// save 
export const saveDisease = (diseaseInfo) => dispatch => {

    dispatch({ type: ADD_DISEASE_START })

    let config = tokenConfig();

    axios.post('/api/diseases/multiple', diseaseInfo, config)
        .then(res => {
            dispatch({ type: ADD_DISEASE_SUCCESS, payload: res.data })
            dispatch(load());
            notifySuccess('Disease added successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: ADD_DISEASE_ERROR })
            notifyError('Cannot add disease. Please try again.')
        })
}

// load

export const load = () => dispatch => {

    dispatch({ type: LOAD_DISEASE_START })

    let config = tokenConfig();

    axios.get('/api/diseases', config)
        .then(res => {
            dispatch({ type: LOAD_DISEASE_SUCCESS, payload: res.data })
            //notifySuccess('Disease loaded successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: LOAD_DISEASE_ERROR })
            notifyError('Cannot load disease. Please try again.')
        })
}


// update 
export const updateItem = (diseaseInfo) => dispatch => {

    dispatch({ type: UPDATE_DISEASE_START })

    let config = tokenConfig();
    
    axios.put(`/api/diseases/${diseaseInfo.id}`, diseaseInfo, config)
        .then(res => {
            dispatch({ type: UPDATE_DISEASE_SUCCESS, payload: res.data });
            dispatch(load());
            notifySuccess('Disease updated successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: UPDATE_DISEASE_ERROR })
            notifyError('Cannot update disease. Please try again.')
        })
}


// update 
export const remove = (id) => dispatch => {

    dispatch({ type: DELETE_DISEASE_START })

    let config = tokenConfig();

    axios.delete(`/api/diseases/${id}`, config)
        .then(res => {
            dispatch({ type: DELETE_DISEASE_SUCCESS, payload: id })
            notifySuccess('Disease deleted successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: DELETE_DISEASE_ERROR })
            notifyError('Cannot delete disease. Please try again.')
        })
}