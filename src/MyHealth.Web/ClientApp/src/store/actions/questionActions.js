import axios from "axios";

import {
  LOAD_QUESTIONS_START,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_ERROR,
  SAVE_QUESTIONS_ERROR,
  SAVE_QUESTIONS_SUCCESS,
  SAVE_QUESTIONS_START,
  LOAD_QUESTIONS_INITIAL_STATE,
  LOAD_RESULT_START,
  LOAD_RESULT_SUCCESS,
  LOAD_RESULT_ERROR,
} from "./types";

import { notifyError, notifySuccess } from "../../components/toast/toast";

import {
  tokenConfig,
  getUserIdFromToken,
  getAnonymousUser,
} from "../../utils/tokenUtility";

import { addKeyValue } from "../../utils/json-helper";

const questionaaire = {
  symptoms: [
    {
      id: 1,
      name: "सुख्खा खोकी",
      remarks: "",
      symptomDetails: [
        {
          symptomId: 1,
          description: "xa",
          remarks: "xa",
          id: 1,
        },
        {
          symptomId: 1,
          description: "xaina",
          remarks: "xaina",
          id: 2,
        },
      ],
    },
    {
      id: 2,
      name: "जिउ दुख्ने",
      remarks: "",
      symptomDetails: [
        {
          symptomId: 2,
          description: "xa",
          remarks: "xa",
          id: 1,
        },
        {
          symptomId: 2,
          description: "xaina",
          remarks: "xaina",
          id: 2,
        },
      ],
    },
  ],
};

export const initialStateLoad = () => (dispatch) => {
  dispatch({ type: LOAD_QUESTIONS_INITIAL_STATE });
};

// load

export const load = () => (dispatch) => {
  dispatch({ type: LOAD_QUESTIONS_START });

  const config = tokenConfig();
  const userid = getUserIdFromToken();

  axios
    .get(`/api/questionnaire/${userid}`, config)
    .then((res) => {
      questionaaire.symptoms.forEach((itemdetail) => {
        if (itemdetail.symptomDetails) {
          itemdetail.symptomDetails.forEach((item) => {
            addKeyValue(item, "selected", false);
          });
        }
      });

      dispatch({ type: LOAD_QUESTIONS_SUCCESS, payload: questionaaire });
      // dispatch({ type: LOAD_QUESTIONS_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOAD_QUESTIONS_ERROR });
      notifyError("Cannot load questions. Please try again.");
    });
};

// save
export const saveUserResponse = (item) => (dispatch) => {
  dispatch({ type: SAVE_QUESTIONS_START });

  const obj = JSON.stringify(item);

  const config = tokenConfig();

  axios
    .post("/api/questionnaire", item, config)
    .then((res) => {
      dispatch({ type: SAVE_QUESTIONS_SUCCESS, payload: res.data });
      notifySuccess("Answers submitted successfully.");
      window.location.href = "/result";
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SAVE_QUESTIONS_ERROR });
      notifyError("Cannot save your answers. Please try again.");
    });
};

// load result

export const loadUserResult = () => (dispatch) => {
  const config = tokenConfig();
  const user = getUserIdFromToken();
  let userID = user.userId;
  if (!userID) {
    let user = getAnonymousUser();

    userID = user.userId;
  }

  dispatch({ type: LOAD_RESULT_START });

  axios
    .get(`/api/questionnaire/${userID}/result`, config)
    .then((res) => {
      dispatch({ type: LOAD_RESULT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOAD_RESULT_ERROR });
      //notifyError('Cannot load results. Please try again.')
    });
};
