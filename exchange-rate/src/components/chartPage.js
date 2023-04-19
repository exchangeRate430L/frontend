import React, { useRef, useEffect } from "react";
import {Chart} from "chart.js";

const BarChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Label 1", "Label 2", "Label 3"],
        datasets: [
          {
            label: "Data 1",
            data: [10, 20, 30],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
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

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
