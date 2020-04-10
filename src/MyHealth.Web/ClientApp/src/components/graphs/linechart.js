import React, { useState, useEffect } from "react";
import "./graph.css";

import { ResponsiveLine } from "@nivo/line";

const LineChart = (prop) => {
  const [lineData, setLineData] = useState([]);
  const { xtitle, ytitle } = prop;

  useEffect(() => {
    buildData();
  }, []);

  const buildData = () => {
    let title = prop.title;
    let data = prop.data;
    let dataPoints = [];
    data.forEach((element) => {
      dataPoints.push({ x: element.x, y: element.y });
    });

    let linedata = [{ id: title, data: dataPoints }];
    

    return setLineData(linedata);
  };

  return (
    <div className="row col-12 no-gutters align-items-center chart">
      <ResponsiveLine
        data={lineData}
        curve="monotoneX"
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        colors="#EB6864"
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: xtitle,
          legendOffset: 45,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: ytitle,
          legendOffset: -45,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
         
        ]}
      />
    </div>
  );
};

export default LineChart;
