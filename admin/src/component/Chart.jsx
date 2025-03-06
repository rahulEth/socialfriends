// components/TransactionChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary componentss
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TransactionChart() {
  const data = {
    labels: [10, 50, 70, 200, 300],
    datasets: [
      {
        label: "Token",
        data: [500, 3500, 3500, 7600, 9000],
        borderColor: "#4CAF50",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: "User" } },
      y: { title: { display: true, text: "Token" } },
    },
  };

  return (
    <div className="p-8 bg-[#f2ffe5] rounded-lg shadow-md max-w-[1130px] mx-auto">
      <Line
        className="max-w-[1000px] min-h-[500px] h-full w-full mx-auto"
        data={data}
        options={options}
      />
    </div>
  );
}

export default TransactionChart;
