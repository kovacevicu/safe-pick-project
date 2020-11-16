import React, { useContext } from "react";
import "../assets/styles.css";
import CountryContext from "./../context/countryContext";
import CountryNameContext from "./../context/countryNameContext";

function MapButton({ markers, country, city }) {
  const countryContext = useContext(CountryContext);
  const countryNameContext = useContext(CountryNameContext);
  return (
    <button
      className="search"
      style={{ cursor: "pointer" }}
      onClick={() => {
        countryNameContext.onSearch();
        countryContext.onSearch(markers, country, city);
      }}
    >
      Search
    </button>
  );
}

export default MapButton;
