import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const MapDetailComponent = () => (
  <div className="relative flex flex-col h-screen bg-[#F6F6F6]">
    <div className="bg-background h-28 flex items-end justify-center">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="px-4 w-full h-12 flex items-center justify-center gap-7">
          <div className="flex items-center space-x-2">
            <Checkbox id="deviation" />
            <label
              htmlFor="deviation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Deviation
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="incidents" />
            <label
              htmlFor="incidents"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Incidents
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="issues" />
            <label
              htmlFor="issues"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Issues
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="maintenance" />
            <label
              htmlFor="maintenance"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Maintenance
            </label>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
    <div className="flex-1"></div>
    <div className="h-36 bg-background w-full">
      <div className="h-20 flex items-center mx-5">
        <Button variant="ghost">
          Section ABC <ChevronUp />
        </Button>
      </div>
    </div>
  </div>
);

export default MapDetailComponent;
