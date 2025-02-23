import React, { useEffect, useState, useRef } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { STATIONS } from "../data/stations.json";
import { Trains } from "../data/trains.json";
import TrainIcon from "../assets/icons/train.svg";
import StationIcon from "../assets/icons/station.svg";
import MarkerComponent from "./ui/marker";

const MapComponent = () => {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const [stations] = useState([...STATIONS]);
  const [trains] = useState([...Trains]);

  return (
    <Map
      mapboxAccessToken={accessToken}
      initialViewState={{
        latitude: 39.1031,
        longitude: -84.512,
        zoom: 7,
      }}
      style={{
        width: "100dvw",
        height: "100dvh",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {stations.map((station) => (
        <MarkerComponent
          key={station.name}
          longitude={station.longitude}
          latitude={station.latitude}
          Icon={StationIcon}
        ></MarkerComponent>
      ))}

      {trains.map((train) => (
        <MarkerComponent
          key={train.trainNumber}
          longitude={train.location.longitude}
          latitude={train.location.latitude}
          Icon={TrainIcon}
        ></MarkerComponent>
      ))}
    </Map>
  );
};

export default MapComponent;
