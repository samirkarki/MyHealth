import axios from "axios";
import {
  ADD_SYMPTOMS_ERROR,
  ADD_SYMPTOMS_START,
  ADD_SYMPTOMS_SUCCESS,
  LOAD_SYMPTOMS_START,
  LOAD_SYMPTOMS_SUCCESS,
  LOAD_SYMPTOMS_ERROR,
  UPDATE_SYMPTOMS_SUCCESS,
  UPDATE_SYMPTOMS_ERROR,
  DELETE_SYMPTOMS_START,
  DELETE_SYMPTOMS_ERROR,
  UPDATE_SYMPTOMS_START,
  DELETE_SYMPTOMS_SUCCESS
} from "./types";
import { notifyError, notifySuccess } from "../../components/toast/toast";
import { tokenConfig } from "../../utils/tokenUtility";

// save
export const addSymptoms = symptomsInfo => dispatch => {
  dispatch({ type: ADD_SYMPTOMS_START });

  let config = tokenConfig();

  axios
    .post("/api/symptoms/multiple", symptomsInfo, config)
    .then(res => {
      dispatch({ type: ADD_SYMPTOMS_SUCCESS, payload: res.data });
      dispatch(load());
      notifySuccess("Symptoms added successfully.");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_SYMPTOMS_ERROR });
      notifyError("Cannot add symptoms. Please try again.");
    });
};

// load

export const load = () => dispatch => {
  dispatch({ type: LOAD_SYMPTOMS_START });

  let config = tokenConfig();

  axios
    .get("/api/symptoms", config)
    .then(res => {
      dispatch({ type: LOAD_SYMPTOMS_SUCCESS, payload: res.data });
      //notifySuccess('Disease loaded successfully.');
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOAD_SYMPTOMS_ERROR });
      notifyError("Cannot load symptoms. Please try again.");
    });
};

// update
export const updateItem = itemInfo => dispatch => {
  dispatch({ type: UPDATE_SYMPTOMS_START });

  let config = tokenConfig();

  axios
    .put(`/api/symptoms/${itemInfo.id}`, itemInfo, config)
    .then(res => {
      dispatch({ type: UPDATE_SYMPTOMS_SUCCESS, payload: res.data });
      dispatch(load());
      notifySuccess("Symptom updated successfully.");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: UPDATE_SYMPTOMS_ERROR });
      notifyError("Cannot update symptoms. Please try again.");
    });
};

// update
export const remove = id => dispatch => {
  dispatch({ type: DELETE_SYMPTOMS_START });

  let config = tokenConfig();

  axios
    .delete(`/api/symptoms/${id}`, config)
    .then(res => {
      dispatch({ type: DELETE_SYMPTOMS_SUCCESS, payload: id });
      dispatch(load());
      notifySuccess("Symptom deleted successfully.");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_SYMPTOMS_ERROR });
      notifyError("Cannot delete details. Please try again.");
    });
};

export const getSymptomsDetail = async id => {
  let symptoms = [];
  let config = tokenConfig();
  symptoms = await axios.get(`/api/symptoms/${id}/details`, config);
  if (symptoms.status === 200) {
    return symptoms.data;
  } else {
    notifyError("Cannot get details. Please try again.");
    return null;
  }
};

export const addSymptomDetail = async (id, symptomsDetailInfo) => {
  let config = tokenConfig();

  let result = await axios.post(
    `/api/symptoms/${id}/details`,
    symptomsDetailInfo,
    config
  );

  if (result.status === 200) {
    let response = result.data;
    notifySuccess(response.data);
    return response.status;
  } else {
    notifyError("Cannot update details. Please try again.");
    return false;
  }
};

export const deleteSymptomDetails = async id => {
  let config = tokenConfig();

  let result = await axios.delete(`/api/symptoms/${id}/details`, config);

  if (result.status === 200) {
    let response = result.data;
    notifySuccess(response.data);
    return response.status;
  } else {
    notifyError("Cannot delete details. Please try again.");
    return false;
  }
};
