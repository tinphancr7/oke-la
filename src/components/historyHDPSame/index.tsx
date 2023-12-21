import { IMatch } from "@/interfaces";
import moment from "moment";
import React, { useMemo } from "react";

type Props = {
  analysis: any;
  match: IMatch;
  titleMatch: string;
  classHeader: string;
  teamId?: string;
};

function HistoryHDPSame({
  analysis,
  classHeader,
  match,
  titleMatch,
  teamId,
}: Props) {
  const genData = (temp: any[]) => {
    const result = [];
    for (let i = 0; i < temp?.length; i++) {
      let item = temp?.[i]?.split(",");

      result.push({
        matchId: item?.[0],
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

    return result?.sort((a, b) => b?.matchTime - a?.matchTime);
  };

  const data = useMemo(() => {
    const dataHome = genData(analysis?.homeLastMatches);
    const dataAway = genData(analysis?.awayLastMatches);
    const exist: any[] = [];
    const homeResult: any = {};
    const awayResult: any = {};
    // for (let i = 0; i < dataHome?.length; i++) {
    //   if (dataHome?.[i].homeTeamId === match?.homeId) {
    //     if (
    //       dataAway?.find(
    //         (item) =>
    //           ((item?.homeTeamId === match?.awayId &&
    //             item?.initialHandicap === dataHome?.[i]?.initialHandicap) ||
    //             (item?.awayTeamId === match?.awayId &&
    //               item?.initialHandicap ===
    //                 -1 * dataHome?.[i]?.initialHandicap)) &&
    //           !exist?.includes(item?.matchId)
    //       )
    //     ) {
    //       const newData = dataAway?.filter(
    //         (item) =>
    //           ((item?.homeTeamId === match?.awayId &&
    //             item?.initialHandicap === dataHome?.[i]?.initialHandicap) ||
    //             (item?.awayTeamId === match?.awayId &&
    //               item?.initialHandicap ===
    //                 -1 * dataHome?.[i]?.initialHandicap)) &&
    //           !exist?.includes(item?.matchId)
    //       );
    //       exist.push(...newData?.map((item) => item?.matchId));
    //       awayResult[dataHome?.[i]?.initialHandicap] = [
    //         ...(awayResult[dataHome?.[i]?.initialHandicap] || []),
    //         ...newData,
    //       ];
    //       homeResult[dataHome?.[i]?.initialHandicap] = [
    //         ...(homeResult[dataHome?.[i]?.initialHandicap] || []),
    //         dataHome?.[i],
    //       ];
    //     }
    //   } else if (dataHome?.[i].awayTeamId === match?.homeId) {
    //     if (
    //       dataAway?.find(
    //         (item) =>
    //           ((item?.awayTeamId === match?.awayId &&
    //             item?.initialHandicap === dataHome?.[i]?.initialHandicap) ||
    //             (item?.homeTeamId === match?.awayId &&
    //               item?.initialHandicap ===
    //                 -1 * dataHome?.[i]?.initialHandicap)) &&
    //           !exist?.includes(item?.matchId)
    //       )
    //     ) {
    //       const newData = dataAway?.filter(
    //         (item) =>
    //           ((item?.awayTeamId === match?.awayId &&
    //             item?.initialHandicap === dataHome?.[i]?.initialHandicap) ||
    //             (item?.homeTeamId === match?.awayId &&
    //               item?.initialHandicap ===
    //                 -1 * dataHome?.[i]?.initialHandicap)) &&
    //           !exist?.includes(item?.matchId)
    //       );
    //       exist.push(...newData?.map((item) => item?.matchId));
    //       awayResult[dataHome?.[i]?.initialHandicap] = [
    //         ...(awayResult[dataHome?.[i]?.initialHandicap] || []),
    //         ...newData,
    //       ];
    //       homeResult[dataHome?.[i]?.initialHandicap] = [
    //         ...(homeResult[dataHome?.[i]?.initialHandicap] || []),
    //         dataHome?.[i],
    //       ];
    //     }
    //   }
    // }

    for (let i = -5; i <= 5; i += 0.25) {
      const home = dataHome?.filter(
        (item) =>
          (item?.homeTeamId === match?.homeId && item?.initialHandicap === i) ||
          (item?.awayTeamId === match?.homeId &&
            item?.initialHandicap === -1 * i)
      );
      const away = dataAway?.filter(
        (item) =>
          (item?.homeTeamId === match?.awayId && item?.initialHandicap === i) ||
          (item?.awayTeamId === match?.awayId &&
            item?.initialHandicap === -1 * i)
      );

      if (home?.length > 0 && away?.length > 0) {
        homeResult[i] = home;
        awayResult[i] = away;
      }
    }

    return match?.homeId === teamId ? homeResult : awayResult;
  }, [analysis, match, teamId]);

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
    <div>
      <div
        className={`mt-8 text-secondary ${classHeader} px-6 py-2 flex items-center justify-center gap-8`}
      >
        {titleMatch}
      </div>
      {Object.keys(data)?.map((key, index) => (
        <div key={index}>
          <div className="flex w-full bg-[#F1F1F1] text-[#BBB] text-xs">
            <div className="w-[10%] p-1 text-center">Giải đấu</div>
            <div className="w-[20%] p-1 text-center">Thời gian</div>
            <div className="w-[20%] p-1 text-center">Chủ</div>
            <div className="w-[10%] p-1 text-center">HDP</div>
            <div className="w-[20%] p-1 text-center">Khách</div>
            <div className="w-[10%] p-1 text-center">Tỷ số</div>
            <div className="w-[10%] p-1 text-center">T/B</div>
          </div>
          {data[key]?.map((item: any) => (
            <div className="flex w-full text-xs" key={item?.matchId}>
              <div className="w-[10%] p-1 text-center">{item?.league}</div>
              <div className="w-[20%] p-1 text-center">
                {moment(item?.matchTime * 1000).format("DD/MM/YYYY")}
              </div>
              <div className="w-[20%] p-1 text-center">{item?.home}</div>
              <div className="w-[10%] p-1 text-center">
                {item?.initialHandicap}
              </div>
              <div className="w-[20%] p-1 text-center">{item?.away}</div>
              <div className="w-[10%] p-1 text-center">
                {item?.scoreHome} - {item?.scoreAway}
              </div>
              <div className="w-[10%] p-1 text-center">
                {genTBHDP(
                  item?.scoreHome,
                  item?.scoreAway,
                  item?.initialHandicap,
                  item?.homeTeamId,
                  item?.awayTeamId
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HistoryHDPSame;
