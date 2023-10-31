import React, { useEffect, useState, useRef, useCallback } from 'react';
// import Chart from 'chart.js/auto';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Plot() {
    const [data, setData] = useState(null);
    // const chartRef = React.createRef();
    const chartRef = useRef();
    
    const createChart = useCallback(() => {
        if (chartRef.current && data) { // Check if chartRef is valid and data is not null
          // Check if there's an existing chart, and destroy it
          if (window.myChart) {
            window.myChart.destroy();
          }
      
          // Create a new chart
          window.myChart = new Chart(chartRef.current, {
            type: 'bar',
            data: {
              labels: data.map((dataPoint) => dataPoint.label),
              datasets: [
                {
                  label: 'Sample Bar Graph',
                  data: data.map((dataPoint) => dataPoint.value),
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      }, [data]);
      
    
    useEffect(() => {
        fetch('http://127.0.0.1:5000/bar_data')
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
          })
          .then((result) => {
            setData(result);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
    
    useEffect(() => {
    createChart();
  }, [data, createChart]);

    return (
        <div>
            <label>Sample Bar Chart</label>
            <canvas ref={chartRef} />
        </div>
    );
}

export default Plot;
