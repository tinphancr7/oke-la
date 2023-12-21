import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import rankApi from "@/apis/rank.api";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { getRankByLeague } from "@/apis/league";

interface IRank {
  rank: number;
  team_name: string;
  goals_diff: number;
  points: number;
  logo: string;
  goals_against: number;
  goals_for: number;
  forme: string;
  all: {
    draw: number;
    goals_against: number;
    goals_for: number;
    lose: number;
    matchs_played: number;
    win: number;
  };
  away: {
    draw: number;
    goals_against: number;
    goals_for: number;
    lose: number;
    matchs_played: number;
    win: number;
  };
  home: {
    draw: number;
    goals_against: number;
    goals_for: number;
    lose: number;
    matchs_played: number;
    win: number;
  };
}

const TableRankCup = ({
  league,
  ranks,
  status,
}: {
  league: string;
  ranks: IRank[];
  status?: string;
}) => {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-2 font-semibold text-md">{league}</div>
      <div>
        <div className="bg-secondary rounded-t-lg p-4 ">
          <div className="flex items-center w-full  text-xs lg:text-sm font-normal text-white">
            <div className="w-[10%] flex items-center  ">#</div>
            <div className="w-[30%] lg:w-[20%] flex items-center ">
              Câu lạc bộ
            </div>
            <div className="w-[30%] lg:w-[30%] flex items-center gap-2 lg:gap-10">
              <span>P</span>
              <span>W</span>
              <span>D</span>
              <span>L</span>
            </div>
            <div className="w-[20%] lg:w-[10%] flex items-center ">
              Bàn thắng
            </div>
            <div className="w-[20%] hidden lg:flex items-center justify-center  ">
              <span className="inline-block border-b-2 border-white pb-1 relative">
                Phong độ gần nhất
                <span className="absolute -left-2 top-[15px]">
                  <MdOutlineKeyboardArrowLeft size={20} />
                </span>
              </span>
            </div>
            <div className="w-[10%] flex items-center justify-end">PTS</div>
          </div>
        </div>

        {ranks?.map((item: IRank, index: number) => {
          return (
            <div key={index} className={twMerge(`bg-white`)}>
              <div key={index} className=" p-4 border-b">
                <div className="flex items-center w-full  text-xs font-normal text-white">
                  <div className="w-[10%] flex items-center ">
                    <span className="w-4 h-4 text-xs lg:w-6 lg:h-6 bg-primary text-white flex items-center justify-center rounded-full">
                      {item?.rank}
                    </span>
                  </div>
                  <div className="w-[30%] lg:w-[20%] flex items-center gap-2">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 relative flex-shrink-0">
                      <Image
                        src={item?.logo}
                        fill
                        className="w-full h-full object-fill"
                        alt=""
                      />
                    </div>
                    <span className="text-xs font-normal text-black11">
                      {item?.team_name}
                    </span>
                  </div>
                  <div className=" w-[30%] flex items-center gap-1 lg:gap-10 text-black11 text-xs">
                    <span>
                      {status === "all"
                        ? item?.all?.matchs_played || 0
                        : status === "home"
                        ? item?.home?.matchs_played || 0
                        : item?.away?.matchs_played || 0}
                    </span>
                    <span>
                      {status === "all"
                        ? item?.all?.win || 0
                        : status === "home"
                        ? item?.home?.win || 0
                        : item?.away?.win || 0}
                    </span>
                    <span>
                      {status === "all"
                        ? item?.all?.draw || 0
                        : status === "home"
                        ? item?.home?.draw || 0
                        : item?.away?.draw || 0}
                    </span>
                    <span>
                      {status === "all"
                        ? item?.all?.lose || 0
                        : status === "home"
                        ? item?.home?.lose || 0
                        : item?.away?.lose || 0}
                    </span>
                  </div>
                  <div className="w-[20%] lg:w-[10%] flex items-center justify-center  text-black11 text-xs gap-1">
                    <span>
                      {status === "all"
                        ? item?.all?.goals_for || 0
                        : status === "home"
                        ? item?.home?.goals_for || 0
                        : item?.away?.goals_for || 0}
                    </span>{" "}
                    :
                    <span>
                      {status === "all"
                        ? item?.all?.goals_against || 0
                        : status === "home"
                        ? item?.home?.goals_against || 0
                        : item?.away?.goals_against || 0}
                    </span>
                  </div>
                  <div className="w-[20%] hidden lg:flex items-center justify-center gap-2">
                    {item?.forme?.split("").map((it: any, index: number) => (
                      <span
                        key={index}
                        className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${
                          it.toLowerCase() === "w" && "bg-green02"
                        } ${it.toLowerCase() === "l" && "bg-red-500"} ${
                          it.toLowerCase() === "d" && "bg-[#9DA5AC]"
                        } `}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                  <div className="w-[10%] flex items-center justify-end text-black11 text-xs">
                    {status === "all"
                      ? item?.points || 0
                      : status === "home"
                      ? item?.home?.win || 0 * 3 + item?.home?.draw || 0
                      : item?.away?.win || 0 * 3 + item?.away?.draw || 0}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TableTranscript = ({
  className,
  status,
  rankId,
}: {
  className?: string;
  status?: string;
  rankId?: string;
}) => {
  const [rankData, setRankData] = useState([]);
  const [isLeagueCup, setIsLeagueCup] = useState(false);
  const [rankCup, setRankCup] = useState([]);

  const getStandingByLeague = async (rankId: string) => {
    try {
      const result = await getRankByLeague("1639");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStandingByLeague(rankId as string);
  }, [rankId]);

  const getRanksData = async (rankId: string) => {
    try {
      const res = await getRankByLeague(rankId || "1639");

      const ranks = res.data.result[rankId || "4335"] || [];
      // check league cup
      if (ranks?.[0]?.group?.includes("Group")) {
        const rankCupData: any = [];
        const groups = new Set(
          ranks
            ?.sort((a: any, b: any) => a?.group_id - b?.group_id)
            ?.map((item: any) => item?.group)
        );

        groups?.forEach((item) => {
          rankCupData.push({
            league: item,
            ranks: ranks?.filter((e: any) => e?.group === item),
          });
        });

        setIsLeagueCup(ranks?.[0]?.group?.includes("Group"));
        setRankCup(rankCupData);
      } else {
        setIsLeagueCup(false);
        setRankData(res.data.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getRanksData(rankId as string);
  }, [rankId]);

  return (
    <div className="w-full">
      {isLeagueCup ? (
        <>
          {rankCup?.map((item: { league: string; ranks: IRank[] }) => (
            <TableRankCup
              key={item.league}
              league={item?.league}
              ranks={item?.ranks}
              status={status}
            />
          ))}
        </>
      ) : (
        <>
          {Object.entries(rankData)?.map(([key, value]) => {
            return (
              <div key={key}>
                <div className="bg-secondary rounded-t-lg p-4 ">
                  <div className="flex items-center w-full  text-xs lg:text-sm font-normal text-white">
                    <div className="w-[10%] flex items-center  ">#</div>
                    <div className="w-[30%] lg:w-[20%] flex items-center ">
                      Câu lạc bộ
                    </div>
                    <div className="w-[30%] lg:w-[30%] flex items-center gap-2 lg:gap-10">
                      <span>P</span>
                      <span>W</span>
                      <span>D</span>
                      <span>L</span>
                    </div>
                    <div className="w-[20%] lg:w-[10%] flex items-center ">
                      Bàn thắng
                    </div>
                    <div className="w-[20%] hidden lg:flex items-center justify-center  ">
                      <span className="inline-block border-b-2 border-white pb-1 relative">
                        Phong độ gần nhất
                        <span className="absolute -left-2 top-[15px]">
                          <MdOutlineKeyboardArrowLeft size={20} />
                        </span>
                      </span>
                    </div>
                    <div className="w-[10%] flex items-center justify-end">
                      PTS
                    </div>
                  </div>
                </div>
                {/* @ts-ignore */}
                {rankData[key]
                  ?.sort(
                    (a: { rank: number }, b: { rank: number }) =>
                      a?.rank - b?.rank
                  )
                  ?.map((item: IRank, index: number) => {
                    return (
                      <div
                        key={index}
                        className={twMerge(`bg-white`, className)}
                      >
                        <div key={index} className=" p-4 border-b">
                          <div className="flex items-center w-full  text-xs font-normal text-white">
                            <div className="w-[10%] flex items-center ">
                              <span className="w-4 h-4 text-xs lg:w-6 lg:h-6 bg-primary text-white flex items-center justify-center rounded-full">
                                {item?.rank}
                              </span>
                            </div>
                            <div className="w-[30%] lg:w-[20%] flex items-center gap-2">
                              <div className="w-5 h-5 lg:w-6 lg:h-6 relative flex-shrink-0">
                                <Image
                                  src={item?.logo}
                                  fill
                                  className="w-full h-full object-fill"
                                  alt=""
                                />
                              </div>
                              <span className="text-xs font-normal text-black11">
                                {item?.team_name}
                              </span>
                            </div>
                            <div className=" w-[30%] flex items-center gap-1 lg:gap-10 text-black11 text-xs">
                              <span>
                                {status === "all"
                                  ? item?.all?.matchs_played || 0
                                  : status === "home"
                                  ? item?.home?.matchs_played || 0
                                  : item?.away?.matchs_played || 0}
                              </span>
                              <span>
                                {status === "all"
                                  ? item?.all?.win || 0
                                  : status === "home"
                                  ? item?.home?.win || 0
                                  : item?.away?.win || 0}
                              </span>
                              <span>
                                {status === "all"
                                  ? item?.all?.draw || 0
                                  : status === "home"
                                  ? item?.home?.draw || 0
                                  : item?.away?.draw || 0}
                              </span>
                              <span>
                                {status === "all"
                                  ? item?.all?.lose || 0
                                  : status === "home"
                                  ? item?.home?.lose || 0
                                  : item?.away?.lose || 0}
                              </span>
                            </div>
                            <div className="w-[20%] lg:w-[10%] flex items-center justify-center  text-black11 text-xs gap-1">
                              <span>
                                {status === "all"
                                  ? item?.all?.goals_for || 0
                                  : status === "home"
                                  ? item?.home?.goals_for || 0
                                  : item?.away?.goals_for || 0}
                              </span>{" "}
                              :
                              <span>
                                {status === "all"
                                  ? item?.all?.goals_against || 0
                                  : status === "home"
                                  ? item?.home?.goals_against || 0
                                  : item?.away?.goals_against || 0}
                              </span>
                            </div>
                            <div className="w-[20%] hidden lg:flex items-center justify-center gap-2">
                              {item?.forme
                                ?.split("")
                                .map((it: any, index: number) => (
                                  <span
                                    key={index}
                                    className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${
                                      it.toLowerCase() === "w" && "bg-green02"
                                    } ${
                                      it.toLowerCase() === "l" && "bg-red-500"
                                    } ${
                                      it.toLowerCase() === "d" && "bg-[#9DA5AC]"
                                    } `}
                                  >
                                    {it}
                                  </span>
                                ))}
                            </div>
                            <div className="w-[10%] flex items-center justify-end text-black11 text-xs">
                              {status === "all"
                                ? item?.points || 0
                                : status === "home"
                                ? item?.home?.win ||
                                  0 * 3 + item?.home?.draw ||
                                  0
                                : item?.away?.win ||
                                  0 * 3 + item?.away?.draw ||
                                  0}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default TableTranscript;
