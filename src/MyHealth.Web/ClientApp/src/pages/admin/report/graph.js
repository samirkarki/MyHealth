import React, { useState, useEffect } from "react";
import ColumnChart from "../../../components/graphs/columnchart";
import "./report.css";

const Graph = () => {
  const [colData, setColData] = useState([]);

  useEffect(() => {
    ColumnData();
  }, []);

  const ColumnData = () => {
    let data = [
      { x: "Apple", y: 10 },
      { x: "Orange", y: 15 },
      { x: "Banana", y: 25 },
      { x: "Mango", y: 30 },
      { x: "Grape", y: 28 },
    ];
    return setColData(data);
  };

  return (
    <div className="col-12">
      {colData && colData.length > 0 && (
        <div className="row">
          <ColumnChart
            title="Suspected line"
            data={colData}
            xtitle="Date"
            ytitle="Count"
          />
        </div>
      )}
    </div>
  );
};

export default Graph;
