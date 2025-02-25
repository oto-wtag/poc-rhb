import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import StationData from "@/data/stations-data.json";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, TriangleAlert, Wrench } from "lucide-react";

const StationSheet = ({ stationsSheetOpen, setStationsSheetOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const closeSheet = () => {
    setStationsSheetOpen(false);
    setSearchParams({});
  };

  useEffect(() => {
    //make api calls only when the sheet is open
    // if (stationsSheetOpen) {
    //   console.log(StationData.stations);
    // }
  }, [stationsSheetOpen]);

  const handleStationClick = (stationName) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("station", stationName.toLowerCase());
    setSearchParams(currentParams);
  };

  return (
    <Sheet open={stationsSheetOpen} onOpenChange={closeSheet} modal={false}>
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
          <SheetTitle>Station</SheetTitle>
        </SheetHeader>
        <div className="px-4 h-10 flex items-center">
          <Input
            startIcon={Search}
            className="bg-muted rounded-full h-8 text-muted-foreground"
          />
        </div>
        <ScrollArea className="h-[calc(100dvh-258px)] px-2 mb-2">
          <div className="space-y-1">
            {StationData.stations.map((stations, index) => (
              <React.Fragment key={index}>
                <div
                  className="flex items-center justify-between hover:bg-accent p-2 rounded-md tarnsition-all cursor-pointer"
                  onClick={() => handleStationClick(stations.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className="border rounded-md p-2">
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
                    <h6 className="font-semibold">{stations.name}</h6>
                  </div>
                  <div className="flex items-center gap-2">
                    {stations.incidents?.length > 0 && (
                      <TriangleAlert size={18} className="text-amber-400" />
                    )}
                    {stations.maintenance?.length > 0 && (
                      <Wrench size={18} className="text-muted-foreground" />
                    )}
                  </div>
                </div>

                {index !== StationData.stations.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default StationSheet;
