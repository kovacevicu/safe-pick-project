import React from "react";

function InfowindowContent({ selected }) {
  return (
    <div
      style={{
        width: "250px",
        height: "118px",
        fontSize: 11,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h6
              style={{
                color: "#3e93b8",
                borderBottom: "1.5px solid #6a6a6a",
                marginBottom: "5px",
              }}
            >
              {selected.countryName}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-6" style={{ borderRight: "1.5px solid #6a6a6a" }}>
            <span
              style={{
                color: "#004f99",
                fontSize: "15px",
                borderBottom: "0.5px solid #004f99",
              }}
            >
              Cases:
            </span>
            <p style={{ paddingTop: "5px" }}>
              Confirmed:
              <span style={{ fontWeight: "bold", color: "brown" }}>
                {selected.covidCases[0].cases.total}
              </span>
              <br />
              New:
              <span style={{ fontWeight: "bold", color: "orange" }}>
                {selected.covidCases[0].cases.new}
              </span>
              <br />
              Active:
              <span style={{ fontWeight: "bold", color: "darkblue" }}>
                {selected.covidCases[0].cases.active}
              </span>
              <br />
              Recovered:
              <span style={{ fontWeight: "bold", color: "green" }}>
                {selected.covidCases[0].cases.recovered}
              </span>
            </p>
          </div>
          <div className="col-6">
            <span
              style={{
                color: "#004f99",
                fontSize: "15px",
                borderBottom: "0.5px solid #004f99",
              }}
            >
              Deaths:
            </span>
            <p style={{ paddingTop: "5px" }}>
              Confirmed:
              <span style={{ fontWeight: "bold", color: "brown" }}>
                {selected.covidCases[0].deaths.total}
              </span>
              <br />
              New:
              <span style={{ fontWeight: "bold", color: "orange" }}>
                {selected.covidCases[0].deaths.new}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfowindowContent;
