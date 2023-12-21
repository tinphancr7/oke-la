import { IMatch } from "@/interfaces";
import moment from "moment";
import React, { useMemo } from "react";

type Props = {
  type: string;
  match: IMatch;
  analysis: any;
  teamId: string;
};

function FiveNextMatch({ analysis, match, teamId, type }: Props) {
  const data = useMemo(() => {
    const result = [];
    for (let i = 0; i < analysis?.length; i++) {
      let item = analysis?.[i]?.split(",");
      result.push({
        matchId: item?.[0],
        league: item?.[1],
        leagueId: item?.[2],
        matchTime: item?.[3],
        home: item?.[4],
        homeTeamId: item?.[5],
        away: item?.[6],
        awayTeamId: item?.[7],
        day: item?.[8],
      });
    }

    return result?.slice(0, 3);
  }, [analysis]);

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
        <div className="min-w-[15%] text-center p-1">Giải đấu</div>
        <div className="min-w-[20%] text-center p-1">Ngày</div>
        <div className="min-w-[15%] text-center p-1">Kiểu</div>
        <div className="min-w-[30%] text-center p-1">VS</div>
        <div className="min-w-[20%] text-center p-1">Thời gian</div>
      </div>

      {data?.map((item) => (
        <div key={item?.matchId} className={`w-full flex text-sm border-b`}>
          <div className="min-w-[15%] text-center p-1">{item?.league}</div>
          <div className="min-w-[20%] text-center p-1">
            {moment(item?.matchTime * 1000).format("DD/MM/YYYY")}
          </div>
          <div className="min-w-[15%] text-center p-1">
            {item?.homeTeamId === teamId ? "Chủ" : "Khách"}
          </div>
          <div className="min-w-[30%] text-center p-1">
            {item?.homeTeamId === teamId ? item?.away : item?.home}
          </div>
          <div className="min-w-[20%] text-center p-1">{item?.day} ngày</div>
        </div>
      ))}
    </div>
  );
}

export default FiveNextMatch;
