import React, { Component } from "react";

const DiseaseSymptomMap = props => {

  const { currentDisease } = props;

  return <div>{currentDisease.name}</div>;
};

export default DiseaseSymptomMap;
