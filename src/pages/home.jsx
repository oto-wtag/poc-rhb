import React, { useState, useEffect } from "react";
import MapComponent from "@/components/map-component";
import { useSearchParams } from "react-router-dom";

import RouteSheet from "@/components/main-sheets/route-sheet";
import RouteDetailsSheet from "@/components/main-sheets/route-details-sheet";
import StationSheet from "@/components/main-sheets/station-sheet";
import IncidentsSheet from "@/components/main-sheets/incidents-sheet";
import MaintenanceSheet from "@/components/main-sheets/maintenance-sheet";
import IncidentDetails from "@/components/main-sheets/incident-details";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRoute = searchParams.get("t");
  const routeDetails = searchParams.get("route-details");
  const incidentDetails = searchParams.get("incident-details");

  const [routesSheetOpen, setRoutesSheetOpen] = useState(false);
  const [stationsSheetOpen, setStationsSheetOpen] = useState(false);
  const [incidentsSheetOpen, setIncidentsSheetOpen] = useState(false);
  const [maintenanceSheetOpen, setMaintenanceSheetOpen] = useState(false);
  const [routeDetailsSheetOpen, setRouteDetailsSheetOpen] = useState(false);
  const [incidentDetailsSheetOpen, setIncidentDetailsSheetOpen] =
    useState(false);

  useEffect(() => {
    const setSheets = () => {
      if (currentRoute === "routes") {
        setRoutesSheetOpen(true);
        setStationsSheetOpen(false);
        setIncidentsSheetOpen(false);
        setMaintenanceSheetOpen(false);
      } else if (currentRoute === "stations") {
        setRoutesSheetOpen(false);
        setStationsSheetOpen(true);
        setIncidentsSheetOpen(false);
        setMaintenanceSheetOpen(false);
      } else if (currentRoute === "incidents") {
        setRoutesSheetOpen(false);
        setStationsSheetOpen(false);
        setIncidentsSheetOpen(true);
        setMaintenanceSheetOpen(false);
      } else if (currentRoute === "maintenance") {
        setRoutesSheetOpen(false);
        setStationsSheetOpen(false);
        setIncidentsSheetOpen(false);
        setMaintenanceSheetOpen(true);
      } else {
        setRoutesSheetOpen(false);
        setStationsSheetOpen(false);
        setIncidentsSheetOpen(false);
        setMaintenanceSheetOpen(false);
      }

      if (routeDetails) {
        setRouteDetailsSheetOpen(true);
        setIncidentDetailsSheetOpen(false);
      } else if (incidentDetails) {
        setRouteDetailsSheetOpen(false);
        setIncidentDetailsSheetOpen(true);
      } else {
        setRouteDetailsSheetOpen(false);
        setIncidentDetailsSheetOpen(false);
      }
    };
    setSheets();
  }, [currentRoute, routeDetails, incidentDetails]);

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

      <StationSheet
        stationsSheetOpen={stationsSheetOpen}
        setStationsSheetOpen={setStationsSheetOpen}
      />

      <IncidentsSheet
        incidentsSheetOpen={incidentsSheetOpen}
        setIncidentsSheetOpen={setIncidentsSheetOpen}
      />

      <IncidentDetails
        incidentDetailSheetOpen={incidentDetailsSheetOpen}
        setIncidentDetailsSheetOpen={setIncidentDetailsSheetOpen}
      />

      <MaintenanceSheet
        maintenanceSheetOpen={maintenanceSheetOpen}
        setMaintenanceSheetOpen={setMaintenanceSheetOpen}
      />

      <MapComponent />
    </>
  );
};

export default Home;
