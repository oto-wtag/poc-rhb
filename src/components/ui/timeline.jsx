import React from "react";

const Timeline = ({ time, station }) => {
  return (
    <div>
      <div className="flex">
        <div className="w-10">
          <span className="text-base text-foreground">{time}</span>
        </div>

        <div className="relative last:after:hidden after:absolute after:top-5 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-foreground">
          <div className="relative h-6 z-10 size-7 flex justify-center items-center">
            <div className="size-2 rounded-full bg-foreground"></div>
          </div>
        </div>

        <div className="pb-6">
          <h3 className="text-foreground">{station}</h3>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
