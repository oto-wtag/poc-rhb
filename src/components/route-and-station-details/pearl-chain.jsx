import React from "react";
import Timeline from "@/components/ui/timeline";

const PearlChain = ({ data }) => {
  const timelineData = data.stations;

  // dummy data of how to send station details

  // const timelineData = [
  //   {
  //     id: 1,
  //     name: "Zurich HB",
  //     latitude: 47.378177,
  //     longitude: 8.540192,
  //     details: () => {
  //       return <div>this is first item</div>;
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Lugano",
  //     latitude: 46.005,
  //     longitude: 8.9511,
  //     details: () => {
  //       return <div>This is second item</div>;
  //     },
  //   },
  // ];

  return <Timeline data={timelineData} />;
};

export default PearlChain;
