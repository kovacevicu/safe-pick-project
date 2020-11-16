import React from "react";
import { v4 as uuid4 } from "uuid";
import "../assets/styles.css";

function CountriesTable({ countryData, countryName }) {
  return (
    <div className="tableDiv">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }} colSpan={3}>
              {countryName}
            </th>
          </tr>
          <tr>
            <th>Destination</th>
            <th>Lowest price</th>
            <th>Listings</th>
          </tr>
        </thead>
        <tbody>
          {countryData &&
            countryData.map((cd) => (
              <tr key={uuid4()}>
                <td key={uuid4()}>{cd.place}</td>
                <td style={{ color: "green" }} key={uuid4()}>
                  {cd.price}
                </td>
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={cd.link}
                    key={uuid4()}
                  >
                    Explore
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountriesTable;
