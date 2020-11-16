import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ population, tested, country }) {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ["Population", "Tested"],
      backgroundColor: "rgba(149, 165, 166, 1)",
      datasets: [
        {
          data: [population, tested],
          backgroundColor: ["rgba(102, 51, 153, 1)", "rgba(192, 57, 43, 1)"],
          borderWidth: 4,
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <div style={{ marginBottom: "40px", borderBottom: "2px solid #6a6a6a" }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          legend: {
            display: false,
          },
          title: {
            text: `Total tested for COVID-19 by population in ${country}`,
            display: true,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default BarChart;
