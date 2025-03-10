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

const MaintenanceSheet = ({
  maintenanceSheetOpen,
  setMaintenanceSheetOpen,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const closeSheet = () => {
    setMaintenanceSheetOpen(false);
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("t");
    setSearchParams(updatedParams);
  };

  return (
    <Sheet open={maintenanceSheetOpen} onOpenChange={closeSheet} modal={false}>
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
          <SheetTitle>Maintenance</SheetTitle>
        </SheetHeader>
        <h1>Maintenance</h1>
      </SheetContent>
    </Sheet>
  );
};

export default MaintenanceSheet;
