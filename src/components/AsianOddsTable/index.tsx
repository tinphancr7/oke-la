import { IMatch } from "@/interfaces";
import React, { useMemo } from "react";

const HeaderRate = ({ title }: { title: string }) => {
  return (
    <div className="bg-[#F1F1F1] w-full flex">
      <div className="w-[19%] text-xs text-[#BBB] py-1 text-center">
        {title}
      </div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">Trận</div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">Thắng</div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">Hòa</div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">Thua</div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">T%</div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
        Chi tiết
      </div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">T</div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">Tài %</div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">X</div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">Xỉu %</div>
      <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
        Chi tiết
      </div>
    </div>
  );
};

const ContentRankRate = ({ data }: any) => {
  return (
    <>
      <div className=" w-full flex">
        <div className="w-[19%] text-xs text-black py-1 text-center">Tổng</div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.countAll}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsWin}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsDraw}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsLose}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsWinRate}
        </div>
        <div className="w-[7%] text-xs py-1 text-center text-[#a95e01] cursor-pointer">
          Xem
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsOver}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsOverRate}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsUnder}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsUnderRate}
        </div>
        <div className="w-[7%] text-xs text-[#a95e01] py-1 text-center">
          Xem
        </div>
      </div>
      <div className=" w-full flex">
        <div className="w-[19%] text-xs text-[#a95e01] py-1 text-center">
          Sân nhà
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.countAtHome}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsWinAtHome}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsDrawAtHome}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsLoseAtHome}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsWinRateAtHome}
        </div>
        <div className="w-[7%] text-xs py-1 text-center text-[#a95e01] cursor-pointer">
          Xem
        </div>

        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsOverAtHome}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsOverRateAtHome}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsUnderAtHome}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsUnderRateAtHome}
        </div>
        <div className="w-[7%] text-xs text-[#a95e01]  py-1 text-center">
          Xem
        </div>
      </div>
      <div className=" w-full flex">
        <div className="w-[19%] text-xs text-[#2D87D1] py-1 text-center">
          Sân khách
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.countAtAway}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsWinAtAway}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsDrawAtAway}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsLoseAtAway}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsWinRateAtAway}
        </div>
        <div className="w-[7%] text-xs py-1 text-center text-[#a95e01] cursor-pointer">
          Xem
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsOverAtAway}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsOverRateAtAway}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsUnderAtAway}
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.oddsUnderRateAtAway}
        </div>
        <div className="w-[7%] text-xs text-[#a95e01] py-1 text-center">
          Xem
        </div>
      </div>
      <div className=" w-full flex">
        <div className="w-[19%] text-xs text-black font-bold py-1 text-center">
          6 trận gần nhất
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">6</div>
        <div className="w-[21%] text-xs text-[#BBB] py-1 text-center">
          <div className="flex gap-1">
            {data?.resultRecentSix
              ?.split("")
              ?.map((item: string) =>
                item == "l" ? (
                  <div className="w-[20px] h-[20px] bg-red-600 text-white p-0 leading-1 text-sm">
                    B
                  </div>
                ) : item == "w" ? (
                  <div className="w-[20px] h-[20px] bg-green-500 text-white p-0 leading-1 text-sm">
                    T
                  </div>
                ) : (
                  <div className="w-[20px] h-[20px] bg-primary text-white p-0 leading-1 text-sm">
                    H
                  </div>
                )
              )}
          </div>
        </div>
        <div className="w-[7%] text-xs text-[#BBB] py-1 text-center">
          {data.homeOddsWinRateAtAway}
        </div>
        <div className="w-[7%] text-xs py-1 text-center text-[#a95e01] cursor-pointer">
          Xem
        </div>
        <div className="w-[28%] text-xs text-[#BBB] py-1 text-center">
          <div className="flex gap-1">
            {data?.resultRecentSix
              ?.split("")
              ?.map((item: string) =>
                item == "l" ? (
                  <div className="w-[20px] h-[20px] bg-red-600 text-white p-0 leading-1 text-sm">
                    B
                  </div>
                ) : item == "w" ? (
                  <div className="w-[20px] h-[20px] bg-green-500 text-white p-0 leading-1 text-sm">
                    H
                  </div>
                ) : (
                  <div className="w-[20px] h-[20px] bg-primary text-white p-0 leading-1 text-sm">
                    T
                  </div>
                )
              )}
          </div>
        </div>
        <div className="w-[7%] text-xs text-[#a95e01] py-1 text-center">
          Xem
        </div>
      </div>
    </>
  );
};

type Props = {
  standing: any;
  match: IMatch;
  matchAnalysis: any;
};

function AsianOddsTable({ standing, match, matchAnalysis }: Props) {
  const dataHome = useMemo(() => {
    if (!matchAnalysis || !match) return null;
    const homeOddsArray = matchAnalysis?.homeOdds?.[0]?.[0]?.split(",");
    const homeOddsArrayHomeMatch = matchAnalysis?.homeOdds?.[1]?.[0]?.split(",");
    const homeOddsArrayAwaymatch = matchAnalysis?.homeOdds?.[2]?.[0]?.split(",");
    const recentSix = matchAnalysis?.homeOdds?.[3]?.[0]?.split(",");
    console.log(recentSix);
    return {
      countAll: homeOddsArray?.[0],
      homeOddsWin: homeOddsArray?.[1],
      homeOddsLose: homeOddsArray?.[3],
      homeOddsDraw: homeOddsArray?.[2],
      homeOddsWinRate: homeOddsArray?.[4],
      oddsOver: homeOddsArray?.[5],
      oddsUnder: homeOddsArray?.[7],
      oddsOverRate: homeOddsArray?.[6],
      oddsUnderRate: homeOddsArray?.[8],
      countAtHome: homeOddsArrayHomeMatch?.[0],
      homeOddsWinAtHome: homeOddsArrayHomeMatch?.[1],
      homeOddsLoseAtHome: homeOddsArrayHomeMatch?.[3],
      homeOddsDrawAtHome: homeOddsArrayHomeMatch?.[2],
      homeOddsWinRateAtHome: homeOddsArrayHomeMatch?.[4],
      oddsOverAtHome: homeOddsArrayHomeMatch?.[5],
      oddsUnderAtHome: homeOddsArrayHomeMatch?.[7],
      oddsOverRateAtHome: homeOddsArrayHomeMatch?.[6],
      oddsUnderRateAtHome: homeOddsArrayHomeMatch?.[8],
      countAtAway: homeOddsArrayHomeMatch?.[0],
      homeOddsWinAtAway: homeOddsArrayAwaymatch?.[1],
      homeOddsLoseAtAway: homeOddsArrayAwaymatch?.[3],
      homeOddsDrawAtAway: homeOddsArrayAwaymatch?.[2],
      homeOddsWinRateAtAway: homeOddsArrayAwaymatch?.[4],
      oddsOverAtAway: homeOddsArrayAwaymatch?.[5],
      oddsUnderAtAway: homeOddsArrayAwaymatch?.[7],
      oddsOverRateAtAway: homeOddsArrayAwaymatch?.[6],
      oddsUnderRateAtAway: homeOddsArrayAwaymatch?.[8],
      resultRecentSix: recentSix?.[1],
    };
  }, [matchAnalysis, match]);

  const dataHomeHalf = useMemo(() => {
    if (!matchAnalysis || !match) return null;
    const homeOddsArray = matchAnalysis?.homeOdds?.[0]?.[0]?.split(",");
    const homeOddsHalfArray = matchAnalysis?.homeOdds?.[4]?.[0]?.split(",");
    const homeOddsArrayHomeMatch = matchAnalysis?.homeOdds?.[5]?.[0]?.split(",");
    const homeOddsArrayAwaymatch = matchAnalysis?.homeOdds?.[6]?.[0]?.split(",");
    const recentSix = matchAnalysis?.homeOdds?.[7]?.[0]?.split(",");
    return {
      countAll: homeOddsArray?.[0],
      homeOddsWin: homeOddsHalfArray?.[1],
      homeOddsLose: homeOddsHalfArray?.[3],
      homeOddsDraw: homeOddsHalfArray?.[2],
      homeOddsWinRate: homeOddsHalfArray?.[4],
      oddsOver: homeOddsArray?.[5],
      oddsUnder: homeOddsArray?.[7],
      oddsOverRate: homeOddsArray?.[6],
      oddsUnderRate: homeOddsArray?.[8],
      countAtHome: homeOddsArrayHomeMatch?.[0],
      homeOddsWinAtHome: homeOddsArrayHomeMatch?.[1],
      homeOddsLoseAtHome: homeOddsArrayHomeMatch?.[3],
      homeOddsDrawAtHome: homeOddsArrayHomeMatch?.[2],
      homeOddsWinRateAtHome: homeOddsArrayHomeMatch?.[4],
      oddsOverAtHome: homeOddsArrayHomeMatch?.[5],
      oddsUnderAtHome: homeOddsArrayHomeMatch?.[7],
      oddsOverRateAtHome: homeOddsArrayHomeMatch?.[6],
      oddsUnderRateAtHome: homeOddsArrayHomeMatch?.[8],
      countAtAway: homeOddsArrayHomeMatch?.[0],
      homeOddsWinAtAway: homeOddsArrayAwaymatch?.[1],
      homeOddsLoseAtAway: homeOddsArrayAwaymatch?.[3],
      homeOddsDrawAtAway: homeOddsArrayAwaymatch?.[2],
      homeOddsWinRateAtAway: homeOddsArrayAwaymatch?.[4],
      oddsOverAtAway: homeOddsArrayAwaymatch?.[5],
      oddsUnderAtAway: homeOddsArrayAwaymatch?.[7],
      oddsOverRateAtAway: homeOddsArrayAwaymatch?.[6],
      oddsUnderRateAtAway: homeOddsArrayAwaymatch?.[8],
      resultRecentSix: recentSix?.[1],
    };
  }, [matchAnalysis, match]);

  const dataAwayHalf = useMemo(() => {
    if (!matchAnalysis || !match) return null;
    const homeOddsHalfArray = matchAnalysis?.awayOdds?.[4]?.[0]?.split(",");
    const homeOddsArrayHomeMatch = matchAnalysis?.awayOdds?.[5]?.[0]?.split(",");
    const homeOddsArrayAwaymatch = matchAnalysis?.awayOdds?.[6]?.[0]?.split(",");
    const recentSix = matchAnalysis?.awayOdds?.[7]?.[0]?.split(",");
    return {
      countAll: homeOddsHalfArray?.[0],
      homeOddsWin: homeOddsHalfArray?.[1],
      homeOddsLose: homeOddsHalfArray?.[3],
      homeOddsDraw: homeOddsHalfArray?.[2],
      homeOddsWinRate: homeOddsHalfArray?.[4],
      oddsOver: homeOddsHalfArray?.[5],
      oddsUnder: homeOddsHalfArray?.[7],
      oddsOverRate: homeOddsHalfArray?.[6],
      oddsUnderRate: homeOddsHalfArray?.[8],
      countAtHome: homeOddsArrayHomeMatch?.[0],
      homeOddsWinAtHome: homeOddsArrayHomeMatch?.[1],
      homeOddsLoseAtHome: homeOddsArrayHomeMatch?.[3],
      homeOddsDrawAtHome: homeOddsArrayHomeMatch?.[2],
      homeOddsWinRateAtHome: homeOddsArrayHomeMatch?.[4],
      oddsOverAtHome: homeOddsArrayHomeMatch?.[5],
      oddsUnderAtHome: homeOddsArrayHomeMatch?.[7],
      oddsOverRateAtHome: homeOddsArrayHomeMatch?.[6],
      oddsUnderRateAtHome: homeOddsArrayHomeMatch?.[8],
      countAtAway: homeOddsArrayHomeMatch?.[0],
      homeOddsWinAtAway: homeOddsArrayAwaymatch?.[1],
      homeOddsLoseAtAway: homeOddsArrayAwaymatch?.[3],
      homeOddsDrawAtAway: homeOddsArrayAwaymatch?.[2],
      homeOddsWinRateAtAway: homeOddsArrayAwaymatch?.[4],
      oddsOverAtAway: homeOddsArrayAwaymatch?.[5],
      oddsUnderAtAway: homeOddsArrayAwaymatch?.[7],
      oddsOverRateAtAway: homeOddsArrayAwaymatch?.[6],
      oddsUnderRateAtAway: homeOddsArrayAwaymatch?.[8],
      resultRecentSix: recentSix?.[1],
    };
  }, [matchAnalysis, match]);

  const dataAway = useMemo(() => {
    if (!matchAnalysis || !match) return null;
    const homeOddsArray = matchAnalysis?.awayOdds?.[0]?.[0]?.split(",");
    const homeOddsArrayHomeMatch = matchAnalysis?.awayOdds?.[1]?.[0]?.split(",");
    const homeOddsArrayAwaymatch = matchAnalysis?.awayOdds?.[2]?.[0]?.split(",");
    const recentSix = matchAnalysis?.awayOdds?.[3]?.[0]?.split(",");

    return {
      countAll: homeOddsArray?.[0],
      homeOddsWin: homeOddsArray?.[1],
      homeOddsLose: homeOddsArray?.[3],
      homeOddsDraw: homeOddsArray?.[2],
      homeOddsWinRate: homeOddsArray?.[4],
      oddsOver: homeOddsArray?.[5],
      oddsUnder: homeOddsArray?.[7],
      oddsOverRate: homeOddsArray?.[6],
      oddsUnderRate: homeOddsArray?.[8],
      countAtHome: homeOddsArrayHomeMatch?.[0],
      homeOddsWinAtHome: homeOddsArrayHomeMatch?.[1],
      homeOddsLoseAtHome: homeOddsArrayHomeMatch?.[3],
      homeOddsDrawAtHome: homeOddsArrayHomeMatch?.[2],
      homeOddsWinRateAtHome: homeOddsArrayHomeMatch?.[4],
      oddsOverAtHome: homeOddsArrayHomeMatch?.[5],
      oddsUnderAtHome: homeOddsArrayHomeMatch?.[7],
      oddsOverRateAtHome: homeOddsArrayHomeMatch?.[6],
      oddsUnderRateAtHome: homeOddsArrayHomeMatch?.[8],
      countAtAway: homeOddsArrayHomeMatch?.[0],
      homeOddsWinAtAway: homeOddsArrayAwaymatch?.[1],
      homeOddsLoseAtAway: homeOddsArrayAwaymatch?.[3],
      homeOddsDrawAtAway: homeOddsArrayAwaymatch?.[2],
      homeOddsWinRateAtAway: homeOddsArrayAwaymatch?.[4],
      oddsOverAtAway: homeOddsArrayAwaymatch?.[5],
      oddsUnderAtAway: homeOddsArrayAwaymatch?.[7],
      oddsOverRateAtAway: homeOddsArrayAwaymatch?.[6],
      oddsUnderRateAtAway: homeOddsArrayAwaymatch?.[8],
      resultRecentSix: recentSix?.[1],
    };
  }, [matchAnalysis, match]);

  if (!dataHome && !dataAway) return null;

  return (
    <div className="mt-12">
      <div className="text-[20px] font-bold mb-4 text-center">
        Thống Kê Kèo Châu Á
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-4">
        <div className="col-span-1">
          <div className="bg-secondary w-full text-sm font-semibold text-white py-1 text-center">
            {match?.homeName}
          </div>
          <HeaderRate title="FT" />
          <ContentRankRate data={dataHome} />
          <HeaderRate title="HT" />
          <ContentRankRate data={dataHomeHalf} />
        </div>

        <div className="col-span-1">
          <div className="bg-[#2D87D1] w-full text-sm font-semibold text-white py-1 text-center">
            {match?.awayName}
          </div>
          <HeaderRate title="FT" />
          <ContentRankRate data={dataAway} />
          <HeaderRate title="HT" />
          <ContentRankRate data={dataAwayHalf} />
        </div>
      </div>
    </div>
  );
}

export default AsianOddsTable;
