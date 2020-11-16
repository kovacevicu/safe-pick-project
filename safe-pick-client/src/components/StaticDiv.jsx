import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles.css";

function StaticDiv(props) {
  return (
    <div className="col-3 staticDiv">
      <h2 className="staticDivText">PLEASE LOG IN TO USE OUR SERVICES!</h2>
      <p className="staticDivP">
        <i>Don't have an account?</i>
        <br />
      </p>
      <span className="staticDivS">
        <NavLink to="/register" className="staticDivA">
          SIGN UP
        </NavLink>
      </span>
    </div>
  );
}

export default StaticDiv;
