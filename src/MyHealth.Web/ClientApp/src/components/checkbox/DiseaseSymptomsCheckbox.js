import React, { Component } from "react";
import { connect } from "react-redux";

const DiseaseSymptomsCheckbox = props => {
  const { symptom, handleCheckboxClick } = props;

  return (
    <div className="row">
      <span className="col-8">{symptom.title}</span>
      <button
        className="btn btn-info"
        onClick={handleCheckboxClick.bind(this, symptom.id)}
      >
        Add
      </button>
    </div>
  );
};

export default DiseaseSymptomsCheckbox;
