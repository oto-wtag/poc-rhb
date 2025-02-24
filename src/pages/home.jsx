import React, { useState, useEffect } from "react";
import MapComponent from "@/components/map-component";
import { useSearchParams } from "react-router-dom";

import RouteSheet from "@/components/main-sheets/route-sheet";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRoute = searchParams.get("r");
  const [routesSheetOpen, setRoutesSheetOpen] = useState(false);
  const [stationsSheetOpen, setStationsSheetOpen] = useState(false);
  const [incidentsSheetOpen, setIncidentsSheetOpen] = useState(false);
  const [maintenanceSheetOpen, setMaintenanceSheetOpen] = useState(false);

  useEffect(() => {
    const setSheets = () => {
      if (currentRoute === "routes") {
        setRoutesSheetOpen(true);
      } else {
        setRoutesSheetOpen(false);
      }
    };
    setSheets();
  }, [currentRoute]);

  return (
    <>
      <RouteSheet
        routesSheetOpen={routesSheetOpen}
        setRoutesSheetOpen={setRoutesSheetOpen}
      />
      <MapComponent />
    </>
  );
};

export default Home;
