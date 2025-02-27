import React, { useState, useEffect } from "react";
import MapComponent from "@/components/map-component";
import { useSearchParams } from "react-router-dom";

import RouteSheet from "@/components/main-sheets/route-sheet";
import RouteDetailsSheet from "@/components/main-sheets/route-details-sheet";
import StationSheet from "@/components/main-sheets/station-sheet";
import StationDetailsSheet from "@/components/main-sheets/station-details-sheet";
import IncidentsSheet from "@/components/main-sheets/incidents-sheet";
import MaintenanceSheet from "@/components/main-sheets/maintenance-sheet";
import IncidentDetails from "@/components/main-sheets/incident-details";
import MapDetailComponent from "@/components/map-detail-component";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRoute = searchParams.get("t");
  const routeDetails = searchParams.get("route-details");
  const stationDetails = searchParams.get("station");
  const incidentDetails = searchParams.get("incident-details");
  const mapView = searchParams.get("mv") || "map";

  const [routesSheetOpen, setRoutesSheetOpen] = useState(false);
  const [stationsSheetOpen, setStationsSheetOpen] = useState(false);
  const [incidentsSheetOpen, setIncidentsSheetOpen] = useState(false);
  const [maintenanceSheetOpen, setMaintenanceSheetOpen] = useState(false);
  const [routeDetailsSheetOpen, setRouteDetailsSheetOpen] = useState(false);
  const [stationDetailsSheetOpen, setStationDetailsSheetOpen] = useState(false);
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

      if (stationDetails) {
        setStationDetailsSheetOpen(true);
      } else {
        setStationDetailsSheetOpen(false);
      }
    };
    setSheets();
  }, [currentRoute, routeDetails, stationDetails, incidentDetails]);

  const setMapViewParams = (param) => {
    setSearchParams({ mv: param });
    // const newParams = new URLSearchParams(searchParams);
    // newParams.set("mv", param);
    // setSearchParams(newParams);
  };

  return (
    <div className="relative">
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

      <StationDetailsSheet
        stationDetailsSheetOpen={stationDetailsSheetOpen}
        setStationDetailsSheetOpen={setStationDetailsSheetOpen}
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

      <div className="shadow-md outline-2 overflow-hidden outline-white fixed bottom-22 right-5 z-50 bg-white rounded-full">
        <div className="flex">
          <div
            className={`px-3 py-1 ${
              mapView === "map" && "bg-[#FFE0E4]"
            }  cursor-pointer`}
            onClick={() => setMapViewParams("map")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={
                mapView === "map" ? "text-[#EB0A23]" : "text-[#141B34]"
              }
            >
              <path
                d="M5.25345 4.19584L4.02558 4.90813C3.03739 5.48137 2.54329 5.768 2.27164 6.24483C2 6.72165 2 7.30233 2 8.46368V16.6283C2 18.1542 2 18.9172 2.34226 19.3418C2.57001 19.6244 2.88916 19.8143 3.242 19.8773C3.77226 19.9719 4.42148 19.5953 5.71987 18.8421C6.60156 18.3306 7.45011 17.7994 8.50487 17.9435C8.98466 18.009 9.44231 18.2366 10.3576 18.6917L14.1715 20.588C14.9964 20.9982 15.004 21 15.9214 21H18C19.8856 21 20.8284 21 21.4142 20.4013C22 19.8026 22 18.8389 22 16.9117V10.1715C22 8.24423 22 7.2806 21.4142 6.68188C20.8284 6.08316 19.8856 6.08316 18 6.08316H15.9214C15.004 6.08316 14.9964 6.08139 14.1715 5.6712L10.8399 4.01463C9.44884 3.32297 8.75332 2.97714 8.01238 3.00117C7.27143 3.02521 6.59877 3.41542 5.25345 4.19584Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 3L8 17.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 6.5L15 20.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className={`px-3 py-1 ${
              mapView === "detailed" && "bg-[#FFE0E4]"
            } cursor-pointer`}
            onClick={() => setMapViewParams("detailed")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={
                mapView === "detailed" ? "text-[#EB0A23]" : "text-[#141B34]"
              }
            >
              <circle
                cx="18"
                cy="5"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="6"
                cy="19"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5H8.5C6.567 5 5 6.567 5 8.5C5 10.433 6.567 12 8.5 12H15.5C17.433 12 19 13.567 19 15.5C19 17.433 17.433 19 15.5 19H12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {mapView === "map" ? <MapComponent /> : <MapDetailComponent />}
    </div>
  );
};

export default Home;
