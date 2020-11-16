import React from "react";
import { NavLink } from "react-router-dom";

function Footer(props) {
  return (
    <footer>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="row">
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="footer-item">
              <div className="footer-heading">
                <h2>Sites</h2>
              </div>
              <ul className="footer-list">
                <li>
                  <NavLink to="#">Kiwi.com</NavLink>
                </li>
                <li>
                  <NavLink to="#">SkyScanner.com</NavLink>
                </li>
                <li>
                  <NavLink to="#">Travelland.com</NavLink>
                </li>
                <li>
                  <NavLink to="#">Booking.com</NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="footer-item">
              <div className="footer-heading">
                <h2>About Us</h2>
              </div>
              <p>
                SAFEpick is a free webiste for travel agency price comparison
                during the COVID-19 pandemic. Our goal is for you to travel safe
                during these rough times!
              </p>
            </div>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="footer-item">
              <div className="footer-heading">
                <h2>More Information</h2>
              </div>
              <ul className="footer-list">
                <li>
                  Phone: <NavLink to="#">011-243-321</NavLink>
                </li>
                <li>
                  Email: <NavLink to="#">safepicorg@gmail.com</NavLink>
                </li>
                <li>
                  Home: <NavLink to="/">www.safepick.com</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12">
            <div className="sub-footer">
              <p>Copyright &copy; SAFEpick Org.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
