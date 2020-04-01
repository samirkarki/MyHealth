import React, { useEffect, useState } from "react";

import { getDiseaseSymptomsToAdd } from "../../../store/actions/diseaseActions";

const DiseaseSymptomAdd = props => {
  const { currentDisease, backToSymptomList } = props;
  const [symptomsListAdd, setSymptomsListAdd] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await getDiseaseSymptomsToAdd(currentDisease.id);
      if (data != null) await setSymptomsListAdd(data.symptoms);
    }

    fetchData();
  }, []);

  return (
    <div className="row no-gutters">
      <div className="row col-12 no-gutters align-items-center">
        <div className="col-9">
          <span className="font-weight-bold">Disease:</span>{" "}
          {currentDisease.name}
        </div>
        <div className="col-3 text-right">
          <span
            className="btn btn-secondary mr-lg-3"
            onClick={backToSymptomList}
          >
            Back to Symptoms
          </span>
        </div>
      </div>

      <span className="font-weight-bold mt-lg-5">Add Symptoms</span>
      <table class="table table-striped mt-lg-1">
        <thead>
          <tr className="row col-12">
            <th className="col-2"></th>
            <th className="col-10">Title</th>
          </tr>
        </thead>
        <tbody>
          {symptomsListAdd.length > 0 ? (
            symptomsListAdd.map((symptoms, index) => {
              return (
                <tr key={index} className="row col-12">
                  <td className="col-2">
                    <input type="checkbox" id={`check-${symptoms.id}`} />
                  </td>
                  <td className="col-10">{symptoms.name}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">
                <div class="alert alert-secondary border-0">
                  No symptoms found!!
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="row col-12 no-gutters mt-lg-2">
        <div className="col-3 ">
          <span className="btn btn-info mr-lg-3">Save</span>
        </div>
      </div>
    </div>
  );
};

export default DiseaseSymptomAdd;
