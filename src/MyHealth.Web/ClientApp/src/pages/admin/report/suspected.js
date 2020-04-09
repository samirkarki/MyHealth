import React, { useEffect, useState } from "react";
import ColumnChart from "../../../components/graphs/columnchart";
import LineChart from "../../../components/graphs/linechart";

const SuspectedReport = () => {
  const [colData, setColData] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    ColumnData();
    GetLineData();
  }, []);

  const ColumnData = () => {
    let data = [
      { x: "Apple",  y: 10  },
      { x: "Orange", y: 15  },
      { x: "Banana", y: 25  },
      { x: "Mango",  y: 30  },
      { x: "Grape",  y: 28  }
    ];
    return setColData(data);
  };

  const GetLineData = () => {
    let data = [
      { x: new Date("2020-04-01"), y: 23 },
      { x: new Date("2020-04-02"), y: 12 },
      { x: new Date("2020-04-03"), y: 43 },
      { x: new Date("2020-04-04"), y: 28 },
      { x: new Date("2020-04-05"), y: 17 },
      { x: new Date("2020-04-06"), y: 32 },
      
    ];
    return setLineData(data);
  };

  return (
    <div className="col-12">
      {colData && colData.length > 0 && (
        <div className="row">
          <ColumnChart
            title="Suspected line"
            data={colData}
            xtitle="date"
            ytitle="count"
          />
        </div>
      )}
      {colData && colData.length > 0 && (
        <div className="row">
          <LineChart
            title="Line Chart"
            data={lineData}
            xtitle="date"
            ytitle="count"
          />
        </div>
      )}
    </div>
  );
};

export default SuspectedReport;
