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

  if (!apdata) {
    console.error('Data is null or undefined');
    return null;
  }

  console.log("In Plot");
  console.log(apdata);

  const label1 = apdata[0].map(entry => entry.YEAR);
  const dataPoints1 = apdata[0].map(entry => entry.NUMBER_OF_CRIMES);

  const label2 = apdata[1].map(entry => entry.YEAR);
  const dataPoints2 = apdata[1].map(entry => entry.NUMBER_OF_CRIMES);

  const label3 = apdata[2].map(entry => entry.YEAR);
  const dataPoints3 = apdata[2].map(entry => entry.NUMBER_OF_CRIMES);

  const maxDataPoints = Math.max(dataPoints1)

  const dataset = {
    labels: label1,
    datasets: [
      {
        label: 'Dataset 1', // Add a label for the first dataset
        data: dataPoints1,
        backgroundColor: "aqua",
        borderColor: 'black'
      },
      {
        label: 'Dataset 2', // Add a label for the second dataset
        data: dataPoints2,
        backgroundColor: "orange",
        borderColor: 'red'
      },
      {
        label: 'Dataset 3', // Add a label for the third dataset
        data: dataPoints3,
        backgroundColor: "green",
        borderColor: 'blue'
      }
    ]
  };

  return (
    <div>
      <Line
        data={dataset}
      ></Line>
    </div>
  );
};

export default Plot;