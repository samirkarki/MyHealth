import React, { useEffect, useState } from "react";
import DiseaseSymptomAdd from "./disease-symptom-add";

import {
  getdiseasesymptoms,
  getDiseaseSymptomsToAdd
} from "../../../store/actions/diseaseActions";
import { useDispatch } from "react-redux";

const DiseaseSymptomMap = props => {
  const { currentDisease, backToList } = props;
  const [symptomsList, setSymptomsList] = useState([]);
  const [initAdd, setInitAdd] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let data = await getdiseasesymptoms(currentDisease.id);
      await setSymptomsList(data.symptoms);

      if (data.symptoms.length === 0) {
        setInitAdd(true);
      }
    }
    fetchData();
  }, []);

  const backToSymptomList = () => {
    setInitAdd(false);
  };
  const handleAddClick = () => {
    setInitAdd(true);
  };

  return (
    <div>
      {initAdd ? (
        <DiseaseSymptomAdd
          currentDisease={currentDisease}
          backToSymptomList={backToSymptomList}
        />
      ) : (
        <div className="row no-gutters">
          <div className="row col-12 no-gutters align-items-center">
            <div className="col-9">
              <span className="font-weight-bold">Disease:</span>{" "}
              {currentDisease.name}
            </div>
            <div className="col-3 text-right">
              <span className="btn btn-secondary mr-lg-3" onClick={backToList}>
                Back to List
              </span>
              <span className="btn btn-info" onClick={handleAddClick}>
                + Add
              </span>
            </div>
          </div>
          <span className="font-weight-bold mt-lg-5">Symptoms List</span>
          <table className="table table-striped mt-lg-1">
            <thead>
              <tr className="row col-12">
                <th className="col-1">#</th>
                <th className="col-8">Title</th>
                <th className="col-3 ">
                  <span className="row">Action</span>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {symptomsList.length > 0 ? (
                <span className="comming-soon font-weight-bold">
                  --- Coming soon ---
                </span>
              ) : (
                <tr className="row col-12">
                  <td colSpan="3">
                    <div className="alert alert-secondary border-0">
                      No symptoms found!!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DiseaseSymptomMap;
