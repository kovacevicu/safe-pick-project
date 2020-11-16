import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ confirmedCases, recoveredCases, activeCases, country }) {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ["Confirmed Cases", "Total recovered", "Active Cases"],
      backgroundColor: "rgba(149, 165, 166, 1)",
      datasets: [
        {
          data: [confirmedCases, recoveredCases, activeCases],
          backgroundColor: [
            "rgba(30, 139, 195, 1)",
            "rgba(0, 177, 106, 1)",
            "rgba(102, 51, 153, 1)",
          ],
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
      <Pie
        data={chartData}
        options={{
          responsive: true,
          title: {
            text: `Total confirmed, recovered and active cases of COVID-19 in ${country}`,
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

export default PieChart;
