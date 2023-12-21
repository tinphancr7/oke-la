import { IMatch } from "@/interfaces";
import React from "react";

type Props = {
  type: string;
  match: IMatch;
  analysis: any;
  teamId: string;
};

function GoalH1AndH2({ analysis, match, teamId, type }: Props) {
  const genData = (data: string) => {
    const item = data?.split(",");

    return {
      "0": item?.[0],
      "1": item?.[1],
      "2": item?.[2],
      "3": item?.[3],
      "4+": item?.[4],
      h1: item?.[5],
      h2: item?.[6],
    };
  };

  return (
    <div className="">
      <div
        className={`${
          type === "home" ? "text-secondary" : "text-[#2D87D1] lg:text-right"
        } font-semibold`}
      >
        {type === "home" ? match?.homeName : match?.awayName}
      </div>

      <div
        className={`bg-[#F1F1F1] w-full border-t-[3px] flex mt-1 text-[#BBB] text-sm ${
          type === "home" ? "border-secondary" : "border-[#2D87D1]"
        }`}
      >
        <div className="min-w-[20%] text-center p-1"></div>
        <div className="min-w-[10%] text-center p-1">0</div>
        <div className="min-w-[10%] text-center p-1">1</div>
        <div className="min-w-[10%] text-center p-1">2</div>
        <div className="min-w-[10%] text-center p-1">3</div>
        <div className="min-w-[10%] text-center p-1">4+</div>
        <div className="min-w-[15%] text-center p-1">Hiệp 1</div>
        <div className="min-w-[15%] text-center p-1">Hiệp 2</div>
      </div>

      {analysis?.map((value: string, index: number) => (
        <div
          key={index}
          className={`bg-[#F1F1F1] w-full flex border-t text-[#BBB] text-sm`}
        >
          <div
            className={`min-w-[20%] text-center p-1 font-semibold ${
              index === 0
                ? "text-black"
                : index === 1
                ? "text-secondary"
                : "text-[#2D87D1]"
            }`}
          >
            {index === 0 ? "Tổng" : index === 1 ? "Chủ" : "Khách"}
          </div>
          <div className="min-w-[10%] text-center p-1">
            {genData(value)?.[0]}
          </div>
          <div className="min-w-[10%] text-center p-1">
            {genData(value)?.[1]}
          </div>
          <div className="min-w-[10%] text-center p-1">
            {genData(value)?.[2]}
          </div>
          <div className="min-w-[10%] text-center p-1">
            {genData(value)?.[3]}
          </div>
          <div className="min-w-[10%] text-center p-1">
            {genData(value)?.["4+"]}
          </div>
          <div className="min-w-[15%] text-center p-1">
            {genData(value)?.h1}
          </div>
          <div className="min-w-[15%] text-center p-1">
            {genData(value)?.h2}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GoalH1AndH2;
