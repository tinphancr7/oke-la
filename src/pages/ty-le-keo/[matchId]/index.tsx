import {
  getEvent,
  getLineUpById,
  getMatchAnalysis,
  getMatchAnalysisAll,
  getMatchById,
  getStatsByMatchId,
} from "@/apis/match";
import CompareOdds from "@/components/CompareOdds/CompareOdds";
import Commentary from "@/components/DetailMatch/Commentary";
import DetailMatch from "@/components/DetailMatch/DetailMatch";
import LiveEvent from "@/components/LiveEvent";
import OddsComponents from "@/components/OddsComponents";
import ImageWithFallback from "@/components/imageWithFallback";
import LiveMatchTime from "@/components/renderLiveMatchTime";
import LineUp from "@/containers/LiveStream/LineUp";
import { getMatchStatus, isDisplayScore } from "@/helper";
import findMatchData from "@/helper/matchAnalyticsHelper";
import { IMatch } from "@/interfaces";
import { isPlayingMatches } from "@/utils";
import moment from "moment";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";

export type tabType = "odds" | "stat" | "live" | "commentation" | "lineup";

const OddsDetail = ({
  slug,
  keyword,
  description,
  result,
  events,
  lineup,
  matchAnalysis,
  stats,
}: {
  slug: string;
  keyword: string;
  description: string;
  result: IMatch;
  events: any;
  lineup: any;
  matchAnalysis: any;
  stats: any;
}) => {
  const convertDays = [
    "Chủ Nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const [tab, setTab] = useState<tabType>("odds");
  const matchTime = new Date(result.matchTime * 1000);
  const returnMatchAnalysis = findMatchData(matchAnalysis, result);
  console.log("resultresultresult", result);
  const renderByTab = () => {
    switch (tab) {
      case "odds":
        return <CompareOdds match={result} />;
      case "live":
        return <LiveEvent match={result as any} event={events} />;
      case "lineup":
        return <LineUp lineup={lineup} match={result as any} />;
      case "stat":
        return (
          <DetailMatch
            odds={{}}
            stats={stats}
            match={result}
            events={events}
            matchAnalysis={matchAnalysis}
          />
        );
      case "commentation":
        return (
          <Commentary matchAnalysis={returnMatchAnalysis} match={result} />
        );
    }
  };

  return (
    <div className="page-container">
      <div className="body">
        <div className="my-8 menu-details-match-result">
          {/* <p className="league-name-and-time">
            <span className="menu-detail-league-name">
              {result?.leagueShortName}
            </span>
            {moment(result?.matchTime * 1000).format("DD/MM/YYYY HH:mm ")}

            {`${convertDays[matchTime.getDay()]}`}
          </p> */}
          {/* <div className="match-result-versus">
            <div className="match-result-home-logo">
              <ImageWithFallback
                style={{ width: "90px" }}
                alt={result.homeName}
                src={result.homeIcon}
                // src={`${result?.homeIcon}`}
              />
            </div>
            <div className="match-result-vs-detail">
              <div className="match-result-vs-detail-homename">
                <p>{result.homeName}</p>
              </div>
              <div className="match-result-vs-datail-result">
                <p>
                  {isDisplayScore(result.status) && (
                    <span className="match-result-vs-datail-result-score">
                      {result.homeScore}
                    </span>
                  )}
                  {result.status == 0 ? (
                    <span className="match-result-vs-datail-result-score">
                      VS
                    </span>
                  ) : (
                    <span className="match-result-vs-datail-result-status">
                      {getMatchStatus(result.status)}
                    </span>
                  )}
                  {isDisplayScore(result.status) && (
                    <span className="match-result-vs-datail-result-score">
                      {result.awayScore}
                    </span>
                  )}
                </p>
              </div>
              <div className="match-result-vs-detail-awayname">
                <p>{result.awayName}</p>
              </div>
            </div>
            <div className="match-result-away-logo">
              <ImageWithFallback
                style={{ width: "90px" }}
                alt={result.awayName}
                src={result.awayIcon}
              />
            </div>
          </div> */}

          <div className="bg-[#EEE] py-4 rounded-[12px]">
            <div className="text-center text-secondary font-bold text-lg">
              {result?.leagueName}
            </div>
            <div className="mt-4 flex items-center gap-8 w-full justify-between">
              <div className="flex-1 flex items-center justify-end gap-2 lg:gap-4 flex-col-reverse lg:flex-row">
                <div className="font-bold text-sm lg:text-lg">
                  {result?.homeName}
                </div>
                <div className="p-2 bg-white rounded-full">
                  <ImageWithFallback
                    src={result?.homeIcon}
                    alt={result?.homeName}
                    className="w-[48px] h-[48px]"
                  />
                </div>
              </div>
              <div className="text-center">
                {result?.status == -1 ? (
                  <div>
                    <div className="font-semibold text-red-600 text-lg">
                      {result?.homeScore} - {result?.awayScore}
                    </div>
                    <div className="text-xs text-blue-700 font-semibold">
                      HT: ({result?.homeHalfScore} - {result?.awayHalfScore})
                    </div>
                  </div>
                ) : isPlayingMatches(result?.status) ? (
                  <LiveMatchTime match={result} />
                ) : (
                  <div className="px-2 py-1 rounded-[8px] inline-block bg-secondary text-white text-sm font-semibold">
                    {moment(result?.matchTime * 1000)?.format("HH:mm")}
                  </div>
                )}
                <div className="text-blue-500 font-semibold text-sm lg:text-base mt-2">
                  {moment(result?.matchTime * 1000)?.format("DD/MM/YYYY")}
                </div>
              </div>

              <div className="flex-1 flex items-center justify-start gap-2 lg:gap-4 flex-col lg:flex-row">
                <div className="p-2 bg-white rounded-full">
                  <ImageWithFallback
                    src={result?.awayIcon}
                    alt={result?.awayName}
                    className="w-[48px] h-[48px]"
                  />
                </div>
                <div className="font-bold text-sm lg:text-lg">
                  {result?.awayName}
                </div>
              </div>
            </div>
          </div>

          <div className="match-detail-menu mt-8 mb-4">
            <ul className="text-xs sm:text-[16px] font-semibold">
              <li
                className={`${
                  tab == "odds" ? "match-detail-menu-selected" : ""
                }`}
                onClick={() => setTab("odds")}
              >
                Tỷ lệ cược
              </li>
              {/* <li
              className={`${tab == "odd" ? "match-detail-menu-selected" : ""}`}
              onClick={() => setTab("odd")}
            >
              Tỷ lệ cược
            </li> */}
              <li
                className={`${
                  tab == "stat" ? "match-detail-menu-selected" : ""
                }`}
                onClick={() => setTab("stat")}
              >
                Thống kê
              </li>
              <li
                className={`${
                  tab == "lineup" ? "match-detail-menu-selected" : ""
                }`}
                onClick={() => setTab("lineup")}
              >
                Đội hình
              </li>
              <li
                className={`${
                  tab == "live" ? "match-detail-menu-selected" : ""
                }`}
                onClick={() => setTab("live")}
              >
                Tường thuật
              </li>
              <li
                className={`${
                  tab == "commentation" ? "match-detail-menu-selected" : ""
                }`}
                onClick={() => setTab("commentation")}
              >
                Góc bình luận
              </li>
            </ul>
          </div>
          <div>{renderByTab()}</div>
        </div>
      </div>
    </div>
  );
};

export default OddsDetail;

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const keyword = ["chi tiet tran", "Chi tiet tran dau", "chi tiết trận đấu"];
  const description = "Chi tiết trận đấu";
  const slug = "chi-tiet-tran";
  try {
    const id = params?.matchId as string;
    const [result, matchAnalysis, stats, lineup] = await Promise.all([
      getMatchById(id),
      getMatchAnalysis(id),
      getStatsByMatchId(id),
      getLineUpById(id as string),
    ]);

    const date = moment(new Date(result.data.match[0].matchTime * 1000))
      .utcOffset(0)
      .format("YYYY-MM-DD");
    const events = await getEvent(id, date);

    return {
      props: {
        result: result.data?.match[0] || {},
        matchAnalysis: matchAnalysis.data?.[0] || {},
        slug,
        keyword,
        description,
        lineup: lineup.data || {},
        events: events.data?.[0]?.events || [],
        stats: stats.data?.[0] || {},
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        result: {},
        matchAnalysis: {},
        slug,
        keyword,
        description,
        events: [],
        lineup: {},
        stats: {},
      },
    };
  }
};
