import React, {useState} from "react";

const OccuranceSelect = ({ id, changedEvent, value, ...props }) => {

debugger;
  return (
    <select
      className="custom-select col-4"
      key={`ddl-${id}`}
      id={`ddl-${id}`}
      {...props}
      value={value}
      onChange={changedEvent}
    >
      <option value="0">None</option>
      <option value="0.25">Level 1</option>
      <option value="0.5">Level 2</option>
      <option value="0.75">Level 3</option>
      <option value="1">Level 4</option>
    </select>
  );
};

export default OccuranceSelect;
