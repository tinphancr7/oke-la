import { LOGO_DEFAULT } from "@/constant";
import moment from "moment";
import React from "react";

type Props = {
  title: string;
  lastMatches: any[];
  groupLeague: any[];
  indexHomeIcon: number;
  indexAwayIcon: number;
  count: any;
  checkMatchStatusAttr: "homeId" | "awayId";
};

function H2HItem({
  groupLeague,
  lastMatches,
  title,
  indexAwayIcon,
  indexHomeIcon,
  count,
  checkMatchStatusAttr,
}: Props) {
  const checkMatchStatus = (
    firstTeam: number,
    secondTeam: number,
    teamId: number,
    homeNumber: number
  ) => {
    if (firstTeam > secondTeam && teamId == homeNumber) {
      return "W";
    } else if (firstTeam < secondTeam && teamId == homeNumber) {
      return "W";
    } else if (firstTeam == secondTeam) {
      return "D";
    } else {
      return "L";
    }
  };

  return (
    <div className="w-full p-4 rounded-2xl shadow border border-neutral-200 flex-col justify-start items-center">
      <div className="w-full">
        <h2 className=" text-yellow-700 text-2xl font-bold leading-9">
          {title}
        </h2>
        <div className="flex justify-between mt-3">
          <p>Số Trận gần nhất</p>
          <div className="w-12 h-[29px] px-2 py-1 bg-amber-500 rounded-lg shadow border border-neutral-200 justify-center items-center gap-2 inline-flex">
            <div className="text-center text-white text-sm font-normal leading-[21px]">
              {lastMatches?.length || 0}
            </div>
            <img
              className="w-4 h-4 relative"
              src="/images/arrow-down.svg"
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-between  mt-3">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2 ">
              <div className="w-5 h-5 bg-emerald-500 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
                <p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
                  W
                </p>
              </div>
              <span className="text-center text-black text-sm font-normal leading-[21px]">
                x{count?.win}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2 ">
              <div className="w-5 h-5 bg-gray-400  rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
                <p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
                  D
                </p>
              </div>
              <span className="text-center text-black text-sm font-normal leading-[21px]">
                x{count?.draw}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2 ">
              <div className="w-5 h-5 bg-red-600 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
                <p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
                  L
                </p>
              </div>
              <span className="text-center text-black text-sm font-normal leading-[21px]">
                x{count?.lose}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 flex rounded-2xl shadow border border-neutral-200 flex-col justify-start items-start">
        {Object.keys(groupLeague || {})
          .filter((item: any) => groupLeague?.[item]?.length > 0)
          .map((item: any, index) => (
            <div key={index} className="w-full">
              <div className="flex w-full px-4 py-2 bg-yellow-700 rounded-tl-2xl rounded-tr-2xl border border-neutral-200 flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-between items-start flex">
                  <div>
                    <span className="text-indigo-100 text-sm font-normal leading-[21px]">
                      {item}
                    </span>
                  </div>
                  <div className="justify-start items-start gap-8 flex">
                    <div className="w-5 text-center text-white text-sm font-normal leading-[21px]">
                      FT
                    </div>
                    <div className="w-5 text-center text-white text-sm font-normal leading-[21px]">
                      HT
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch  flex-col justify-start items-center gap-2 flex">
                {groupLeague[item]?.map((match: any, key: number) => (
                  <div
                    className="w-full flex-col justify-start items-start gap-1 flex first:border-b-2 first:mt-2 pb-4"
                    key={key}
                  >
                    <div className="self-stretch px-4 justify-start items-center gap-4 inline-flex">
                      <div className="grow shrink basis-0 h-[72px] flex-col justify-between items-start gap-2 inline-flex">
                        <div className="self-stretch justify-between items-center gap-[139px] inline-flex">
                          <div className="justify-start items-center gap-4 flex">
                            <img
                              className="w-8 h-8 rounded-full"
                              src={
                                match?.split(",")?.[indexHomeIcon] &&
                                match?.split(",")?.[indexHomeIcon] !==
                                  "undefined"
                                  ? match?.split(",")?.[indexHomeIcon]
                                  : LOGO_DEFAULT
                              }
                              alt=""
                            />
                            <p className="text-neutral-900 text-sm font-normal leading-[21px]">
                              {match?.split(",")?.[4]}
                            </p>
                          </div>
                          <div className="justify-start items-start gap-8 flex">
                            <div className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
                              {match?.split(",")?.[8]}
                            </div>
                            <div className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
                              {match?.split(",")?.[10]}
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch justify-between items-center gap-28 inline-flex">
                          <div className="justify-start items-center gap-4 flex">
                            <img
                              className="w-8 h-8 rounded-full"
                              src={
                                match?.split(",")?.[indexAwayIcon] &&
                                match?.split(",")?.[indexAwayIcon] !==
                                  "undefined"
                                  ? match?.split(",")?.[indexAwayIcon]
                                  : LOGO_DEFAULT
                              }
                              alt=""
                            />
                            <p className="text-neutral-900 text-sm font-normal leading-[21px]">
                              {match?.split(",")?.[6]}
                            </p>
                          </div>
                          <div className="justify-start items-start gap-8 flex">
                            <p className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
                              {match?.split(",")?.[9]}
                            </p>
                            <p className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
                              {match?.split(",")?.[11]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch px-4 justify-between items-start flex mt-2">
                      <p className="text-neutral-900 text-sm font-normal leading-[21px]">
                        {moment(new Date(match?.split(",")?.[3] * 1000)).format(
                          "HH:mm A  | DD.MM.YYYY"
                        )}
                      </p>
                      <div className="w-5 h-5 bg-gray-400 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
                        <p
                          className={`w-5 h-5 ${
                            checkMatchStatus(
                              Number(match?.split(",")?.[8]),
                              Number(match?.split(",")?.[9]),
                              Number(match?.split(",")?.[5]),
                              Number(match[checkMatchStatusAttr])
                            ) == "W"
                              ? "bg-emerald-500"
                              : checkMatchStatus(
                                  Number(match?.split(",")?.[8]),
                                  Number(match?.split(",")?.[9]),
                                  Number(match?.split(",")?.[5]),
                                  Number(match[checkMatchStatusAttr])
                                ) == "L"
                              ? "bg-red-600"
                              : "bg-gray-400"
                          } rounded-[26px] text-white text-[12px] flex-col justify-center items-center gap-2.5 inline-flex`}
                        >
                          {checkMatchStatus(
                            Number(match?.split(",")?.[8]),
                            Number(match?.split(",")?.[9]),
                            Number(match?.split(",")?.[5]),
                            Number(match[checkMatchStatusAttr])
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default H2HItem;
