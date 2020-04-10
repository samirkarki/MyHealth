import React, { useState, useEffect } from "react";

import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChart = (prop) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    buildOptions();
  }, []);

  const buildOptions = () => {
    let title = prop.title;
    let data = prop.data;
    let xAxisTitle = prop.xtitle;
    let yAxisTitle = prop.ytitle;
    let dataPoints = [];
    data.forEach((element) => {
      dataPoints.push({ x: element.x, y: element.y });
    });
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: title,
      },
      axisY: {
        title: yAxisTitle,
        includeZero: false,
        suffix: "",
      },
      axisX: {
        title: xAxisTitle,
        prefix: "",
        interval: 1,
      },
      data: [
        {
          type: "spline",
          toolTipContent: "{x}: {y}",
          dataPoints: dataPoints,
        },
      ],
    };

    return setOptions(options);
  };

  return (
    <div className="row col-12 no-gutters align-items-center">
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
};

export default LineChart;
