import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
import { ResponsiveLine } from '@nivo/line'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const data = {
  id: "japan",
  color: "hsl(14, 70%, 50%)",
  data: [
    {
      x: "plane",
      y: 240,
    },
    {
      x: "helicopter",
      y: 216,
    },
    {
      x: "boat",
      y: 272,
    },
    {
      x: "train",
      y: 27,
    },
    {
      x: "subway",
      y: 159,
    },
    {
      x: "bus",
      y: 61,
    },
    {
      x: "car",
      y: 6,
    },
    {
      x: "moto",
      y: 114,
    },
    {
      x: "bicycle",
      y: 289,
    },
    {
      x: "horse",
      y: 114,
    },
    {
      x: "skateboard",
      y: 38,
    },
    {
      x: "others",
      y: 250,
    },
  ],
};

const options = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light2", // "light1", "dark1", "dark2"
  title: {
    text: "Basic Column Chart in React",
  },
  data: [
    {
      type: "column",
      dataPoints: [
        { label: "Apple", y: 10 },
        { label: "Orange", y: 15 },
        { label: "Banana", y: 25 },
        { label: "Mango", y: 30 },
        { label: "Grape", y: 28 },
      ],
    },
  ],
};

const graph = () => {
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
};

export default graph;
