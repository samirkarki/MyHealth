import axios from "axios";
import {
  LOAD_USER_START,
  UPDATE_USER_ADMIN,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  USER_ADMIN_SUCCESS,
  UPDATE_USER_ERROR,
  LOAD_RESULT_START
} from "./types";

import { notifyError, notifySuccess } from "../../components/toast/toast";
import { tokenConfig } from "../../utils/tokenUtility";

export const initialStateLoad = () => dispatch => {

  dispatch({ type: LOAD_RESULT_START })
}

// save
export const updateAdminFlag = userInfo => dispatch => {
  dispatch({ type: UPDATE_USER_ADMIN });

  let config = tokenConfig();

  axios
    .PUT(`/api/users/${userInfo.id}/admin`, config)
    .then(res => {
      dispatch({ type: USER_ADMIN_SUCCESS, payload: res.data });
      dispatch(load());
      notifySuccess("User updated successfully.");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: UPDATE_USER_ERROR });
      notifyError("Cannot update user. Please try again.");
    });
};

// load

export const load = () => dispatch => {
  dispatch({ type: LOAD_USER_START });

  let config = tokenConfig();

  axios
    .get("/api/users", config)
    .then(res => {
      dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOAD_USER_ERROR });
      notifyError("Cannot load users. Please try again.");
    });
};
