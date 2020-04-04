import React, { useEffect, useState } from "react";

import { addSymptomDetail, load } from "../../../store/actions/symptomsAction";
import CustomInput from "../../../components/form-inputs/CustomInput";

const SymptomsDetailAdd = props => {
  const {
    currentSymptoms,
    setInitAdd,
    loadData,
    currentDetail,
    setcurrentDetail
  } = props;
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    loadDetailsData();
  }, []);

  const loadDetailsData = () => {
    if (currentDetail) {
      setDescription(currentDetail.description);
      setRemarks(currentDetail.remarks);
    }
  };

  const backToDetails = () => {
    setInitAdd(false);
  };

  const updateSymptomDetails = async event => {
    event.preventDefault();
    let id = "";
    if (currentDetail) id = currentDetail.id;
    let dataObj = {
      Id: id,
      SymptomId: currentSymptoms.id,
      Description: description,
      Remarks: remarks
    };
    let obj = JSON.stringify(dataObj);
    let data = await addSymptomDetail(currentSymptoms.id, obj);
    if (data) {
      setInitAdd(false);
      if (setcurrentDetail) setcurrentDetail(null);
      if (loadData) loadData();
    }
    //console.log(description, remarks);
  };

  return (
    <div className="row no-gutters">
      <div className="row col-12 no-gutters align-items-center">
        <div className="col-9">
          <span className="font-weight-bold">Symptom Name:</span>{" "}
          {currentSymptoms.name}
        </div>
        <div className="col-3 text-right">
          <span className="btn btn-secondary mr-lg-3" onClick={backToDetails}>
            Back to Details
          </span>
        </div>
      </div>
      <form onSubmit={updateSymptomDetails} className="mt-lg-3 col-12">
        <span className="font-weight-bold mt-lg-5">Add Details</span>

        <div className="row no-gutters  mt-lg-3">
          {/* <label>Description</label> */}
          <CustomInput
            key={`txtDescription`}
            idx={0}
            inputState={[]}
            handleChange={e => {
              setDescription(e.target.value);
            }}
            required={true}
            title="Description"
            value={description}
            extraClass="col-md-6"
          />
        </div>

        <div className="row  no-gutters   mt-lg-1">
          <CustomInput
            key={`txtRemarks`}
            idx={1}
            inputState={[]}
            handleChange={e => {
              setRemarks(e.target.value);
            }}
            required={false}
            title="Remarks"
            value={remarks}
            extraClass="col-md-6"
          />
        </div>

        <div className="row  no-gutters mt-lg-2">
          <input type="submit" value="Save" className="btn btn-primary" />
          <span className="btn btn-info ml-lg-3" onClick={backToDetails}>
            Cancel
          </span>
        </div>
      </form>
    </div>
  );
};

export default SymptomsDetailAdd;
