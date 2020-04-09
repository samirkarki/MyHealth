import React, { useEffect, useState } from "react";
import ColumnChart from "../../../components/graphs/columnchart";

const SuspectedReport = () => {
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
      <div className="row">
        {colData && colData.length > 0 && (
          <ColumnChart title="Suspected line" data={colData} xtitle='date' ytitle="count"/>
        )}
      </div>
    </div>
  );
};

export default SuspectedReport;
