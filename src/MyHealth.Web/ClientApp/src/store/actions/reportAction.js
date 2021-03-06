import axios from "axios";

import { notifyError, notifySuccess } from "../../components/toast/toast";
import { tokenConfig } from "../../utils/tokenUtility";


export const getSuspectedData = async (id, dateFrom, dateTo) => {
  let config = tokenConfig();

  let obj = JSON.stringify({ DiseaseID: id, DateFrom: dateFrom, DateTo: dateTo });

  let result = await axios.post(`/api/Report/report/suspected`, obj, config);
  if (result.status === 200) {
    return result.data;
  } else {
    notifyError("Cannot get data. Please try again.");
    return null;
  }
};

export const getSuspectedBarData = async (id, dateFrom, dateTo) => {
  let config = tokenConfig();

  let obj = JSON.stringify({ DiseaseID: id, DateFrom: dateFrom, DateTo: dateTo });

  let result = await axios.post(`/api/Report/report/suspectedbar`, obj, config);
  if (result.status === 200) {
    return result.data;
  } else {
    notifyError("Cannot get data. Please try again.");
    return null;
  }
};

export const loadDiseases =async () => {
  
  let config = tokenConfig();

  let result = await axios.get(`/api/diseases`, config);
  if (result.status === 200) {
    return result.data;
  } else {
    notifyError("Cannot get data. Please try again.");
    return null;
  }

  
};
