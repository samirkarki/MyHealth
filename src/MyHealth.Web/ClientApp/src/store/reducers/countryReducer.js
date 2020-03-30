import { ADD_COUNTRY_START, ADD_COUNTRY_SUCCESS, ADD_COUNTRY_ERROR, LOAD_COUNTRY_START, UPDATE_COUNTRY_START, 
    DELETE_COUNTRY_START, LOAD_COUNTRY_SUCCESS, LOAD_COUNTRY_ERROR, UPDATE_COUNTRY_ERROR, DELETE_COUNTRY_ERROR, 
    DELETE_COUNTRY_SUCCESS, 
    UPDATE_COUNTRY_SUCCESS} from '../actions/types';

const initialState = {
    isLoading: false,
    countryInfo: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_COUNTRY_START:
        case LOAD_COUNTRY_START:
        case UPDATE_COUNTRY_START:
        case DELETE_COUNTRY_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ADD_COUNTRY_SUCCESS:
        case LOAD_COUNTRY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                countryInfo: action.payload
            }
        }
        case ADD_COUNTRY_ERROR:
        case LOAD_COUNTRY_ERROR:
        case UPDATE_COUNTRY_ERROR:
        case DELETE_COUNTRY_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }

        case UPDATE_COUNTRY_SUCCESS: {
            return {
                ...state,
                isLoading: false
            }
        }

        case DELETE_COUNTRY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                countryInfo: state.countryInfo.filter(item => item.id !== action.payload)
            }
        }

        default: {
            return state;
        }
    }
}