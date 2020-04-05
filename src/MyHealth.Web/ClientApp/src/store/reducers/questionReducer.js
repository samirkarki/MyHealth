import { LOAD_QUESTIONS_START, LOAD_QUESTIONS_SUCCESS, LOAD_QUESTIONS_ERROR,
SAVE_QUESTIONS_ERROR, SAVE_QUESTIONS_SUCCESS, SAVE_QUESTIONS_START, LOAD_QUESTIONS_INITIAL_STATE, LOAD_RESULT_SUCCESS, LOAD_RESULT_START, LOAD_RESULT_ERROR } from '../actions/types';

const initialState = {
    isLoading: false,
    questions: null,
    responseScore: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_QUESTIONS_START:
        case LOAD_QUESTIONS_START:
        case LOAD_RESULT_START: {
            return {
                ...state,
                isLoading: true
            }
        }

        case LOAD_QUESTIONS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                questions: action.payload
            }
        }

        case SAVE_QUESTIONS_SUCCESS:
        case LOAD_RESULT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                responseScore: action.payload
            }
        }

        case LOAD_QUESTIONS_INITIAL_STATE:{
            return {
                ...state,
                isLoading: false
            }
        }

        case LOAD_QUESTIONS_ERROR:
        case SAVE_QUESTIONS_ERROR:
        case LOAD_RESULT_ERROR: {
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