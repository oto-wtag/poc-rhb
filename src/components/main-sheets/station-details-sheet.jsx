import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import StationData from "@/data/stations-data.json";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "../ui/scroll-area";

const StationDetailsSheet = ({
  stationDetailsSheetOpen,
  setStationDetailsSheetOpen,
}) => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const stationDetails = searchParams.get("station");

  const closeSheet = () => {
    setStationDetailsSheetOpen(false);

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("station");
    setSearchParams(updatedParams);
  };

  const data = StationData.stations.find(
    (station) => station.name.toLowerCase() === stationDetails
  );

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleTimeString([], options);
  };

  return (
    <Sheet
      open={stationDetailsSheetOpen}
      onOpenChange={closeSheet}
      modal={false}
    >
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        onInteractOutside={(event) => event.preventDefault()}
        className={cn(
          isMobile
            ? "bottom-16 h-[calc(100dvh-80px)] mx-2 rounded-t-xl"
            : "top-16 h-[calc(100dvh-128px)] shadow-sm"
        )}
        overlay={false}
      >
        <SheetHeader>
          <div className="flex items-center gap-2">
            <ChevronLeft className="cursor-pointer" onClick={closeSheet} />
            <SheetTitle>Station Details</SheetTitle>
          </div>
        </SheetHeader>
        {data && (
          <div className="px-4 space-y-6 h-full">
            <div className="flex gap-3">
              <div className="border rounded-md p-2 flex-grow-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5925 2.0932C11.7196 2.03186 11.8589 2 12 2C12.1412 2 12.2805 2.03186 12.4075 2.0932L21.4703 6.46832C21.6847 6.5734 21.851 6.75635 21.9351 6.97982C22.0193 7.20329 22.015 7.45045 21.9231 7.67086C21.8312 7.89128 21.6587 8.06833 21.4408 8.16589C21.2228 8.26345 20.9759 8.27418 20.7503 8.19587V20.1249H21.0628C21.3114 20.1249 21.5499 20.2237 21.7257 20.3995C21.9015 20.5754 22.0003 20.8138 22.0003 21.0625C22.0003 21.3111 21.9015 21.5496 21.7257 21.7254C21.5499 21.9012 21.3114 22 21.0628 22H2.93728C2.68863 22 2.45017 21.9012 2.27435 21.7254C2.09853 21.5496 1.99976 21.3111 1.99976 21.0625C1.99976 20.8138 2.09853 20.5754 2.27435 20.3995C2.45017 20.2237 2.68863 20.1249 2.93728 20.1249H3.24979V8.19587C3.02421 8.27418 2.77724 8.26345 2.55929 8.16589C2.34134 8.06833 2.16883 7.89128 2.07697 7.67086C1.9851 7.45045 1.98081 7.20329 2.06495 6.97982C2.1491 6.75635 2.31534 6.5734 2.52977 6.46832L11.5925 2.0932ZM13.2501 6.99958C13.2501 7.33111 13.1184 7.64907 12.8839 7.88349C12.6495 8.11792 12.3316 8.24962 12 8.24962C11.6685 8.24962 11.3506 8.11792 11.1161 7.88349C10.8817 7.64907 10.75 7.33111 10.75 6.99958C10.75 6.66805 10.8817 6.3501 11.1161 6.11568C11.3506 5.88125 11.6685 5.74955 12 5.74955C12.3316 5.74955 12.6495 5.88125 12.8839 6.11568C13.1184 6.3501 13.2501 6.66805 13.2501 6.99958ZM8.87495 11.6872C8.87495 11.4386 8.77617 11.2001 8.60035 11.0243C8.42453 10.8485 8.18607 10.7497 7.93742 10.7497C7.68877 10.7497 7.45031 10.8485 7.27449 11.0243C7.09867 11.2001 6.99989 11.4386 6.99989 11.6872V18.5624C6.99989 18.8111 7.09867 19.0495 7.27449 19.2253C7.45031 19.4012 7.68877 19.4999 7.93742 19.4999C8.18607 19.4999 8.42453 19.4012 8.60035 19.2253C8.77617 19.0495 8.87495 18.8111 8.87495 18.5624V11.6872ZM12.9376 11.6872C12.9376 11.4386 12.8388 11.2001 12.663 11.0243C12.4871 10.8485 12.2487 10.7497 12 10.7497C11.7514 10.7497 11.5129 10.8485 11.3371 11.0243C11.1613 11.2001 11.0625 11.4386 11.0625 11.6872V18.5624C11.0625 18.8111 11.1613 19.0495 11.3371 19.2253C11.5129 19.4012 11.7514 19.4999 12 19.4999C12.2487 19.4999 12.4871 19.4012 12.663 19.2253C12.8388 19.0495 12.9376 18.8111 12.9376 18.5624V11.6872ZM17.0002 11.6872C17.0002 11.4386 16.9014 11.2001 16.7256 11.0243C16.5498 10.8485 16.3113 10.7497 16.0626 10.7497C15.814 10.7497 15.5755 10.8485 15.3997 11.0243C15.2239 11.2001 15.1251 11.4386 15.1251 11.6872V18.5624C15.1251 18.8111 15.2239 19.0495 15.3997 19.2253C15.5755 19.4012 15.814 19.4999 16.0626 19.4999C16.3113 19.4999 16.5498 19.4012 16.7256 19.2253C16.9014 19.0495 17.0002 18.8111 17.0002 18.5624V11.6872Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div>
                <h5 className="font-semibold">{data.name}</h5>
                <p className="text-sm text-muted-foreground">
                  {data.name} station, Switzerland
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" variant="secondary">
                2 Incidents
              </Button>
              <Button className="flex-1" variant="muted">
                2 Incidents
              </Button>
              <Button size="icon" variant="muted">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.618 7.46232L6.403 2.08532C6.28208 2.03189 6.15177 2.00296 6.0196 2.00022C5.88743 1.99747 5.75603 2.02096 5.633 2.06932C5.51006 2.1179 5.39798 2.19037 5.30323 2.28255C5.20848 2.37472 5.13295 2.48477 5.081 2.60632L2.081 9.60632C1.97653 9.85005 1.97315 10.1253 2.07161 10.3715C2.17006 10.6178 2.36228 10.8148 2.606 10.9193L9.563 13.9003L8.323 17.0003H4V14.0003H2V22.0003H4V19.0003H8.323C9.146 19.0003 9.875 18.5063 10.179 17.7423L11.401 14.6883L14.82 16.1533C15.0626 16.2576 15.3367 16.2616 15.5823 16.1646C15.8279 16.0675 16.0252 15.8773 16.131 15.6353L19.131 8.77832C19.2371 8.53574 19.2427 8.26096 19.1466 8.01426C19.0504 7.76755 18.8603 7.56906 18.618 7.46232ZM19.93 16.3723L18.072 15.6303L20.07 10.6303L21.928 11.3713L19.93 16.3723Z"
                    fill="black"
                  />
                </svg>
              </Button>
            </div>
            <div className="flex gap-3 items-center">
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
              <p>Next arrival</p>
            </div>
            <ScrollArea className="h-[calc(100dvh-450px)]">
              <div className="space-y-3">
                {data.next_arrivals && data.next_arrivals.length > 0 ? (
                  data.next_arrivals.map((nextArrival, index) => (
                    <React.Fragment key={index}>
                      <div key={index} className="flex gap-2 items-stretch">
                        <div className="">
                          <p>{formatTime(nextArrival.arrival_time)}</p>
                        </div>

                        <div className="flex justify-between w-full">
                          <div className="flex gap-2">
                            <div className="p-1">
                              <svg
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                              >
                                <path
                                  d="M6.04545 0C3.02273 0 0 0.368421 0 2.94737V9.94737C0 11.3695 1.18642 12.5263 2.64489 12.5263L1.51136 13.6316V14H3.19653L4.7079 12.5263H7.55682L9.06818 14H10.5795V13.6316L9.44602 12.5263C10.9045 12.5263 12.0909 11.3695 12.0909 9.94737V2.94737C12.0909 0.368421 9.38557 0 6.04545 0ZM2.64489 11.0526C2.01767 11.0526 1.51136 10.5589 1.51136 9.94737C1.51136 9.33579 2.01767 8.8421 2.64489 8.8421C3.2721 8.8421 3.77841 9.33579 3.77841 9.94737C3.77841 10.5589 3.2721 11.0526 2.64489 11.0526ZM5.28977 5.89474H1.51136V2.94737H5.28977V5.89474ZM6.80114 5.89474V2.94737H10.5795V5.89474H6.80114ZM9.44602 11.0526C8.81881 11.0526 8.3125 10.5589 8.3125 9.94737C8.3125 9.33579 8.81881 8.8421 9.44602 8.8421C10.0732 8.8421 10.5795 9.33579 10.5795 9.94737C10.5795 10.5589 10.0732 11.0526 9.44602 11.0526Z"
                                  fill="black"
                                />
                              </svg>
                            </div>
                            <div className="">
                              <h6 className="font-semibold">
                                {nextArrival.train_number}
                              </h6>
                              <p className="text-xs text-muted-foreground">
                                {formatTime(nextArrival.departure_time)}
                                {" - "}
                                {nextArrival.departed_from}
                              </p>
                            </div>
                          </div>
                          <div>
                            {nextArrival.delay < 0 ? (
                              <Badge variant="destructive">
                                {nextArrival.delay}
                              </Badge>
                            ) : nextArrival.delay >= 0 &&
                              nextArrival.delay < 3 ? (
                              <Badge variant="success">
                                {nextArrival.delay}
                              </Badge>
                            ) : (
                              <Badge variant="chill">{nextArrival.delay}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      {index !== data.next_arrivals.length - 1 && <Separator />}
                    </React.Fragment>
                  ))
                ) : (
                  <p>No next arrivals</p>
                )}
              </div>
            </ScrollArea>
            <Button variant="outline" className={cn("w-full")}>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1001 2.33122C1.1001 1.71834 1.6464 1.24966 2.25215 1.34285L19.0522 3.92747C19.54 4.00252 19.9001 4.42226 19.9001 4.91584V15.8175C19.9001 16.3254 19.5193 16.7527 19.0147 16.8109L2.21472 18.7494C1.62096 18.8179 1.1001 18.3537 1.1001 17.756V2.33122Z"
                  stroke="black"
                  strokeWidth="2"
                />
                <path
                  d="M7.1001 12L7.1001 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7.1001 3L7.1001 6"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p>Passenger Monitor</p>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default StationDetailsSheet;
