import React from "react";
import TrainEngine from "@/assets/icons/train-engine.svg";
import DisabledIcon from "@/assets/icons/wheel-chair.svg";
import DiningIcon from "@/assets/icons/canteen.svg";
import { ScrollArea } from "../ui/scroll-area";
import IssueIcon from "@/assets/icons/issue-icon.svg";
import Crew1 from "@/assets/images/crew-1.png";
import Crew2 from "@/assets/images/crew-2.png";
import Crew3 from "@/assets/images/crew-3.png";

const TrainDetails = ({ trainInfo }) => {
  const imageArray = [Crew1, Crew2, Crew3];
  return (
    <ScrollArea className="h-[calc(100dvh-420px)] sm:h-[calc(100dvh-460px)] whitespace-nowrap ">
      <div className="my-3 flex gap-[2px]">
        <div className="w-[50px] h-[50px]">
          <img className="w-full h-full" src={TrainEngine} alt="engine" />
        </div>
        {trainInfo?.bogie?.map((bogieDetails, index) => (
          <div key={index}>
            <div className="w-[50px] h-[50px] rounded-[5px] border-[1.5px] relative">
              <span className="absolute font-semibold text-[15px] leading-[22.5px] tracking-[0%] top-0 right-2">
                {bogieDetails.type}
              </span>
            </div>

            <div className="flex justify-center items-center mt-1 gap-[7px]">
              {bogieDetails.disabledAccessible && (
                <span className="w-[14px] h-[16px]">
                  <img className="w-full h-full" src={DisabledIcon} />
                </span>
              )}
              {bogieDetails.canteen && (
                <span className="w-[16px] h-[16px]">
                  <img className="w-full h-full" src={DiningIcon} />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {trainInfo?.issues?.length > 0 && (
        <div className="my-3">
          <h3 className="font-semibold text-[15px] leading-[22.5px] tracking-[0%]">
            Issues ({trainInfo.issues.length})
          </h3>
          <div>
            {trainInfo.issues.map((issue, index) => (
              <div key={index} className="flex gap-[10px] my-1 items-center">
                <span className="w-[16px] h-[16px]">
                  <img className="w-full h-full" src={IssueIcon} alt="Issue" />
                </span>
                <span className="font-normal text-[15px] leading-[22.5px] tracking-[0%]">
                  {issue.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="my-3">
        <h3 className="font-semibold text-[15px] leading-[22.5px] tracking-[0%]">
          Crew ({trainInfo?.crew?.length})
        </h3>

        <div>
          {trainInfo?.crew?.map((crewMember, index) => (
            <div className="flex justify-start items-center gap-2 my-2">
              <div className="w-[40px] h-[40px] rounded-lg">
                <img
                  className="w-full h-full rounded-lg"
                  src={index <= 2 ? imageArray[index] : imageArray[0]}
                  alt="Crew"
                />
              </div>
              <div>
                <h4 className="font-semibold text-[15px] leading-[22.5px] tracking-[0]">
                  {crewMember.name}
                </h4>
                <p className="font-normal text-[13px] leading-[19.5px] tracking-[0]">
                  {crewMember.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default TrainDetails;
