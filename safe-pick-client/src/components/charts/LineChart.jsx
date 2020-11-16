import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import formatHistory from "../../helpers/covidHistoryFormatter";

function LineChart({ covidHistory, country }) {
  const [chartData, setChartData] = useState({});
  const [newCases, days] = formatHistory(covidHistory);

  const chart = () => {
    setChartData({
      labels: days,
      datasets: [
        {
          label: `New cases in ${country} in the past 10 days`,
          data: newCases,
          backgroundColor: "rgba(244, 208, 63, 1)",
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <div style={{ marginBottom: "40px", borderBottom: "2px solid #6a6a6a" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          title: {
            text: `New cases of COVID-19 in ${country} in the past 10 days`,
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

export default LineChart;
