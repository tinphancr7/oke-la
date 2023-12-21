import { IMatch } from "@/interfaces";
import { convertToOdd1 } from "@/utils";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  analysis: any;
  match: IMatch;
  title: string;
  titleMatch: string;
  classHeader: string;
  type?: string;
  teamId?: string;
};

function H2HMatchRate({
  match,
  title,
  titleMatch,
  analysis,
  classHeader,
  type = "all",
  teamId,
}: Props) {
  const [optionsQuantity, setOptionsQuantity] = useState<number[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [sameLeague, setSameLeague] = useState(false);

  useEffect(() => {
    let flag = true;

    const options = [];
    let i = 0;
    while (flag) {
      i += 5;
      if (i >= analysis?.length) {
        options.push(analysis?.length);
        flag = false;
      } else {
        options.push(i);
      }
    }
    setOptionsQuantity(options);
    setQuantity(analysis?.length || 0);
  }, [analysis]);

  const data = useMemo(() => {
    const result = [];
    for (let i = 0; i < analysis?.length; i++) {
      let item = analysis?.[i]?.split(",");
      if (sameLeague) {
        if (item?.[2] === match?.leagueId)
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
      } else {
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
    }

    return result
      ?.sort((a, b) => b?.matchTime - a?.matchTime)
      ?.slice(0, quantity);
  }, [analysis, match, quantity, sameLeague]);

  const extra = useMemo(() => {
    let winCount = 0;
    let drawCount = 0;
    let loseCount = 0;
    let over = 0;
    let winhdp = 0;
    data?.forEach((item) => {
      if (item?.homeTeamId === teamId) {
        if (item?.scoreHome > item?.scoreAway) {
          winCount++;
        } else if (item?.scoreHome === item?.scoreAway) {
          drawCount++;
        } else {
          loseCount++;
        }
      } else if (item?.awayTeamId === teamId) {
        if (item?.scoreHome < item?.scoreAway) {
          winCount++;
        } else if (item?.scoreHome === item?.scoreAway) {
          drawCount++;
        } else {
          loseCount++;
        }
      }

      if (item?.scoreHome + item?.scoreAway >= item?.initialTotal) {
        over++;
      }
      if (item?.homeTeamId === teamId) {
        if (item?.scoreHome - item.initialHandicap > item?.scoreAway) winhdp++;
      } else {
        if (item?.scoreHome - item.initialHandicap < item?.scoreAway) winhdp++;
      }
    });
    return {
      quantity: data?.length || 0,
      winCount,
      drawCount,
      loseCount,
      over,
      winhdp,
    };
  }, [data, teamId]);

  const genTXOverUnder = (homeScore: any, awayScore: any, totalOU: any) => {
    if (
      [homeScore, awayScore, totalOU].includes(null) ||
      [homeScore, awayScore, totalOU].includes(undefined)
    )
      return `-`;

    return homeScore + awayScore >= totalOU ? (
      <div className="w-[20px] h-[20px] bg-green-500 text-white m-auto p-0 leading-1 text-sm">
        T
      </div>
    ) : (
      <div className="w-[20px] h-[20px] bg-red-600 text-white m-auto p-0 leading-1 text-sm">
        X
      </div>
    );
  };

  const genTB1X2 = (
    homeScore: any,
    awayScore: any,
    homeId: any,
    awayId: any
  ) => {
    if (
      [homeScore, awayScore].includes(null) ||
      [homeScore, awayScore].includes(undefined)
    )
      return `-`;

    if (homeId === teamId) {
      return homeScore > awayScore ? (
        <div className="w-[20px] h-[20px] bg-green-500 text-white m-auto p-0 leading-1 text-sm">
          T
        </div>
      ) : homeScore === awayScore ? (
        <div className="w-[20px] h-[20px] bg-primary text-white m-auto p-0 leading-1 text-sm">
          H
        </div>
      ) : (
        <div className="w-[20px] h-[20px] bg-red-600 text-white m-auto p-0 leading-1 text-sm">
          B
        </div>
      );
    }

    if (awayId === teamId) {
      return homeScore < awayScore ? (
        <div className="w-[20px] h-[20px] bg-green-500 text-white m-auto p-0 leading-1 text-sm">
          T
        </div>
      ) : homeScore === awayScore ? (
        <div className="w-[20px] h-[20px] bg-primary text-white m-auto p-0 leading-1 text-sm">
          H
        </div>
      ) : (
        <div className="w-[20px] h-[20px] bg-red-600 text-white m-auto p-0 leading-1 text-sm">
          B
        </div>
      );
    }
  };

  const genTBHDP = (
    homeScore: any,
    awayScore: any,
    hdp: any,
    homeId: any,
    awayId: any
  ) => {
    if (
      [homeScore, awayScore, hdp].includes(null) ||
      [homeScore, awayScore, hdp].includes(undefined)
    )
      return `-`;
    if (homeId === teamId) {
      return homeScore - hdp > awayScore ? (
        <div className="w-[20px] h-[20px] bg-green-500 text-white m-auto p-0 leading-1 text-sm">
          T
        </div>
      ) : homeScore - hdp === awayScore ? (
        <div className="w-[20px] h-[20px] bg-primary text-white m-auto p-0 leading-1 text-sm">
          H
        </div>
      ) : (
        <div className="w-[20px] h-[20px] bg-red-600 text-white m-auto p-0 leading-1 text-sm">
          B
        </div>
      );
    }

    if (awayId === teamId) {
      return homeScore - hdp < awayScore ? (
        <div className="w-[20px] h-[20px] bg-green-500 text-white m-auto p-0 leading-1 text-sm">
          T
        </div>
      ) : homeScore - hdp === awayScore ? (
        <div className="w-[20px] h-[20px] bg-primary text-white m-auto p-0 leading-1 text-sm">
          H
        </div>
      ) : (
        <div className="w-[20px] h-[20px] bg-red-600 text-white m-auto p-0 leading-1 text-sm">
          B
        </div>
      );
    }
  };

  return (
    <div className="mt-12">
      <div className="text-[20px] font-bold mb-4 text-center">{title}</div>

      <div
        className={`mt-8 text-secondary min-w-full ${classHeader} px-6 py-2 flex items-center justify-center gap-4 lg:gap-8 flex-wrap`}
      >
        <div className="uppercase font-semibol">{titleMatch}</div>

        <div className="flex items-center gap-2">
          <input
            checked={sameLeague}
            onChange={(e) => setSameLeague(e?.target?.checked)}
            type="checkbox"
            className={`outline-none ${
              type === "all" ? "accent-secondary" : "accent-white"
            }`}
          />
          <div className="text-sm font-semibold">Giải đấu tương đồng</div>
        </div>

        <select
          className="text-sm py-1 px-2 outline-none rounded-[8px] text-black"
          value={quantity as any}
          onChange={(e) => setQuantity(e?.target?.value as any)}
        >
          {optionsQuantity?.map((item, index) => (
            <option value={item} key={item}>
              {item} trận gần nhất
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-fit lg:max-w-full overflow-x-auto">
        <div className="bg-[#F1F1F1] text-[#BBB] flex items-stretch text-xs [&>div]:border-r min-w-fit lg:min-w-full">
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            Giải đấu
          </div>
          <div className="w-[70px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            Ngày
          </div>
          <div className="w-[100px] lg:w-[15%] text-center p-2 flex items-center justify-center">
            Chủ
          </div>
          <div className="w-[80px] lg:w-[8%] text-center p-2 flex items-center justify-center">
            Tỷ số
          </div>
          <div className="w-[100px] lg:w-[15%] text-center p-2 flex items-center justify-center">
            Khách
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            Phạt góc
          </div>
          <div className="min-w-[300px] lg:w-[20%]">
            <div className="w-full border-b text-center p-2">CHÂU Á</div>
            <div className="flex">
              <div className="flex-1 text-center border-r p-2">Chủ</div>
              <div className="flex-1 text-center border-r p-2">HDP</div>
              <div className="flex-1 text-center border-r p-2">Khách</div>
              <div className="flex-1 text-center border-r p-2">T/B</div>
            </div>
          </div>
          <div className="min-w-[300px] lg:w-[20%]">
            <div className="w-full border-b text-center p-2">1X2</div>
            <div className="flex">
              <div className="flex-1 text-center border-r p-2">Chủ</div>
              <div className="flex-1 text-center border-r p-2">Hòa</div>
              <div className="flex-1 text-center border-r p-2">Khách</div>
              <div className="flex-1 text-center border-r p-2">T/B</div>
            </div>
          </div>
          <div className="min-w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            T/X
          </div>
        </div>
        {data?.map((item, index) => (
          <div
            className="w-full border-b flex items-center text-xs py-2 min-w-fit lg:min-w-full"
            key={index}
          >
            {" "}
            <div className="w-[50px] lg:w-[5%] text-center">{item?.league}</div>
            <div className="w-[70px] lg:w-[7%] text-center">
              {moment(item?.matchTime * 1000).format("DD/MM/YYYY")}
            </div>
            <div
              className={`w-[100px] lg:w-[15%] text-center font-semibold uppercase ${
                item?.homeTeamId === teamId ? "text-secondary" : ""
              }`}
            >
              {item?.home}
            </div>
            <div className="w-[80px] lg:w-[8%] text-center">
              {item?.scoreHome}-{item?.scoreAway} ({item?.homeHalfScore}-
              {item?.awayHalfScore})
            </div>
            <div
              className={`w-[100px] lg:w-[15%] text-center font-semibold uppercase ${
                item?.awayTeamId === teamId ? "text-secondary" : ""
              }`}
            >
              {item?.away}
            </div>
            <div className="w-[50px] lg:w-[5%] text-center">
              {item?.homeCorner}-{item?.awayCorner}
            </div>
            <div className="w-[300px] lg:w-[20%]">
              <div className="flex">
                <div className="flex-1 text-center">
                  {item?.initialHandicapHome}
                </div>
                <div className="flex-1 text-center">
                  {convertToOdd1(item?.initialHandicap as any)}
                </div>
                <div className="flex-1 text-center">
                  {item?.initialHandicapAway}
                </div>
                <div className="flex-1 text-center">
                  {genTBHDP(
                    item?.scoreHome,
                    item?.scoreAway,
                    item?.initialHandicap,
                    item?.homeTeamId,
                    item?.awayTeamId
                  )}
                </div>
              </div>
            </div>
            <div className="w-[300px] lg:w-[20%]">
              <div className="flex">
                <div className="flex-1 text-center">{item?.initialHome}</div>
                <div className="flex-1 text-center">{item?.initialDraw}</div>
                <div className="flex-1 text-center">{item?.initialAway}</div>
                <div className="flex-1 text-center">
                  {genTB1X2(
                    item?.scoreHome,
                    item?.scoreAway,
                    item?.homeTeamId,
                    item?.awayTeamId
                  )}
                </div>
              </div>
            </div>
            <div className="w-[50px] lg:w-[5%] text-center">
              {genTXOverUnder(
                Number(item?.scoreHome),
                Number(item?.scoreAway),
                Number(item?.initialTotal)
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-b py-1 text-left lg:text-center font-semibold text-sm">
        OKChơi thống kê {extra?.quantity} trận gần đây, thắng {extra?.winCount},
        hòa {extra?.drawCount}, thua {extra?.loseCount}
        <p className="block lg:inline lg:ml-4">
          Tỉ lệ thắng:{" "}
          <span className="text-secondary">
            {((extra?.winCount * 100) / extra?.quantity)?.toFixed(1)}%
          </span>
        </p>
        <p className="block lg:inline lg:ml-4">
          Tỉ lệ thắng kèo:{" "}
          <span className="text-secondary">
            {((extra?.winhdp * 100) / extra?.quantity)?.toFixed(1)}%
          </span>
        </p>
        <p className="block lg:inline lg:ml-4">
          Tỉ lệ tài xỉu:{" "}
          <span className="text-secondary">
            {((extra?.over * 100) / extra?.quantity)?.toFixed(1)}%
          </span>
        </p>
      </div>
    </div>
  );
}

export default H2HMatchRate;
