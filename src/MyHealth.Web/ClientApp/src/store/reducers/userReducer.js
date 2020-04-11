import {
  LOAD_USER_START,
  UPDATE_USER_ADMIN,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  USER_ADMIN_SUCCESS,
  UPDATE_USER_ERROR
} from "../actions/types";

const initialState = {
  isLoading: false,
  userInfo: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_START:
    case UPDATE_USER_ADMIN: {
      return {
        ...state,
        isLoading: true
      };
    }
    case LOAD_USER_SUCCESS:
    case USER_ADMIN_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false
      };
    }

    case LOAD_USER_ERROR:
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false
      };
    }

    case UPDATE_USER_ADMIN: {
      return {
        ...state,
        isLoading: false
      };
    }


    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
}
