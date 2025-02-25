import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Separator } from "../ui/separator";

const IncidentDetails = ({
  incidentDetailSheetOpen,
  setIncidentDetailsSheetOpen,
}) => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();

  const closeSheet = () => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("incident-details");
    setSearchParams(updatedParams);
    setIncidentDetailsSheetOpen(false);
  };

  return (
    <Sheet
      open={incidentDetailSheetOpen}
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
            <SheetTitle className="font-semibold font-semibold text-[20px] leading-[20px] tracking-[0px]">
              Incident details
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="mx-4">
          <Separator className="w-[200px]" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default IncidentDetails;
