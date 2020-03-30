import { ADD_SYMPTOMS_START,UPDATE_SYMPTOMS_SUCCESS, ADD_SYMPTOMS_ERROR, ADD_SYMPTOMS_SUCCESS, LOAD_SYMPTOMS_START, DELETE_SYMPTOMS_SUCCESS, UPDATE_SYMPTOMS_START, LOAD_SYMPTOMS_SUCCESS, UPDATE_SYMPTOMS_ERROR, DELETE_SYMPTOMS_ERROR, LOAD_SYMPTOMS_ERROR } from '../actions/types';

const initialState = {
    isLoading: false,
    symptomsInfo: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_SYMPTOMS_START:
        case LOAD_SYMPTOMS_START:
        case DELETE_SYMPTOMS_SUCCESS:
        case UPDATE_SYMPTOMS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ADD_SYMPTOMS_SUCCESS:
        case LOAD_SYMPTOMS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                symptomsInfo: action.payload
            }
        }
        case ADD_SYMPTOMS_ERROR:
        case UPDATE_SYMPTOMS_ERROR:
        case DELETE_SYMPTOMS_ERROR:
        case LOAD_SYMPTOMS_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }

        case UPDATE_SYMPTOMS_SUCCESS: {
            return {
                ...state,
                isLoading: false
            }
        }

        case DELETE_SYMPTOMS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                symptomsInfo: state.symptomsInfo.filter(item => item.id !== action.payload)
            }
        }

        default: {
            return state;
        }
    }
}