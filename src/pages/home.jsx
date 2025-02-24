import React, { useState, useEffect } from "react";
import MapComponent from "@/components/map-component";
import { useSearchParams } from "react-router-dom";

import RouteSheet from "@/components/main-sheets/route-sheet";
import RouteDetailsSheet from "@/components/main-sheets/route-details-sheet";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRoute = searchParams.get("t");
  const routeDetails = searchParams.get("route-details");

  const [routesSheetOpen, setRoutesSheetOpen] = useState(false);
  const [stationsSheetOpen, setStationsSheetOpen] = useState(false);
  const [incidentsSheetOpen, setIncidentsSheetOpen] = useState(false);
  const [maintenanceSheetOpen, setMaintenanceSheetOpen] = useState(false);
  const [routeDetailsSheetOpen, setRouteDetailsSheetOpen] = useState(false);

  useEffect(() => {
    const setSheets = () => {
      if (currentRoute === "routes") {
        setRoutesSheetOpen(true);
      } else {
        setRoutesSheetOpen(false);
      }

      if (routeDetails) {
        setRouteDetailsSheetOpen(true);
      } else {
        setRouteDetailsSheetOpen(false);
      }
    };
    setSheets();
  }, [currentRoute, routeDetails]);

  return (
    <>
      <RouteSheet
        routesSheetOpen={routesSheetOpen}
        setRoutesSheetOpen={setRoutesSheetOpen}
      />

      <RouteDetailsSheet
        routeDetailsSheetOpen={routeDetailsSheetOpen}
        setRouteDetailsSheetOpen={setRouteDetailsSheetOpen}
      />

      <MapComponent />
    </>
  );
};

export default Home;
