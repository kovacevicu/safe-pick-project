import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../assets/styles.css";

function NavBar({ user }) {
  return (
    <div style={{ position: "relative" }}>
      <header className="">
        <nav className="navbar">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <h2>
                safe<em>PICK</em>
              </h2>
            </Link>
            <div className="functional-buttons">
              {user ? (
                <ul>
                  <li>
                    <NavLink to="#">{user.email}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/logout">Log out</NavLink>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink to="/login">Log in</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Sign Up</NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
