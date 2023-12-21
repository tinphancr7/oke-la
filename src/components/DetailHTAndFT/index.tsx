import { IMatch } from "@/interfaces";
import React from "react";

type Props = {
  type: string;
  match: IMatch;
  analysis: any;
  teamId: string;
};

function DetailHTAndFT({ analysis, match, teamId, type }: Props) {
  const genData = (data: string) => {
    const item = data?.split(",");

    return {
      tt: item?.[0],
      th: item?.[1],
      tb: item?.[2],
      ht: item?.[3],
      hh: item?.[4],
      hb: item?.[5],
      bt: item?.[6],
      bh: item?.[7],
      bb: item?.[8],
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
        <div className="min-w-[19%] text-center p-1">HT</div>
        <div className="min-w-[9%] text-center p-1">T</div>
        <div className="min-w-[9%] text-center p-1">T</div>
        <div className="min-w-[9%] text-center p-1">T</div>
        <div className="min-w-[9%] text-center p-1">H</div>
        <div className="min-w-[9%] text-center p-1">H</div>
        <div className="min-w-[9%] text-center p-1">H</div>
        <div className="min-w-[9%] text-center p-1">B</div>
        <div className="min-w-[9%] text-center p-1">B</div>
        <div className="min-w-[9%] text-center p-1">B</div>
      </div>

      <div className={`bg-[#F1F1F1] w-full flex border-t text-[#BBB] text-sm`}>
        <div className="min-w-[19%] text-center p-1">HT</div>
        <div className="min-w-[9%] text-center p-1">T</div>
        <div className="min-w-[9%] text-center p-1">H</div>
        <div className="min-w-[9%] text-center p-1">B</div>
        <div className="min-w-[9%] text-center p-1">T</div>
        <div className="min-w-[9%] text-center p-1">H</div>
        <div className="min-w-[9%] text-center p-1">B</div>
        <div className="min-w-[9%] text-center p-1">T</div>
        <div className="min-w-[9%] text-center p-1">H</div>
        <div className="min-w-[9%] text-center p-1">B</div>
      </div>

      {analysis?.map((value: string, index: number) => (
        <div
          key={index}
          className={`bg-[#F1F1F1] w-full flex border-t text-[#BBB] text-sm`}
        >
          <div
            className={`min-w-[19%] text-center p-1 font-semibold ${
              index === 0
                ? "text-black"
                : index === 1
                ? "text-secondary"
                : "text-[#2D87D1]"
            }`}
          >
            {index === 0 ? "Tổng" : index === 1 ? "Chủ" : "Khách"}
          </div>
          <div className="min-w-[9%] text-center p-1">{genData(value)?.tt}</div>
          <div className="min-w-[9%] text-center p-1">{genData(value)?.th}</div>
          <div className="min-w-[9%] text-center p-1">{genData(value)?.tb}</div>
          <div className="min-w-[9%] text-center p-1">{genData(value)?.ht}</div>
          <div className="min-w-[9%] text-center p-1">{genData(value)?.hh}</div>
          <div className="min-w-[9%] text-center p-1">{genData(value)?.hb}</div>
          <div className="min-w-[9%] text-center p-1">{genData(value)?.bt}</div>
          <div className="min-w-[9%] text-center p-1">{genData(value)?.bh}</div>
          <div className="min-w-[9%] text-center p-1">{genData(value)?.bb}</div>
        </div>
      ))}
    </div>
  );
}

export default DetailHTAndFT;
