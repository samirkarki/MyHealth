import axios from 'axios';
import {
    ADD_COUNTRY_ERROR, ADD_COUNTRY_START, ADD_COUNTRY_SUCCESS, LOAD_COUNTRY_START, LOAD_COUNTRY_SUCCESS, LOAD_COUNTRY_ERROR, UPDATE_COUNTRY_ERROR, UPDATE_COUNTRY_SUCCESS, UPDATE_COUNTRY_START, DELETE_COUNTRY_START, DELETE_COUNTRY_SUCCESS, DELETE_COUNTRY_ERROR
} from './types';
import { notifyError, notifySuccess } from '../../components/toast/toast';
import { tokenConfig } from '../../utils/tokenUtility';


// save 
export const addCountry = (item) => dispatch => {

    dispatch({ type: ADD_COUNTRY_START })

    let config = tokenConfig();

    axios.post('/api/countries/multiple', item, config)
        .then(res => {
            dispatch({ type: ADD_COUNTRY_SUCCESS, payload: res.data })
            dispatch(load())
            notifySuccess('Country added successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: ADD_COUNTRY_ERROR })
            notifyError('Cannot add country. Please try again.')
        })
}




// load

export const load = () => dispatch => {

    dispatch({ type: LOAD_COUNTRY_START })

    let config = tokenConfig();

    axios.get('/api/countries', config)
        .then(res => {
            dispatch({ type: LOAD_COUNTRY_SUCCESS, payload: res.data })
            //notifySuccess('Disease loaded successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: LOAD_COUNTRY_ERROR })
            notifyError('Cannot load country. Please try again.')
        })
}


// update 
export const updateItem = (itemInfo) => dispatch => {

    dispatch({ type: UPDATE_COUNTRY_START })

    let config = tokenConfig();

    axios.put(`/api/countries/${itemInfo.id}`, itemInfo, config)
        .then(res => {
            dispatch({ type: UPDATE_COUNTRY_SUCCESS, payload: res.data })
            dispatch(load())
            notifySuccess('Country updated successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: UPDATE_COUNTRY_ERROR })
            notifyError('Cannot update country. Please try again.')
        })
}


// update 
export const remove = (id) => dispatch => {

    dispatch({ type: DELETE_COUNTRY_START })

    let config = tokenConfig();

    axios.delete(`/api/countries/${id}`, config)
        .then(res => {
            dispatch({ type: DELETE_COUNTRY_SUCCESS, payload: id })
            dispatch(load())
            notifySuccess('Country deleted successfully.');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: DELETE_COUNTRY_ERROR })
            notifyError('Cannot delete country. Please try again.')
        })
}
