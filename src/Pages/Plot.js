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

  if (!apdata || !apdata.x || !apdata.y) {
    return null; 
  }

  const dataset = {
    labels: apdata.x,
    datasets: [{
      labels: 'Years',
      data: apdata.y,
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
        min : 0,
        max : 10
      },
      y: {
        min: 0,
        max: 10
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
