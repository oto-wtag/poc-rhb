import React, { useState } from "react";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { STATIONS } from "../data/stations.json";
import { Trains } from "../data/trains.json";
import TrainIcon from "../assets/icons/marked-train.svg";
import StationIcon from "../assets/icons/station.svg";
import MarkerComponent from "./ui/marker";
import { useSearchParams } from "react-router-dom";
import { INCIDENTS } from "@/data/incident-data.json";
import IncidentMarkerIcon from "@/assets/icons/incident-marker-icon.svg";
import StationData from "@/data/stations-data.json";
import { useIsMobile } from "@/hooks/use-mobile";

const MapComponent = () => {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const [stations] = useState([...STATIONS]);
  const [trains] = useState([...Trains]);
  const [incidents] = useState([...INCIDENTS]);
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const handleTrainMarkerClick = (route) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.forEach((_, key) => {
      if (key !== "mv") {
        newParams.delete(key);
      }
    });
    newParams.set("route-details", route.id);
    setSearchParams(newParams);
  };

  const handleStationMarkerClick = (station) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.forEach((_, key) => {
      if (key !== "mv") {
        newParams.delete(key);
      }
    });

    newParams.set("station", station.name.toLowerCase());
    setSearchParams(newParams);
  };

  const handleIncidentMarkerClick = (incident) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.forEach((_, key) => {
      if (key !== "mv") {
        newParams.delete(key);
      }
    });

    newParams.set("incident-details", incident.id);
    setSearchParams(newParams);
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
      <NavigationControl position={isMobile ? "top-right" : "top-left"} />
      {StationData.stations.map((station, index) => (
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

      {incidents?.map((incident, index) => (
        <MarkerComponent
          key={index}
          classProps={"cursor-pointer"}
          longitude={incident.location.longitude}
          latitude={incident.location.latitude}
          Icon={IncidentMarkerIcon}
          handleClick={() => handleIncidentMarkerClick(incident)}
        />
      ))}
    </Map>
  );
};

export default MapComponent;
