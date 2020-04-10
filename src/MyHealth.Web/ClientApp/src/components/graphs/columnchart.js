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
        colors="#e8a838"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#000",
            size: 5,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#000",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
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
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: ytitle,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#111111"
        legends={[]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default ColumnChart;
