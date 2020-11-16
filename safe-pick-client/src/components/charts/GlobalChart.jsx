import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const apiKey = process.env.REACT_APP_RAPID_API_API_KEY;

class GlobalChart extends Component {
  state = { chartdata: {} };

  chart = (res) => {
    const chartData = {
      labels: ["Confirmed", "Recovered", "Active"],
      backgroundColor: "rgba(149, 165, 166, 1)",
      datasets: [
        {
          data: [
            res.data.summary.total_cases,
            res.data.summary.recovered,
            res.data.summary.active_cases,
          ],
          backgroundColor: [
            "rgba(66,66,66, 0.8)",
            "rgba(4, 147, 114, 1)",
            "rgba(62, 147, 184, 1.0)",
          ],
          borderWidth: 4,
        },
      ],
    };
    this.setState({ chartData });
  };

  async componentDidMount() {
    const { data } = await axios.get(
      "https://coronavirus-map.p.rapidapi.com/v1/summary/latest",
      {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
        },
      }
    );
    this.chart(data);
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <div
        style={{
          marginBottom: "20px",
          marginLeft: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.state.chartData && (
          <Pie
            data={this.state.chartData}
            options={{
              responsive: true,
              title: {
                text:
                  "Total Confirmed, Recovered, and Active cases of COVID-19 worldwide",
                display: true,
              },
              scales: {
                yAxes: [
                  {
                    display: false,
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
                    display: false,
                    gridLines: {
                      display: false,
                    },
                  },
                ],
              },
            }}
          />
        )}
      </div>
    );
  }
}

export default GlobalChart;
