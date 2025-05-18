import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register all required components including the Filler plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const DailyForecastChart = ({ labels, temperatures }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',  // Background color for filled area
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const temperature = context.parsed.y;
            return `${temperature}°C`;  // Custom tooltip content
          },
        },
      },
      legend: {
        display: false,  // Hide the legend
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#888', maxRotation: 45, minRotation: 45 },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div>
      <h2 className="text-md font-bold mb-2 text-black dark:text-white">14-Day Forecast</h2>
      <div style={{ height: '250px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DailyForecastChart;
