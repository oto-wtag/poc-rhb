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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PearlChain from "@/components/route-and-station-details/pearl-chain";
import TrainDetails from "../route-and-station-details/train-details";
import RouteData from "@/data/routes-data.json";
import { Wrench } from "lucide-react";

const RouteDetailsSheet = ({
  routeDetailsSheetOpen,
  setRouteDetailsSheetOpen,
}) => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();

  const closeSheet = () => {
    setRouteDetailsSheetOpen(false);

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("route-details");
    setSearchParams(updatedParams);
  };

  const routeDetailsId = searchParams.get("route-details");
  const data = RouteData.routes.find((route) => route.id === routeDetailsId);

  return (
    <Sheet open={routeDetailsSheetOpen} onOpenChange={closeSheet} modal={false}>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
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
            <SheetTitle>Route Details</SheetTitle>
          </div>
        </SheetHeader>
        {data && (
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
                  <p>{data?.name}</p>
                  <p className="text-sm font-light text-muted-foreground">
                    Chur to Disentis/Mustér
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {data?.incident && (
                    <TriangleAlert size={18} className="text-amber-400" />
                  )}
                  {data?.maintenance && (
                    <Wrench size={18} className="text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="flex-1" variant="secondary">
                {data.incidents.length} incidents
              </Button>
              <Button className="flex-1" variant="muted">
                {data.maintenance.length} maintenance
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
                  <span className="text-base text-primary">14:20</span>
                </div>

                <div className="relative last:after:hidden after:absolute after:top-2 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-[#A9A9A9]">
                  <div className="relative h-6 z-10 size-7 flex justify-center items-center">
                    <div className="h-3 w-3 rounded-full border border-[#A9A9A9] bg-background" />
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
                  <PearlChain data={data} />
                </TabsContent>
                <TabsContent value="details">
                  <TrainDetails trainInfo={data} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RouteDetailsSheet;
