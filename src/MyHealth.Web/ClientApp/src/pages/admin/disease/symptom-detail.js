import React, { useEffect, useState } from "react";
import "./disease.css";
import OccuranceSelect from "../../../components/select/select-occurance";
const SymptomDetailForm = props => {
  const { detail } = props;

  const [val, setVal] = useState(detail.score);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setVal(detail.score);
  }

  const handleAddClick = event => {
    //debugger;
    setVal(event.target.value);
    detail.occurance = event.target.value;
    detail.score = event.target.value;
  };

  return (
    <div className="col-12 d-flex">
      <span className="col-4">{detail.description}</span>
      <div className="col-8">
        <OccuranceSelect
          id={detail.id}
          changedEvent={handleAddClick}
          value={val}
        />
      </div>
    </div>
  );
};

export default SymptomDetailForm;
