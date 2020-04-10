import React, { useEffect, useState } from "react";
import ColumnChart from "../../../components/graphs/columnchart";
import LineChart from "../../../components/graphs/linechart";

const SuspectedReport = () => {
  
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
     GetLineData();
  }, []);

  

  const GetLineData = () => {
    let data = [
      { x: "2020-04-01", y: 23 },
      { x: "2020-04-02", y: 200 },
      { x: "2020-04-03", y: 43 },
      { x: "2020-04-04", y: 28 },
      { x: "2020-04-05", y: 100 },
      { x: "2020-04-06", y: 32 },
      
    ];
    return setLineData(data);
  };

  return (
    <div className="col-12">
     
      {lineData && lineData.length > 0 && (
        <div className="row">
          <LineChart
            title="Line Chart"
            data={lineData}
            xtitle="Date"
            ytitle="Count"
          />
        </div>
      )}
    </div>
  );
};

export default SuspectedReport;
