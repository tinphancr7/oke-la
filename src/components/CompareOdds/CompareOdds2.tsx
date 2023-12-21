import { getComparison1X2 } from "@/apis/match";
import scheduleApi from "@/apis/schedule.api";
import { IMatch } from "@/interfaces";
import React, { useEffect, useMemo, useState } from "react";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";

type Props = {
  match: IMatch;
};

const handicapKeys = [
  "matchId",
  "companyId",
  "initialHandicap",
  "initialHome",
  "initialAway",
  "instantHandicap",
  "instantHome",
  "instantAway",
  "maintenance",
  "inPlay",
  "changeTime",
  "close",
  "OddsType",
];

const overUnderKeys = [
  "matchId",
  "companyId",
  "initialHandicap",
  "initialOver",
  "initialUnder",
  "instantHandicap",
  "instantOver",
  "instantUnder",
  "changeTime",
  "close",
  "OddsType",
];

const companyList = {
  1: "Macauslot",
  3: "Crown",
  8: "Bet365",
  9: "William Hill",
  12: "Easybets",
  14: "Vcbet",
  17: "Mansion88",
  22: "10BET",
  23: "188bet",
  24: "12bet",
  31: "Sbobet",
  35: "Wewbet",
  42: "18bet",
  47: "Pinnacle",
  48: "HK Jockey Club",
};

function CompareOdds2({ match }: Props) {
  const [odd, setOdd] = useState<any>();
  const [_1x2, set1x2] = useState<any[]>();

  const getAllData = async (matchId: any) => {
    const getdData = await getComparison1X2(matchId);
    set1x2(getdData?.odds);
  };

  useEffect(() => {
    if (match) {
      scheduleApi
        .getPrematchAndInplayOddByMatchId(Number(match?.matchId))
        .then((res) => setOdd(res.data));
      getAllData(match?.matchId);
    }
  }, [match]);

  const data = useMemo(() => {
    const hdc = odd?.handicap?.map((item: any) => {
      const newHandicap: {
        [key: string]: any;
      } = {};
      handicapKeys.forEach(
        (key, index) => (newHandicap[key] = item?.split(",")[index])
      );
      return newHandicap;
    });
    const ou = odd?.overUnder?.map((item: any) => {
      const newHandicap: {
        [key: string]: any;
      } = {};
      overUnderKeys.forEach(
        (key, index) => (newHandicap[key] = item?.split(",")[index])
      );
      return newHandicap;
    });

    const result: any[] = [];
    for (let i = 0; i < hdc?.length; i++) {
      result.push({
        company: companyList[`${hdc?.[i]?.companyId as 1}`],
        hdc: hdc?.[i],
        ou: ou?.find((e: any) => e?.companyId === hdc?.[i]?.companyId),
        eu:
          _1x2?.find(
            (e: any) => e?.oddsDetail?.split(",")?.[1] === hdc?.[i]?.companyId
          ) || {},
      });
    }

    return result || [];
  }, [odd, _1x2]);

  const compareStringFloatOdds = (initial: any, instant: any) => {
    if (initial !== undefined) {
      let a = parseFloat(initial).toFixed(2);
      let b = parseFloat(instant).toFixed(2);
      if (a > b) {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="oddDowns">{instant} </div>
            <HiOutlineArrowSmDown size={16} style={{ color: "red" }} />
          </div>
        );
      } else if (a == b) {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {instant}{" "}
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {instant}{" "}
            </div>
            <HiOutlineArrowSmUp
              size={16}
              style={{ color: "green", marginLeft: "2px" }}
            />
          </div>
        );
      }
    }
  };

  return (
    <div className="mt-12">
      <p className="text-center text-[20px] font-bold mb-4">
        So sánh kèo trực tuyến
      </p>
      {/* header */}
      <div className="w-full bg-secondary hidden lg:flex text-white font-semibold text-md">
        <div className="w-[20%] px-4 flex items-center gap-x-6">
          <div>CÔNG TY</div>
        </div>
        <div className="w-[20%]">
          <div className="border border-primary text-center w-full py-1 uppercase">
            Tỷ lệ Châu Á
          </div>
          <div className="flex w-full [&>div]:py-1 [&>div]:border-primary">
            <div className="flex-1 text-center border-l">Chủ</div>
            <div className="flex-1 text-center border-x">HDP</div>
            <div className="flex-1 text-center border-r">Khách</div>
          </div>
        </div>
        <div className="w-[20%]">
          <div className="border border-primary text-center w-full py-1 uppercase">
            Tỷ lệ tài xỉu
          </div>
          <div className="flex w-full [&>div]:py-1 [&>div]:border-primary">
            <div className="flex-1 text-center border-l">Tài</div>
            <div className="flex-1 text-center border-x">Kèo Đầu</div>
            <div className="flex-1 text-center border-r">Xỉu</div>
          </div>
        </div>
        <div className="w-[20%]">
          <div className="border border-primary text-center w-full py-1 uppercase">
            1x2
          </div>
          <div className="flex w-full [&>div]:py-1 [&>div]:border-primary">
            <div className="flex-1 text-center border-l">Chủ</div>
            <div className="flex-1 text-center border-x">Hòa</div>
            <div className="flex-1 text-center border-r">Khách</div>
          </div>
        </div>
        <div className="w-[10%]">
          <div className="border-r border-primary text-center w-full h-full d-flex items-center justify-center py-1">
            Xem thêm
          </div>
        </div>
        <div className="w-[10%]">
          <div className="border-l border-primary text-center w-full h-full d-flex items-center justify-center py-1">
            Thay đổi
          </div>
        </div>
      </div>

      {/* body desktop */}
      <div className="border-l border-r w-full">
        {data?.map((item) => (
          <div className="border-b w-full flex" key={item?.company}>
            <div className="w-[20%] flex items-center justify-between">
              <div className="w-[70%] font-bold text-center">
                {item?.company}
              </div>
              <div className="w-[30%] border-l text-center">
                <div className="text-sm py-2 font-semibold">Sớm</div>
                <div className="text-sm py-2 font-semibold">Live</div>
                <div className="text-red-600 text-sm py-2 font-semibold">
                  Run
                </div>
              </div>
            </div>

            {/* tilechaua */}
            <div className="w-[20%] flex items-center justify-between">
              <div className="flex-1 border-l text-center">
                <div className="text-sm py-2 font-semibold">
                  {item?.hdc?.initialHome || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(
                    item?.hdc?.initialHome,
                    item?.hdc?.instantHome
                  ) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">-</div>
              </div>

              <div className="flex-1 border-l text-center">
                <div className="text-sm py-2 font-semibold">
                  {item?.hdc?.initialHandicap || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(
                    item?.hdc?.initialHandicap,
                    item?.hdc?.instantHandicap
                  ) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">-</div>
              </div>

              <div className="flex-1 border-l text-center">
                <div className="text-sm py-2 font-semibold">
                  {item?.hdc?.initialAway || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(
                    item?.hdc?.initialAway,
                    item?.hdc?.instantAway
                  ) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">-</div>
              </div>
            </div>

            {/* tiletaixiu */}
            <div className="w-[20%] flex items-center justify-between">
              <div className="flex-1 border-l text-center">
                <div className="text-sm py-2 font-semibold">
                  {item?.ou?.initialOver || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(
                    item?.ou?.initialOver,
                    item?.ou?.instantOver
                  ) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">-</div>
              </div>

              <div className="flex-1 border-l text-center">
                <div className="text-sm py-2 font-semibold">
                  {item?.ou?.initialHandicap || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(
                    item?.ou?.initialHandicap,
                    item?.ou?.instantHandicap
                  ) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">-</div>
              </div>

              <div className="flex-1 border-l text-center">
                <div className="text-sm py-2 font-semibold">
                  {item?.ou?.initialUnder || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(
                    item?.ou?.initialUnder,
                    item?.ou?.instantUnder
                  ) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">-</div>
              </div>
            </div>

            {/* tile1x2 */}
            <div className="w-[20%] flex items-center justify-between">
              <div className="flex-1 border-l text-center">
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(item?.eu?.[2], item?.eu?.[5]) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(item?.eu?.[2], item?.eu?.[5]) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">-</div>
              </div>

              <div className="flex-1 border-l text-center">
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(item?.eu?.[3], item?.eu?.[6]) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(item?.eu?.[3], item?.eu?.[6]) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">-</div>
              </div>

              <div className="flex-1 border-l text-center">
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(item?.eu?.[4], item?.eu?.[7]) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">
                  {compareStringFloatOdds(item?.eu?.[4], item?.eu?.[7]) || "-"}
                </div>
                <div className="text-sm py-2 font-semibold">-</div>
              </div>
            </div>

            {/* xem them */}
            <div className="w-[10%] border-l flex items-center justify-center">
              <button className="bg-[#FFEDD8] p-[10px] rounded-[8px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M9.5625 15.625C13.1869 15.625 16.125 12.6869 16.125 9.0625C16.125 5.43813 13.1869 2.5 9.5625 2.5C5.93813 2.5 3 5.43813 3 9.0625C3 12.6869 5.93813 15.625 9.5625 15.625Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.2031 13.7031L18 17.5"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Thay doi */}
            <div className="w-[10%] border-l flex items-center justify-center">
              <button className="bg-[#FFEDD8] p-[10px] rounded-[8px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.5 16.25H2.5V3.75"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.5 7.5L12.5 11.875L7.5 8.125L2.5 12.5"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompareOdds2;
