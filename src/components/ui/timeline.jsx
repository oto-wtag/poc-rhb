import React from "react";

const Timeline = ({ data }) => {
  return (
    <>
      {data.map((station, index) => (
        <div key={index}>
          <div className="flex">
            <div className="w-10">
              <span className="text-base text-foreground">{station.time}</span>
            </div>

            <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-[#A9A9A9]">
              <div className="relative h-6 z-10 size-7 flex justify-center items-center">
                <div className="h-3 w-3 rounded-full border border-[#A9A9A9] bg-background" />
              </div>
            </div>

            <div className="pb-6">
              <h3 className="text-foreground">
                {station.name}
                {station.details && station.details()}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Timeline;
