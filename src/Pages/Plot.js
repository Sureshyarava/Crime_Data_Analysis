import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

function Plot() {
    const [data, setData] = useState(null);
    const chartRef = React.createRef();

    useEffect(() => {
        // Fetch data from the Flask API or data source
        // For this example, we'll use sample data
        const sampleData = {
            labels: ['Label 1', 'Label 2', 'Label 3'],
            values: [10, 20, 15],
        };
        setData(sampleData);
    }, []);

    useEffect(() => {
        if (data) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Specify the chart type as 'bar'
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'My Bar Chart',
                            data: data.values,
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
    }, [data, chartRef]); // Add data as a dependency
    

    return (
        <div>
            <label>Sample Bar Chart</label>
            <canvas ref={chartRef} />
        </div>
    );
}

export default Plot;
