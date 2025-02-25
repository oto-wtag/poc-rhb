import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const StationSheet = ({ stationsSheetOpen, setStationsSheetOpen }) => {
  const isMobile = useIsMobile();
  const closeSheet = () => {
    setStationsSheetOpen(false);
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
        <h1>Stations</h1>
      </SheetContent>
    </Sheet>
  );
};

export default StationSheet;
