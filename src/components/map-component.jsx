import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const [lng] = useState(90.4045);
  const [lat] = useState(23.7938);
  const [zoom] = useState(13);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-left");
    map.current.on("load", () => {
      map.current.resize();
    });
    return () => map.current.remove();
  }, [lat, lng, zoom]);

  return <div className="h-dvh w-full" ref={mapContainerRef} />;
};

export default MapComponent;
