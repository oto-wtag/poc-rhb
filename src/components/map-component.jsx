import React, { useState } from "react";
import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { STATIONS } from "../data/stations.json";
import { Trains } from "../data/trains.json";
import TrainIcon from "../assets/icons/marked-train.svg";
import StationIcon from "../assets/icons/station.svg";
import MarkerComponent from "./ui/marker";
import { useSearchParams } from "react-router-dom";

const MapComponent = () => {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const [stations] = useState([...STATIONS]);
  const [trains] = useState([...Trains]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTrainMarkerClick = (route) => {
    setSearchParams({});
    setSearchParams({ "route-details": route.id });
  };

  const handleStationMarkerClick = (station) => {
    setSearchParams({});
    setSearchParams({ station: station.name });
  };

  return (
    <Map
      mapboxAccessToken={accessToken}
      initialViewState={{
        latitude: 47.3471,
        longitude: 8.7178,
        zoom: 9,
      }}
      style={{
        width: "100dvw",
        height: "100dvh",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {stations.map((station, index) => (
        <MarkerComponent
          key={index}
          classProps={"cursor-pointer"}
          longitude={station.longitude}
          latitude={station.latitude}
          Icon={StationIcon}
          handleClick={() => handleStationMarkerClick(station)}
        />
      ))}

      {trains.map((train, index) => (
        <MarkerComponent
          key={index}
          classProps={"cursor-pointer"}
          longitude={train.location.longitude}
          latitude={train.location.latitude}
          Icon={TrainIcon}
          handleClick={() => handleTrainMarkerClick(train)}
        />
      ))}
    </Map>
  );
};

export default MapComponent;
