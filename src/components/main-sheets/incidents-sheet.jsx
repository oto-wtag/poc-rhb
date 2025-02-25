import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import MergeIcon from "@/assets/icons/mage-filter-icon.svg";
import IncidentIcon from "@/assets/icons/incident-details-icon.svg";
import { Separator } from "@/components/ui/separator";
import { INCIDENTS } from "@/data/incident-data.json";
import { ScrollArea } from "../ui/scroll-area";

const IncidentsSheet = ({ incidentsSheetOpen, setIncidentsSheetOpen }) => {
  const isMobile = useIsMobile();
  const [incidents] = useState([...INCIDENTS]);
  const [searchParams, setSearchParams] = useSearchParams();
  const closeSheet = () => {
    setIncidentsSheetOpen(false);
    setSearchParams({});
  };

  const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <Sheet open={incidentsSheetOpen} onOpenChange={closeSheet} modal={false}>
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
          <SheetTitle className="font-semibold font-semibold text-[20px] leading-[20px] tracking-[0px]">
            Incidents
          </SheetTitle>
        </SheetHeader>

        <div className="mt-3 flex justify-between items-center px-4 gap-[20px]">
          <span className="w-[305px] ">
            <Input
              startIcon={Search}
              className="bg-muted rounded-full h-8 text-muted-foreground"
            />
          </span>
          <span className="w-[20px] h-[20px] cursor-pointer">
            <img className="w-full h-full" src={MergeIcon} alt="filter" />
          </span>
        </div>

        <div className="mt-4 px-[20px] ">
          <ScrollArea className="w-full h-[calc(100dvh-100px)]  overflow-hidden">
            {incidents?.map((incident, index) => (
              <>
                <div className="my-[10px] flex justify-start items-start gap-[10px]">
                  <div className="w-[26px] h-[26px] rounded-[8px]">
                    <img
                      className="w-full h-full rounded-[8px]"
                      src={IncidentIcon}
                      alt="Incident"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-[15px] leading-[22.5px] tracking-[0px] cursor-pointer">
                      {incident.title}
                    </h2>
                    <p className="mt-[8px] font-normal text-[13px] leading-[19.5px] tracking-[0px]">
                      <span className="text-wrap">{incident.subtitle}</span>
                    </p>
                    <div className="mt-[8px] font-semibold text-[13px] leading-[19.5px] tracking-[0px]">
                      Today <span> {incident.time.from}</span> :{" "}
                      <span> {incident.time.to} </span>
                      <span>({getFormattedDate()})</span>
                    </div>
                  </div>
                </div>
                {index !== incidents.length - 1 && <Separator />}
              </>
            ))}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default IncidentsSheet;
