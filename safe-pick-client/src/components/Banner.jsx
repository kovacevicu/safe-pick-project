import React from "react";
import HeaderText from "./HeaderText";
import WorldMap from "./WorldMap";
import "../assets/styles.css";
import StaticDiv from "./StaticDiv";
import StaticInfoDiv from "./StaticInfoDiv";
import GlobalChart from "./charts/GlobalChart";

function Banner({ user }) {
  return (
    <div className="banner">
      <HeaderText text="PLAN AHEAD" />
      {user ? (
        <div>
          <WorldMap user={user} />
          <StaticInfoDiv />
        </div>
      ) : (
        <div>
          <WorldMap user={user} />
          <div className="row">
            <div className="col-7 chartDiv">
              <GlobalChart />
            </div>
            <StaticDiv />
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
