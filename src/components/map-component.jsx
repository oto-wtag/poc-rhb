import React, { useState } from "react";
import Map, { Layer, Source } from "react-map-gl/mapbox";
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
import { useEffect } from "react";

const MapComponent = () => {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const [stations] = useState([...STATIONS]);
  const [trains] = useState([...Trains]);
  const [incidents] = useState([...INCIDENTS]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [transitData, setTransitData] = useState(null);

  useEffect(() => {
    fetch("/hotosm_che_railways_lines_geojson.geojson")
      .then((response) => response.json())
      .then((data) => setTransitData(data));
  }, []);

  const handleTrainMarkerClick = (route) => {
    setSearchParams({});
    setSearchParams({ "route-details": route.id });
  };

  const handleStationMarkerClick = (station) => {
    setSearchParams({});
    setSearchParams({ station: station.name.toLowerCase() });
  };

  const handleIncidentMarkerClick = (incident) => {
    setSearchParams({});
    setSearchParams({ "incident-details": incident.id });
  };

  const layerStyle = {
    id: "railway-route",
    type: "line",
    paint: {
      "line-color": "#FF0000", // Red line
      "line-width": 4, // Thickness
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
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

      <Source id="polylineLayer" type="geojson" data={transitData}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
};

export default MapComponent;
