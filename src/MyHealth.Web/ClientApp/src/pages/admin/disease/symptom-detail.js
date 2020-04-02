import React, { useEffect, useState } from "react";
import "./disease.css";
const SymptomDetailForm = props => {
  const { detail } = props;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {}

  const handleAddClick = () => {};

  return (
    <div className="col-12 d-flex">
      <span className="col-4">{detail.description}</span>
      <div className="col-8">
        <select
          className="custom-select col-4"
          key={`ddl-${detail.id}`}
          id={`ddl-${detail.id}`}
        >
          <option value="0">None</option>
          <option value="0.25">Level 1</option>
          <option value="0.5">Level 2</option>
          <option value="0.75">Level 3</option>
          <option value="1">Level 4</option>
        </select>
      </div>
    </div>
  );
};

export default SymptomDetailForm;
