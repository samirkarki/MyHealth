import React, { useEffect, useState } from "react";
import DiseaseSymptomAdd from "./disease-symptom-add";

import {
  getdiseasesymptoms,
  deleteSymptomDetails,
  setMajorSymptomDetail
} from "../../../store/actions/diseaseActions";
import { useDispatch } from "react-redux";

const DiseaseSymptomMap = props => {
  const { currentDisease, backToList } = props;
  const [symptomsList, setSymptomsList] = useState([]);
  const [initAdd, setInitAdd] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentSymptom, setCurrentSymptom] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let data = await getdiseasesymptoms(currentDisease.id);
    await setSymptomsList(data.symptoms);

    if (data.symptoms.length === 0) {
      setInitAdd(true);
    }
  }

  const backToSymptomList = () => {
    setInitAdd(false);
    setCurrentSymptom(null);
  };
  const handleAddClick = () => {
    setInitAdd(true);
  };

  const editSymptomDetails = detail => {
    setCurrentSymptom(detail);
    setInitAdd(true);
  };

  const deleteSymptomDetail = id => {
    if (window.confirm("Are you sure to delete ?")) {
      deleteDetail(id);
    }
  };

  const deleteDetail = async id => {
    let data = await deleteSymptomDetails(currentDisease.id, id);
    if (data) {
      fetchData();
    }
  };

  const setMajorSymptom = async detail => {
    let data = await setMajorSymptomDetail(currentDisease.id, detail.id, !detail.isMajorSymptom);
    if (data) {
      fetchData();
    }
  };

  return (
    <div>
      {initAdd ? (
        <DiseaseSymptomAdd
          currentDisease={currentDisease}
          backToSymptomList={backToSymptomList}
          currentSymptom={currentSymptom}
          setCurrentSymptom={setCurrentSymptom}
          setInitAdd={setInitAdd}
          loadData={fetchData}
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
              <span className="btn btn-primary" onClick={handleAddClick}>
                + Add
              </span>
            </div>
          </div>
          <span className="font-weight-bold mt-lg-5">Symptoms List</span>
          <table className="table table-striped mt-lg-1">
            <thead>
              <tr className="row col-12">
                <th className="col-1">#</th>
                <th className="col-4">Title</th>
                <th className="col-3">Is Major</th>
                <th className="col-4 ">
                  <span className="row">Action</span>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {symptomsList.length > 0 ? (
                symptomsList.map((detail, index) => {
                  let isMajorSymptom = detail.isMajorSymptom;

                  return (
                    <tr className="row col-12" key={index}>
                      <td className="col-1">{index + 1}</td>
                      <td className="col-4">{detail.name}</td>
                      <td className="col-3">
                        {isMajorSymptom && (
                          <div className="custom-control custom-checkbox mb-3 col-12">
                            <input
                              className="custom-control-input custom-check"
                              type="checkbox"
                              checked={isMajorSymptom}
                              key={`chk-${detail.id}`}
                              id={`chk-${detail.id}`}
                              disabled={true}
                            />
                            <label
                              className="custom-control-label"
                              for={`chk-${detail.id}`}
                            ></label>
                          </div>
                        )}
                      </td>
                      <td className="col-4 ">
                        <div className="row no-gutters float-left">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={setMajorSymptom.bind(this, detail)}
                          >
                            {isMajorSymptom?"Unset Major Symptom":"Set Major Symptom"}
                          </button>

                          <span
                            className="btn btn-sm btn-secondary ml-lg-2"
                            onClick={editSymptomDetails.bind(this, detail)}
                          >
                            Edit
                          </span>

                          <span
                            className="btn btn-sm btn-primary ml-lg-2"
                            onClick={deleteSymptomDetail.bind(this, detail.id)}
                          >
                            Delete
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
