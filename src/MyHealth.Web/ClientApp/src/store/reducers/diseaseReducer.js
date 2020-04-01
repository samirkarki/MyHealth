import {
  ADD_DISEASE_START,
  ADD_DISEASE_ERROR,
  ADD_DISEASE_SUCCESS,
  LOAD_DISEASE_START,
  UPDATE_DISEASE_START,
  DELETE_DISEASE_START,
  LOAD_DISEASE_SUCCESS,
  DELETE_DISEASE_SUCCESS,
  LOAD_DISEASE_ERROR,
  UPDATE_DISEASE_ERROR,
  DELETE_DISEASE_ERROR,
  UPDATE_DISEASE_SUCCESS,
  LOAD_DISEASE_SYMPTOMS_START,
  LOAD_DISEASE_SYMPTOMS_SUCCESS,
  LOAD_DISEASE_SYMPTOMS_ERROR
} from "../actions/types";

const initialState = {
  isLoading: false,
  diseaseInfo: null,
  diseaseSymptoms: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DISEASE_START:
    case LOAD_DISEASE_START:
    case UPDATE_DISEASE_START:
    case DELETE_DISEASE_START:
    case LOAD_DISEASE_SYMPTOMS_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case ADD_DISEASE_SUCCESS:
    case LOAD_DISEASE_SUCCESS: {
      return {
        ...state,
        diseaseInfo: action.payload,
        isLoading: false
      };
    }

    case ADD_DISEASE_ERROR:
    case LOAD_DISEASE_ERROR:
    case UPDATE_DISEASE_ERROR:
    case DELETE_DISEASE_ERROR:
    case LOAD_DISEASE_SYMPTOMS_ERROR: {
      return {
        ...state,
        isLoading: false
      };
    }

    case UPDATE_DISEASE_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }

    case DELETE_DISEASE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        diseaseInfo: state.diseaseInfo.filter(
          item => item.id !== action.payload
        )
      };
    }

    case LOAD_DISEASE_SYMPTOMS_SUCCESS: {
      return {
        ...state,
        diseaseSymptoms: action.payload,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
}
