import { IMatch } from "@/interfaces";
import React from "react";

type Props = {
  type: string;
  match: IMatch;
  analysis: any;
  teamId: string;
};

function ShootingTimeMatchRate({ analysis, match, teamId, type }: Props) {
  const genData = (data: string) => {
    const item = data?.split(",");

    return {
      "1-10": item?.[0],
      "11-20": item?.[1],
      "21-30": item?.[2],
      "31-40": item?.[3],
      "41-45": item?.[4],
      "46-50": item?.[5],
      "51-60": item?.[6],
      "61-70": item?.[7],
      "71-80": item?.[8],
      "81-90+": item?.[9],
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
        className={`bg-[#F1F1F1] w-full border-t-[3px] flex mt-1 text-[#BBB] text-xs ${
          type === "home" ? "border-secondary" : "border-[#2D87D1]"
        }`}
      >
        <div className="min-w-[10%] text-center p-1"></div>
        <div className="min-w-[9%] text-center p-1">1-10</div>
        <div className="min-w-[9%] text-center p-1">11-20</div>
        <div className="min-w-[9%] text-center p-1">21-30</div>
        <div className="min-w-[9%] text-center p-1">31-40</div>
        <div className="min-w-[9%] text-center p-1">41-45</div>
        <div className="min-w-[9%] text-center p-1">46-50</div>
        <div className="min-w-[9%] text-center p-1">51-60</div>
        <div className="min-w-[9%] text-center p-1">61-70</div>
        <div className="min-w-[9%] text-center p-1">71-80</div>
        <div className="min-w-[9%] text-center p-1">81-90+</div>
      </div>
      {analysis?.slice(0, 3)?.map((value: string, index: number) => (
        <div key={index} className="flex w-full text-xs border-b">
          <div
            className={`min-w-[10%] text-center p-1 font-semibold ${
              index === 0
                ? "text-black"
                : index === 1
                ? "text-secondary"
                : "text-[#2D87D1]"
            }`}
          >
            {index === 0 ? "Tổng" : index === 1 ? "Chủ" : "Khách"}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["1-10"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["11-20"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["21-30"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["31-40"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["41-45"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["46-50"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["51-60"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["61-70"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["71-80"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["81-90+"]}
          </div>
        </div>
      ))}

      <div className="font-semibold text-center py-2 text-sm border-b">Thời gian ghi bàn lần đầu tiên</div>

      {analysis?.slice(3, 6)?.map((value: string, index: number) => (
        <div key={index} className="flex w-full text-xs border-b">
          <div
            className={`min-w-[10%] text-center p-1 font-semibold ${
              index === 0
                ? "text-black"
                : index === 1
                ? "text-secondary"
                : "text-[#2D87D1]"
            }`}
          >
            {index === 0 ? "Tổng" : index === 1 ? "Chủ" : "Khách"}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["1-10"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["11-20"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["21-30"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["31-40"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["41-45"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["46-50"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["51-60"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["61-70"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["71-80"]}
          </div>
          <div className="min-w-[9%] text-center p-1">
            {genData(value)?.["81-90+"]}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShootingTimeMatchRate;
