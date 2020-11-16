import React from "react";

function StaticInfoDiv(props) {
  return (
    <div
      className="staticDiv"
      style={{ padding: "0px 120px 0px 120px", marginTop: "25px" }}
    >
      <h2 className="staticDivText">SELECT YOUR DESIRED DESTINATIONS!</h2>
      <p className="staticDivP">
        <i>
          Select the countries you want to travel to on our map and click the
          search button bellow to see all the best prices from our wide array of
          travel agencies! We also provide day to day COVID-19 pandemic stats to
          keep you safe while you travel!
        </i>
        <br />
      </p>
    </div>
  );
}

export default StaticInfoDiv;
