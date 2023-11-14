import React from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const Plot = ({ apdata }) => {

  console.log(apdata);

  if (!apdata) {
    return null; 
  }

  const label = apdata.map(entry => entry.YEAR);
  const dataPoints = apdata.map(entry => entry.CRIME_COUNT);

  const maxDataPoints = Math.max(dataPoints)

  console.log(label);

  const dataset = {
    labels: label,
    datasets: [{
      labels: 'Years',
      data: dataPoints,
      backgroundColor: "aqua",
      borderColor: 'black'
      // pointBorderColor: 'aqua'
    }
    ]

  }

  const options = {
    plugins: {
      legend: true
    },
    scales: {
      x:{
        title: {
          display: true,
          text: 'Time', // X-axis label
        },
        min : 2001,
        max : 2024
      },
      y: {
        title: {
          display: true,
          text: 'Crime Count', // Y-axis label
        },
        min: 0,
        max: maxDataPoints,
        ticks: {
          stepSize: 5, // Adjust the step size as needed
        },
      }
    }
  }

  return (
    <div>
      <Line
        data={dataset}
        options={options}
      ></Line>
    </div>
  );
};

export default Plot;
