import React from "react";
import Timeline from "@/components/ui/timeline";

const PearlChain = ({ data }) => {
  return (
    <>
      {data.routeDetail?.map((detail, index) => (
        <Timeline key={index} time={detail.time} station={detail.station} />
      ))}
    </>
  );
};

export default PearlChain;
