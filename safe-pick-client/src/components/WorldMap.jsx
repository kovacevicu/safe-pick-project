import React, { useState, useContext } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import geocode from "react-geocode";
import MapButton from "./MapButton";
import InfowindowContent from "./InfowindowContent";
import CovidContext from "./../context/covidContext";
import mapStyles from "../assets/mapStyles";
import "../assets/styles.css";
import {
  parseCountryName,
  reFormatCountryName,
} from "./../helpers/countryNameParser";

const mapContainerStyle = {
  height: "230px",
  border: "2px solid grey",
  borderRadius: "15px",
};

const center = {
  lat: 44.590467,
  lng: 0.943812,
};

const options = {
  styles: mapStyles,
  minZoom: 1,
  maxZoom: 4,
  disableDefaultUI: true,
  disableAutoPan: true,
};

function WorldMap({ user }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [selected, setSelected] = useState(null);

  const covidContext = useContext(CovidContext);

  geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  geocode.setLanguage("en");

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading map...";

  return (
    <div className="mapDiv">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={1}
        center={center}
        options={options}
        onClick={async (e) => {
          const { results } = await geocode.fromLatLng(
            e.latLng.lat(),
            e.latLng.lng()
          );
          const ctryName = parseCountryName(results);
          const getName = reFormatCountryName(ctryName);
          const covidCases = await covidContext.onSearch(getName);
          const covidHistory = await covidContext.onSearchHistory(getName);
          setCountryNames((current) => [...current, getName]);
          setMarkers((current) => [
            ...current,
            {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
              time: new Date(),
              countryName: getName,
              covidCases: covidCases,
              covidHistory: covidHistory,
            },
          ]);
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/mrk.svg",
              scaledSize: new window.google.maps.Size(13, 13),
              anchor: new window.google.maps.Point(6, 8),
            }}
            onMouseOver={() => {
              setSelected(marker);
            }}
            onClick={() => {
              const markersArray = [...markers];
              const filtered = markersArray.filter((m) => m !== marker);
              const filteredNames = countryNames.filter(
                (cn) => cn !== marker.countryName
              );
              setCountryNames(filteredNames);
              setMarkers(filtered);
              setSelected(null);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
            options={{ disableAutoPan: true }}
          >
            <div>
              <InfowindowContent selected={selected} />
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      {user && (
        <MapButton markers={markers} country={user.country} city={user.city} />
      )}
    </div>
  );
}

export default WorldMap;
