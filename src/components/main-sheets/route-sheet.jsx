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
import { Search, TriangleAlert, SlidersHorizontal, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import RouteData from "@/data/routes-data.json";

const RouteSheet = ({ routesSheetOpen, setRoutesSheetOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const closeSheet = () => {
    setRoutesSheetOpen(false);
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("t");
    setSearchParams(updatedParams);
  };

  const handleRouteDetailsData = (route) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("route-details", route.id);
    setSearchParams(currentParams);
  };

  return (
    <Sheet open={routesSheetOpen} onOpenChange={closeSheet} modal={false}>
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
        <ScrollArea className="h-[calc(100dvh-270px)] md:h-[calc(100dvh-320px)] whitespace-nowrap overflow-hidden">
          <div className="px-4 space-y-3">
            {RouteData.routes.map((route, index) => (
              <React.Fragment key={route.id}>
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleRouteDetailsData(route)}
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
                    <p>{route.name}</p>
                    <div className="flex items-center gap-2">
                      {route.incidents?.length > 0 && (
                        <TriangleAlert size={18} className="text-amber-400" />
                      )}
                      {route.maintenance?.length > 0 && (
                        <Wrench size={18} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
                {index !== RouteData.routes.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default RouteSheet;
