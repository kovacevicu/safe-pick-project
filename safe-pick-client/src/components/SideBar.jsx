import React from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuid4 } from "uuid";

function SideBar({ countryNames }) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {countryNames.map((cn) => (
              <NavLink
                style={{ fontFamily: "sans-serif" }}
                key={uuid4()}
                className="nav-item nav-link"
                activeClassName="active"
                to={`/${cn}`}
              >
                {cn} <span className="sr-only">(current)</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
