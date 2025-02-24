import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TriangleAlert } from "lucide-react";
import { Wrench } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const RouteSheet = ({ routesSheetOpen, setRoutesSheetOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [routeDetailsSheetOpen, setRoutesDetailsSheetOpen] = useState(false);
  const [routeDetailsData, setRouteDetailsData] = useState({});
  const isMobile = useIsMobile();

  const closeSheet = () => {
    setRoutesSheetOpen(false);
    setSearchParams({});
  };

  const dummyData = [
    {
      id: 1,
      trainName: "AB12/123-4567",
      deviation: true,
      maintenance: false,
      incident: true,
      routeDetail: [
        { time: "15:00", station: "Station A" },
        { time: "15:20", station: "Station B" },
        { time: "15:40", station: "Reichenau-Tamins" },
      ],
    },
    {
      id: 2,
      trainName: "CD34/4567-8910",
      deviation: false,
      maintenance: true,
      incident: true,
      routeDetail: [
        { time: "16:00", station: "Station C" },
        { time: "16:20", station: "Reichenau-Tamins" },
        { time: "16:40", station: "Station D" },
        { time: "17:00", station: "Station E" },
      ],
    },
    {
      id: 3,
      trainName: "EF56/789-1234",
      deviation: true,
      maintenance: false,
      incident: true,
      routeDetail: [
        { time: "17:00", station: "Station F" },
        { time: "17:20", station: "Reichenau-Tamins" },
        { time: "17:40", station: "Station G" },
        { time: "18:00", station: "Station H" },
      ],
    },
    {
      id: 4,
      trainName: "GH78/2345-6789",
      deviation: false,
      maintenance: true,
      incident: false,
      routeDetail: [
        { time: "18:00", station: "Station I" },
        { time: "18:20", station: "Reichenau-Tamins" },
        { time: "18:40", station: "Station J" },
      ],
    },
    {
      id: 5,
      trainName: "IJ90/345-0123",
      deviation: true,
      maintenance: true,
      incident: true,
      routeDetail: [
        { time: "19:00", station: "Station K" },
        { time: "19:20", station: "Reichenau-Tamins" },
        { time: "19:40", station: "Station L" },
        { time: "20:00", station: "Station M" },
        { time: "20:20", station: "Station N" },
      ],
    },
    {
      id: 6,
      trainName: "KL12/5678-3456",
      deviation: false,
      maintenance: true,
      incident: false,
      routeDetail: [
        { time: "20:00", station: "Station O" },
        { time: "20:20", station: "Reichenau-Tamins" },
        { time: "20:40", station: "Station P" },
      ],
    },
    {
      id: 7,
      trainName: "MN34/678-9012",
      deviation: true,
      maintenance: false,
      incident: true,
      routeDetail: [
        { time: "21:00", station: "Station Q" },
        { time: "21:20", station: "Reichenau-Tamins" },
        { time: "21:40", station: "Station R" },
        { time: "22:00", station: "Station S" },
      ],
    },
    {
      id: 8,
      trainName: "OP56/7890-1234",
      deviation: false,
      maintenance: true,
      incident: false,
      routeDetail: [
        { time: "22:00", station: "Station T" },
        { time: "22:20", station: "Reichenau-Tamins" },
        { time: "22:40", station: "Station U" },
      ],
    },
    {
      id: 9,
      trainName: "QR78/8901-2345",
      deviation: true,
      maintenance: false,
      incident: true,
      routeDetail: [
        { time: "23:00", station: "Station V" },
        { time: "23:20", station: "Reichenau-Tamins" },
        { time: "23:40", station: "Station W" },
        { time: "00:00", station: "Station X" },
      ],
    },
    {
      id: 10,
      trainName: "ST90/1234-5678",
      deviation: false,
      maintenance: true,
      incident: true,
      routeDetail: [
        { time: "00:00", station: "Station Y" },
        { time: "00:20", station: "Reichenau-Tamins" },
        { time: "00:40", station: "Station Z" },
      ],
    },
    {
      id: 11,
      trainName: "STG4/1324-5988",
      deviation: false,
      maintenance: true,
      incident: true,
      routeDetail: [
        { time: "01:00", station: "Station AA" },
        { time: "01:20", station: "Reichenau-Tamins" },
        { time: "01:40", station: "Station AB" },
        { time: "02:00", station: "Station AC" },
      ],
    },
  ];

  const handleRouteDetailsData = (train) => {
    setRouteDetailsData(train);
    setRoutesDetailsSheetOpen(true);
  };

  return (
    <Sheet open={routesSheetOpen} onOpenChange={closeSheet} modal={false}>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        onInteractOutside={(event) => event.preventDefault()}
        className={cn("top-16 h-[calc(100dvh-128px)] shadow-sm")}
        overlay={false}
      >
        <SheetHeader>
          <SheetTitle>Routes</SheetTitle>
        </SheetHeader>
        <div className="flex items-center gap-4 px-4">
          <Input
            startIcon={Search}
            className="bg-muted rounded-full h-8 text-muted-foreground"
          />
          <SlidersHorizontal size={17} className="cursor-pointer" />
        </div>
        <ScrollArea className="w-full pl-4 pb-3 whitespace-nowrap gap-3 ">
          <div className="flex w-max gap-2">
            <Button variant="outline" className="rounded-full">
              Sort by deviation
            </Button>
            <Button variant="outline" className="rounded-full">
              Sort by route
            </Button>
            <Button variant="outline" className="rounded-full">
              Sort by incident
            </Button>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <ScrollArea className="h-[calc(100dvh-320px)] whitespace-nowrap overflow-hidden">
          <div className="px-4 space-y-3">
            {dummyData.map((train, index) => (
              <React.Fragment key={train.id}>
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleRouteDetailsData(train)}
                >
                  <div className="border rounded-md p-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6364 2C7.31818 2 3 2.52632 3 6.21053V16.2105C3 18.2421 4.69489 19.8947 6.77841 19.8947L5.15909 21.4737V22H7.56648L9.72557 19.8947H13.7955L15.9545 22H18.1136V21.4737L16.4943 19.8947C18.5778 19.8947 20.2727 18.2421 20.2727 16.2105V6.21053C20.2727 2.52632 16.408 2 11.6364 2ZM6.77841 17.7895C5.88239 17.7895 5.15909 17.0842 5.15909 16.2105C5.15909 15.3368 5.88239 14.6316 6.77841 14.6316C7.67443 14.6316 8.39773 15.3368 8.39773 16.2105C8.39773 17.0842 7.67443 17.7895 6.77841 17.7895ZM10.5568 10.4211H5.15909V6.21053H10.5568V10.4211ZM12.7159 10.4211V6.21053H18.1136V10.4211H12.7159ZM16.4943 17.7895C15.5983 17.7895 14.875 17.0842 14.875 16.2105C14.875 15.3368 15.5983 14.6316 16.4943 14.6316C17.3903 14.6316 18.1136 15.3368 18.1136 16.2105C18.1136 17.0842 17.3903 17.7895 16.4943 17.7895Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <p>{train.trainName}</p>
                    <div className="flex items-center gap-2">
                      {train.incident && (
                        <TriangleAlert size={18} className="text-amber-400" />
                      )}
                      {train.maintenance && (
                        <Wrench size={18} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
                {index !== dummyData.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
        <RouteDetails
          routeDetailsSheetOpen={routeDetailsSheetOpen}
          setRoutesDetailsSheetOpen={setRoutesDetailsSheetOpen}
          data={routeDetailsData}
        />
      </SheetContent>
    </Sheet>
  );
};

export default RouteSheet;

const RouteDetails = ({
  routeDetailsSheetOpen,
  setRoutesDetailsSheetOpen,
  data,
}) => {
  const isMobile = useIsMobile();
  const closeSheet = () => {
    setRoutesDetailsSheetOpen(false);
  };

  return (
    <Sheet open={routeDetailsSheetOpen} onOpenChange={closeSheet} modal={false}>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        onInteractOutside={(event) => event.preventDefault()}
        className={cn("top-16 h-[calc(100dvh-128px)] shadow-sm")}
        overlay={false}
      >
        <SheetHeader>
          <div className="flex items-center gap-2">
            <ChevronLeft className="cursor-pointer" onClick={closeSheet} />
            <SheetTitle>Route Details</SheetTitle>
          </div>
        </SheetHeader>
        <div className="px-4 space-y-4">
          <Separator />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="border rounded-md p-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6364 2C7.31818 2 3 2.52632 3 6.21053V16.2105C3 18.2421 4.69489 19.8947 6.77841 19.8947L5.15909 21.4737V22H7.56648L9.72557 19.8947H13.7955L15.9545 22H18.1136V21.4737L16.4943 19.8947C18.5778 19.8947 20.2727 18.2421 20.2727 16.2105V6.21053C20.2727 2.52632 16.408 2 11.6364 2ZM6.77841 17.7895C5.88239 17.7895 5.15909 17.0842 5.15909 16.2105C5.15909 15.3368 5.88239 14.6316 6.77841 14.6316C7.67443 14.6316 8.39773 15.3368 8.39773 16.2105C8.39773 17.0842 7.67443 17.7895 6.77841 17.7895ZM10.5568 10.4211H5.15909V6.21053H10.5568V10.4211ZM12.7159 10.4211V6.21053H18.1136V10.4211H12.7159ZM16.4943 17.7895C15.5983 17.7895 14.875 17.0842 14.875 16.2105C14.875 15.3368 15.5983 14.6316 16.4943 14.6316C17.3903 14.6316 18.1136 15.3368 18.1136 16.2105C18.1136 17.0842 17.3903 17.7895 16.4943 17.7895Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between flex-1">
              <div>
                <p>{data.trainName}</p>
                <p className="text-sm font-light text-muted-foreground">
                  Chur to Disentis/Mustér
                </p>
              </div>

              <div className="flex items-center gap-2">
                {data.incident && (
                  <TriangleAlert size={18} className="text-amber-400" />
                )}
                {data.maintenance && (
                  <Wrench size={18} className="text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="flex-1" variant="secondary">
              2 incidents
            </Button>
            <Button className="flex-1" variant="muted">
              1 maintenance
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.5">
                <path
                  d="M4.42116 3.7108C4.42116 3.52234 4.34629 3.3416 4.21303 3.20834C4.07978 3.07508 3.89904 3.00022 3.71058 3.00022C3.52212 3.00022 3.34138 3.07508 3.20812 3.20834C3.07486 3.3416 3 3.52234 3 3.7108V19.3435C3 19.532 3.07486 19.7127 3.20812 19.846C3.34138 19.9793 3.52212 20.0541 3.71058 20.0541C3.89904 20.0541 4.07978 19.9793 4.21303 19.846C4.34629 19.7127 4.42116 19.532 4.42116 19.3435V3.7108ZM10.3332 3.29392C9.23131 2.53882 7.7372 3.32614 7.7372 4.66013V18.3933C7.7372 19.732 9.24268 20.5193 10.3427 19.7547L20.2889 12.8365C20.5092 12.6833 20.689 12.4788 20.8128 12.2407C20.9367 12.0027 21.0009 11.7381 21 11.4697C20.9991 11.2014 20.933 10.9372 20.8075 10.7C20.682 10.4628 20.5007 10.2596 20.2794 10.1079L10.3332 3.29392Z"
                  fill="black"
                />
              </g>
            </svg>
            <p>Next Station</p>
          </div>
          <div className="">
            <div className="flex">
              <div className="w-10">
                <span className="text-base text-primary">15:20</span>
              </div>

              <div className="relative last:after:hidden after:absolute after:top-5 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-primary">
                <div className="relative h-6 z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="pb-2">
                <h3 className="text-primary">Reichenau-Tamins</h3>
              </div>
            </div>

            <Tabs defaultValue="pearl-chain" className="">
              <TabsList className="flex">
                <TabsTrigger value="pearl-chain">Pearl Chain</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="pearl-chain">
                {data.routeDetail?.map((detail, index) => (
                  <PearlChain
                    key={index}
                    time={detail.time}
                    station={detail.station}
                  />
                ))}
              </TabsContent>
              <TabsContent value="details"></TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const PearlChain = ({ time, station }) => {
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
