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

const Plot3 = ({ apdata }) => {

  if (!apdata) {
    console.error('Data is null or undefined');
    return null;
  }

  let dataset = null;

  if (Object.keys(apdata).length == 1){
    const label1 = apdata[0].map(entry => entry.YEAR);
    const dataPoints1 = apdata[0].map(entry => entry.NUMBER_OF_CRIMES);

   dataset = {
    labels: label1,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataPoints1,
        backgroundColor: "aqua",
        borderColor: 'black'
      }
    ]
  }
  }

  else if (Object.keys(apdata).length ==2){
    const label1 = apdata[0].map(entry => entry.YEAR);
  const dataPoints1 = apdata[0].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints2 = apdata[1].map(entry => entry.NUMBER_OF_CRIMES);



   dataset = {
    labels: label1,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataPoints1,
        backgroundColor: "aqua",
        borderColor: 'black'
      },
      {
        label: 'Dataset 2',
        data: dataPoints2,
        backgroundColor: "orange",
        borderColor: 'red'
      }
    ]
  }
  }

  else if (Object.keys(apdata).length ==3){
    const label1 = apdata[0].map(entry => entry.YEAR);
  const dataPoints1 = apdata[0].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints2 = apdata[1].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints3 = apdata[2].map(entry => entry.NUMBER_OF_CRIMES);


   dataset = {
    labels: label1,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataPoints1,
        backgroundColor: "aqua",
        borderColor: 'black'
      },
      {
        label: 'Dataset 2',
        data: dataPoints2,
        backgroundColor: "orange",
        borderColor: 'red'
      },
      {
        label: 'Dataset 3',
        data: dataPoints3,
        backgroundColor: "green",
        borderColor: 'blue'
      }
    ]
  }
  }

  else if (Object.keys(apdata).length ==4){
    const label1 = apdata[0].map(entry => entry.YEAR);
  const dataPoints1 = apdata[0].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints2 = apdata[1].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints3 = apdata[2].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints4 = apdata[3].map(entry => entry.NUMBER_OF_CRIMES);


   dataset = {
    labels: label1,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataPoints1,
        backgroundColor: "aqua",
        borderColor: 'black'
      },
      {
        label: 'Dataset 2',
        data: dataPoints2,
        backgroundColor: "orange",
        borderColor: 'red'
      },
      {
        label: 'Dataset 3',
        data: dataPoints3,
        backgroundColor: "green",
        borderColor: 'blue'
      },
      {
        label: 'Dataset 4',
        data: dataPoints4,
        backgroundColor: "purple",
        borderColor: 'pink'
      }
    ]
  }
  }

  else if (Object.keys(apdata).length ==5){
    const label1 = apdata[0].map(entry => entry.YEAR);
  const dataPoints1 = apdata[0].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints2 = apdata[1].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints3 = apdata[2].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints4 = apdata[3].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints5 = apdata[4].map(entry => entry.NUMBER_OF_CRIMES);


   dataset = {
    labels: label1,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataPoints1,
        backgroundColor: "aqua",
        borderColor: 'black'
      },
      {
        label: 'Dataset 2',
        data: dataPoints2,
        backgroundColor: "orange",
        borderColor: 'red'
      },
      {
        label: 'Dataset 3',
        data: dataPoints3,
        backgroundColor: "green",
        borderColor: 'blue'
      },
      {
        label: 'Dataset 4',
        data: dataPoints4,
        backgroundColor: "purple",
        borderColor: 'pink'
      },
      {
        label: 'Dataset 5',
        data: dataPoints5,
        backgroundColor: "brown",
        borderColor: 'gray'
      }
    ]
  }
  }

  else if(Object.keys(apdata).length ==6){
    const label1 = apdata[0].map(entry => entry.YEAR);
  const dataPoints1 = apdata[0].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints2 = apdata[1].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints3 = apdata[2].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints4 = apdata[3].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints5 = apdata[4].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints6 = apdata[5].map(entry => entry.NUMBER_OF_CRIMES);


   dataset = {
    labels: label1,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataPoints1,
        backgroundColor: "aqua",
        borderColor: 'black'
      },
      {
        label: 'Dataset 2',
        data: dataPoints2,
        backgroundColor: "orange",
        borderColor: 'red'
      },
      {
        label: 'Dataset 3',
        data: dataPoints3,
        backgroundColor: "green",
        borderColor: 'blue'
      },
      {
        label: 'Dataset 4',
        data: dataPoints4,
        backgroundColor: "purple",
        borderColor: 'pink'
      },
      {
        label: 'Dataset 5',
        data: dataPoints5,
        backgroundColor: "brown",
        borderColor: 'gray'
      },
      {
        label: 'Dataset 6',
        data: dataPoints6,
        backgroundColor: "yellow",
        borderColor: 'darkblue'
      }
    ]
  }
  }
  else if(Object.keys(apdata).length ==7 || Object.keys(apdata).length==0){

  const label1 = apdata[0].map(entry => entry.YEAR);
  const dataPoints1 = apdata[0].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints2 = apdata[1].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints3 = apdata[2].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints4 = apdata[3].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints5 = apdata[4].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints6 = apdata[5].map(entry => entry.NUMBER_OF_CRIMES);

  const dataPoints7 = apdata[6].map(entry => entry.NUMBER_OF_CRIMES);


   dataset = {
    labels: label1,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataPoints1,
        backgroundColor: "aqua",
        borderColor: 'black'
      },
      {
        label: 'Dataset 2',
        data: dataPoints2,
        backgroundColor: "orange",
        borderColor: 'red'
      },
      {
        label: 'Dataset 3',
        data: dataPoints3,
        backgroundColor: "green",
        borderColor: 'blue'
      },
      {
        label: 'Dataset 4',
        data: dataPoints4,
        backgroundColor: "purple",
        borderColor: 'pink'
      },
      {
        label: 'Dataset 5',
        data: dataPoints5,
        backgroundColor: "brown",
        borderColor: 'gray'
      },
      {
        label: 'Dataset 6',
        data: dataPoints6,
        backgroundColor: "yellow",
        borderColor: 'darkblue'
      },
      {
        label: 'Dataset 7',
        data: dataPoints7,
        backgroundColor: "teal",
        borderColor: 'navy'
      }
    ]
  }
  };

  return (
    <div>
      <Line
        data={dataset}
        options={{
          scales: {
            x: {
              type: 'linear', // You can use 'linear' or 'time' depending on your data
              position: 'bottom',
              title: {
                display: true,
                text: 'Year'
              }
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Number of Crimes'
              }
            }
          }
        }}
      ></Line>
    </div>
  );
};

export default Plot3;