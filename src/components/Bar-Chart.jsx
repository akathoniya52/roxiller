"use client";
import { useEffect, useState, useRef } from "react";
import HeadingMonth from "./HeadingMonth";
import { getMonthName } from "./data/monthName";
import axios from "axios";
import { Chart } from "chart.js/auto";

export default function BarChart({ selectMonth }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [dataKeys, setDataKeys] = useState("");
  const [dataValues, setDataValues] = useState("");
  useEffect(() => {
    const fetchData = async (selectMonth) => {
      let response = await axios.get(`/api/bar-chart?month=${selectMonth}`);

      const keys = Object.keys(response.data);
      const values = keys.map((key) => response.data[key]);
      setDataKeys(keys);
      setDataValues(values);

      setData(response.data);
    };
    fetchData(getMonthName(parseInt(selectMonth)));
  }, [selectMonth]);

  const chartRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      if (chartRef.current) {
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }

        const context = chartRef.current.getContext("2d");

        const newChart = new Chart(context, {
          type: "bar",
          data: {
            labels: [...dataKeys],
            datasets: [
              {
                label: `Bar-Char for ${getMonthName(parseInt(selectMonth))}`,
                data: [...dataValues],
                backgroundColor: [
                  "#4361ee",
                  "#ffd60a",
                  "#d00000",
                  "#e4ff1a",
                  "#3e7cb1",
                  "#248232",
                  "#00b2ca",
                  "#462255",
                  "#ff206e",
                  "#fb6107",
                ],
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
    };
    fetchData();
    setLoading(false);
  }, [dataKeys, dataValues, selectMonth]);

  return (
    <div className="">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <HeadingMonth title="Bar Chart Stats" selectMonth={selectMonth} />
          </div>
          <div className="py-4 ">
            <canvas ref={chartRef} className=""></canvas>
          </div>
        </>
      )}
    </div>
  );
}
