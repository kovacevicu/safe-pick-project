import React, { Component } from "react";
import { Route } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import CountriesTable from "./CountriesTable";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Banner from "./Banner";
import Footer from "./Footer";
import PieChart from "./charts/PieChart";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import CountryContext from "./../context/countryContext";
import CountryNameContext from "../context/countryNameContext";
import CovidContext from "./../context/covidContext";
import * as userService from "../helpers/userService";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles.css";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const apiKey = process.env.REACT_APP_RAPID_API_API_KEY;

class Home extends Component {
  state = {
    countryData: [],
    countryNames: [],
    covidData: {},
    covidHistory: {},
  };

  componentDidMount() {
    if (this.props.match.params.token) {
      userService.activate(this.props.match.params.token);
      this.props.history.push("/");
    }
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user }, () => {});
    } catch (ex) {}
  }

  handleSearch = async (markers, country, city) => {
    const { data } = await axios.post(apiEndpoint + "/countries", {
      markers: markers,
      country: country,
      city: city,
    });
    this.setState({ countryData: data });
  };

  handleGetNames = async () => {
    const { data } = await axios.get(apiEndpoint + "/countries");
    this.setState({ countryNames: data });
  };

  handleGetCovidData = async (country) => {
    const {
      data: { response },
    } = await axios.get(
      `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
        },
      }
    );
    const covidData = { ...this.state.covidData, [country]: response[0] };
    this.setState({ covidData });
    return response;
  };

  handleGetCovidHistory = async (country) => {
    const {
      data: { response },
    } = await axios.get(
      `https://covid-193.p.rapidapi.com/history?country=${country}`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
        },
      }
    );
    const covidHistory = {
      ...this.state.covidHistory,
      [country]: response.slice(0, 16),
    };
    this.setState({ covidHistory });
    return response;
  };

  render() {
    return (
      <CountryNameContext.Provider
        value={{
          countryNames: this.state.countryNames,
          onSearch: this.handleGetNames,
        }}
      >
        <CountryContext.Provider
          value={{
            countryData: this.state.countryData,
            onSearch: this.handleSearch,
          }}
        >
          <CovidContext.Provider
            value={{
              covidData: this.state.covidData,
              covidHistory: this.state.covidHistory,
              onSearch: this.handleGetCovidData,
              onSearchHistory: this.handleGetCovidHistory,
            }}
          >
            <NavBar user={this.state.user} />
            <ToastContainer />
            <Banner user={this.state.user} />
            <SideBar countryNames={this.state.countryNames} />
            {this.state.countryNames.map((cn) => (
              <Route
                key={uuid4()}
                path={`/${cn}`}
                render={(props) => (
                  <div className="row m-1">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <CountriesTable
                        key={uuid4()}
                        countryData={this.state.countryData[cn]}
                        countryName={cn}
                      />
                    </div>
                    {this.state.covidData[cn] && (
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <PieChart
                          confirmedCases={this.state.covidData[cn].cases.total}
                          recoveredCases={
                            this.state.covidData[cn].cases.recovered
                          }
                          activeCases={this.state.covidData[cn].cases.active}
                          country={cn}
                        />
                        <LineChart
                          covidHistory={this.state.covidHistory[cn]}
                          country={cn}
                        />
                        <BarChart
                          population={this.state.covidData[cn].population}
                          tested={this.state.covidData[cn].tests.total}
                          country={cn}
                        />
                      </div>
                    )}
                  </div>
                )}
              ></Route>
            ))}
            <Footer />
          </CovidContext.Provider>
        </CountryContext.Provider>
      </CountryNameContext.Provider>
    );
  }
}

export default Home;
