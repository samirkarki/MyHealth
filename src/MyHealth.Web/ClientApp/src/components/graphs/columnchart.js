import React, { useState, useEffect } from "react";

import "./graph.css";
import { ResponsiveBar } from "@nivo/bar";

const ColumnChart = (prop) => {
  const [barData, setBarData] = useState([]);
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

    return setBarData(data);
  };

  return (
    <div className="row col-12 no-gutters align-items-center chart">
      <ResponsiveBar
        data={barData}
        keys={"y"}
        indexBy="x"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors="#EB6864"
        defs={[
         
        ]}
        fill={[
          
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: xtitle,
          legendPosition: "middle",
          legendOffset: 45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: ytitle,
          legendPosition: "middle",
          legendOffset: -45,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#fff"
        legends={[]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default ColumnChart;
