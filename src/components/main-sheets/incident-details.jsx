import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Separator } from "../ui/separator";
import { INCIDENTS } from "@/data/incident-data.json";
import IncidentDetailIcon from "@/assets/icons/incident-details-icon.svg";

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

  const incidentDetailsId = searchParams.get("incident-details");
  const data = [...INCIDENTS]?.find((route) => route?.id === incidentDetailsId);

  const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
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
            <SheetTitle className="font-semibold text-[20px] leading-[20px] tracking-[0px]">
              Incident details
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="mx-4">
          <Separator className="w-[200px]" />
          <div className="my-4">
            <div className=" w-[40px] h-[40px] rounded-lg">
              <img
                className="w-full h-full rounded-lg"
                src={IncidentDetailIcon}
                alt="Incident"
              />
            </div>
            <h2 className="my-4 font-bold text-[20px] leading-[30px] tracking-[0px]">
              {data?.title}
            </h2>

            <div>
              <p className="font-medium text-[12px] leading-[18px] tracking-[0px] text-gray-600">
                Duration:
              </p>
              <p className="mt-2 font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#EB0A23]">
                Today <span> {data?.time.from} </span> -
                <span>{data?.time.to} </span> ({getFormattedDate()})
              </p>
              <p className="mt-4 font-medium text-[14px] leading-[21px] tracking-[0px]">
                {data?.description}
              </p>
              <p className="mt-4 font-inter font-normal text-[12px] leading-[18px] tracking-[0px] text-zinc-500">
                {data?.note}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default IncidentDetails;
