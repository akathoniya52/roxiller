"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function ChartBar() {
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: ["red", "blue", "yellow"],
          datasets: [
            {
              label: "# of voters",
              data: [12, 3, 9],
              backgroundColor: ["orange", "red", "green"],
              borderWidth: 2,
            },
          ],
        },
        option: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      chartRef.current.chart = newChart;
    }
  }, []);

  return (
    <div className="relative h-[40vh] w-[80vw]">
      Chart js
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
