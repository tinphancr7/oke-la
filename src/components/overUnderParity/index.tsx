import { IMatch } from "@/interfaces";
import React, { useMemo } from "react";

type Props = {
  type: string;
  match: IMatch;
  analysis: any;
  teamId: string;
};

function OverUnderParity({ analysis, match, type, teamId }: Props) {
  const data = useMemo(() => {
    const result = [];
    for (let i = 0; i < analysis?.length; i++) {
      let item = analysis?.[i]?.split(",");

      result.push({
        league: item?.[1],
        leagueId: item?.[2],
        matchTime: item?.[3],
        home: item?.[4],
        homeTeamId: item?.[5],
        away: item?.[6],
        awayTeamId: item?.[7],
        scoreHome: Number(item?.[8]),
        scoreAway: Number(item?.[9]),
        homeHalfScore: Number(item?.[10]),
        awayHalfScore: Number(item?.[11]),
        homeRed: item?.[12],
        awayRed: item?.[13],
        homeCorner: item?.[14],
        awayCorner: item?.[15],
        initialHandicapHome: Number(item?.[16]),
        initialHandicap: Number(item?.[17]),
        initialHandicapAway: Number(item?.[18]),
        initialHome: Number(item?.[22]),
        initialDraw: Number(item?.[23]),
        initialAway: Number(item?.[24]),
        initialOver: Number(item?.[28]),
        initialTotal: Number(item?.[29]),
        initialUnder: Number(item?.[30]),
      });
    }

    let allOver = 0,
      allUnder = 0,
      allOdd = 0,
      allEven = 0;
    let homeOver = 0,
      homeUnder = 0,
      homeOdd = 0,
      homeEven = 0;
    let awayOver = 0,
      awayUnder = 0,
      awayOdd = 0,
      awayEven = 0;

    result?.forEach((item) => {
      if (item?.scoreHome + item?.scoreAway >= item?.initialTotal) {
        allOver++;
        if (item?.homeTeamId === teamId) homeOver++;
        if (item?.awayTeamId === teamId) awayOver++;
      } else {
        allUnder++;
        if (item?.homeTeamId === teamId) homeUnder++;
        if (item?.awayTeamId === teamId) awayUnder++;
      }

      if ((item?.scoreHome + item?.scoreAway) % 2 === 0) {
        allEven++;
        if (item?.homeTeamId === teamId) homeEven++;
        if (item?.awayTeamId === teamId) awayEven++;
      } else {
        allOdd++;
        if (item?.homeTeamId === teamId) homeOdd++;
        if (item?.awayTeamId === teamId) awayOdd++;
      }
    });

    return {
      allOver,
      allOverPercent: (allOver * 100) / result?.length,
      allUnder,
      allUnderPercent: (allUnder * 100) / result?.length,
      allOdd,
      allOddPercent: (allOdd * 100) / result?.length,
      allEven,
      allEvenPercent: (allEven * 100) / result?.length,
      homeOver,
      homeOverPercent:
        (homeOver * 100) /
        result?.filter((item) => item?.homeTeamId === teamId)?.length,
      homeUnder,
      homeUnderPercent:
        (homeUnder * 100) /
        result?.filter((item) => item?.homeTeamId === teamId)?.length,
      homeOdd,
      homeOddPercent:
        (homeOdd * 100) /
        result?.filter((item) => item?.homeTeamId === teamId)?.length,
      homeEven,
      homeEvenPercent:
        (homeEven * 100) /
        result?.filter((item) => item?.homeTeamId === teamId)?.length,
      awayOver,
      awayOverPercent:
        (awayOver * 100) /
        result?.filter((item) => item?.awayTeamId === teamId)?.length,
      awayUnder,
      awayUnderPercent:
        (awayUnder * 100) /
        result?.filter((item) => item?.awayTeamId === teamId)?.length,
      awayOdd,
      awayOddPercent:
        (awayOdd * 100) /
        result?.filter((item) => item?.awayTeamId === teamId)?.length,
      awayEven,
      awayEvenPercent:
        (awayEven * 100) /
        result?.filter((item) => item?.awayTeamId === teamId)?.length,
    };
  }, [analysis, teamId]);

  console.log("data", data);

  return (
    <div className="mt-4">
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
        <div className="min-w-[20%] text-center p-1">Tài</div>
        <div className="min-w-[20%] text-center p-1">Xỉu</div>
        <div className="min-w-[20%] text-center p-1">Lẻ</div>
        <div className="min-w-[20%] text-center p-1">Chẵn</div>
      </div>
      <div className={`w-full flex text-[#BBB] text-sm border-b`}>
        <div className="min-w-[20%] text-center p-1">Tổng</div>
        <div className="min-w-[20%] text-center p-1">
          {data?.allOver} ({data?.allOverPercent?.toFixed(0)}%)
        </div>
        <div className="min-w-[20%] text-center p-1">
          {data?.allUnder} ({data?.allUnderPercent?.toFixed(0)}%)
        </div>
        <div className="min-w-[20%] text-center p-1">
          {data?.allOdd} ({data?.allOddPercent?.toFixed(0)}%)
        </div>
        <div className="min-w-[20%] text-center p-1">
          {data?.allEven} ({data?.allEvenPercent?.toFixed(0)}%)
        </div>
      </div>

      <div className={`w-full flex text-sm border-b`}>
        <div className="min-w-[20%] text-center p-1 text-secondary">Chủ</div>
        <div className="min-w-[20%] text-center p-1">
          {data?.homeOver} ({data?.homeOverPercent?.toFixed(0)}%)
        </div>
        <div className="min-w-[20%] text-center p-1">
          {data?.homeUnder} ({data?.homeUnderPercent?.toFixed(0)}%)
        </div>
        <div className="min-w-[20%] text-center p-1">
          {data?.homeOdd} ({data?.homeOddPercent?.toFixed(0)}%)
        </div>
        <div className="min-w-[20%] text-center p-1">
          {data?.homeEven} ({data?.homeEvenPercent?.toFixed(0)}%)
        </div>
      </div>

      <div className={`w-full flex text-sm border-b`}>
        <div className="min-w-[20%] text-center p-1 text-[#2D87D1]">Khách</div>
        <div className="min-w-[20%] text-center p-1">
          {data?.awayOver} ({data?.awayOverPercent?.toFixed(0)}%)
        </div>
        <div className="min-w-[20%] text-center p-1">
          {data?.awayUnder} ({data?.awayUnderPercent?.toFixed(0)}%)
        </div>
        <div className="min-w-[20%] text-center p-1">
          {data?.awayOdd} ({data?.awayOddPercent?.toFixed(0)}%)
        </div>
        <div className="min-w-[20%] text-center p-1">
          {data?.awayEven} ({data?.awayEvenPercent?.toFixed(0)}%)
        </div>
      </div>
    </div>
  );
}

export default OverUnderParity;
