import React, { useEffect, useState } from "react";

import { getDiseaseSymptomsToAdd } from "../../../store/actions/diseaseActions";
import SymptomDetailForm from "./symptom-detail";

const DiseaseSymptomAdd = props => {
  const { currentDisease, backToSymptomList } = props;
  const [symptomsListAdd, setSymptomsListAdd] = useState([]);
  const blankSymptoms = { id: "", checked: false, detailData: [] };
  const [selectedSymptoms, setSelectedSymptoms] = useState([blankSymptoms]);

  useEffect(() => {
    async function fetchData() {
      let data = await getDiseaseSymptomsToAdd(currentDisease.id);
      if (data != null) {
        data.symptoms.forEach(symptom => {
          symptom.selected = false;
          symptom.symptomDetails.forEach(detail => {
            detail.occurance = 0;
          });
        });

        await setSymptomsListAdd(data.symptoms);
      }
    }

    fetchData();
  }, []);

  const updateCheckData = async symptom => {
    let symptoms = [...symptomsListAdd];

    const items = symptoms.filter(item => item.id === symptom.id);
    items[0].selected = !items[0].selected;
    items[0].symptomDetails.forEach(detail => {
      detail.occurance = 0;
    });

    await setSymptomsListAdd(symptoms);
  };

  const saveClicked = () => {
    console.log(symptomsListAdd);
  };

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

      {/* <span className="font-weight-bold mt-lg-5">Add Symptoms</span> */}
      <table className="table table-striped mt-lg-5">
        <thead>
          <tr className="row col-12 no-gutters">
            <th className="col-12">Symptoms</th>
          </tr>
        </thead>
        <tbody>
          {symptomsListAdd.length > 0 ? (
            symptomsListAdd.map((symptoms, index) => {
              return (
                <tr key={index} className="row col-12 no-gutters">
                  <td className="col-12 ml-3">
                    <div className="row no-gutters col-12">
                      <div className="custom-control custom-checkbox mb-3 col-12">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          key={`chk-${symptoms.id}`}
                          id={`chk-${symptoms.id}`}
                          onClick={updateCheckData.bind(this, symptoms)}
                        />
                        <label
                          className="custom-control-label"
                          for={`chk-${symptoms.id}`}
                        >
                          {symptoms.name}
                        </label>

                        {symptoms.selected &&
                          symptoms.symptomDetails.length > 0 && (
                            <ul className="col-12 list-group list-group-flush">
                              <li className="list-group-item ">
                                <div className="col-12 d-flex">
                                  <span className="col-4 font-weight-bold">Symptom Detail</span>
                                  <span className="col-8 font-weight-bold">Occurance</span>
                                </div>
                              </li>
                              {symptoms.symptomDetails.map((detail, index) => {
                                return (
                                  <li className="list-group-item">
                                    <SymptomDetailForm detail={detail} />{" "}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">
                <div className="alert alert-secondary border-0">
                  No symptoms found!!
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="row col-12 no-gutters mt-lg-2">
        <div className="col-3 ">
          <span className="btn btn-primary mr-lg-3" onClick={saveClicked}>
            Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiseaseSymptomAdd;
