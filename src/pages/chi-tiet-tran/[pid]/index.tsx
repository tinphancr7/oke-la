/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";

import DetailMatch from "@/components/DetailMatch/DetailMatch";

import {
  getEvent,
  getMatchAnalysis,
  getMatchById,
  getStatsByMatchId,
} from "@/apis/match";
import CompareOdds from "@/components/CompareOdds/CompareOdds";
import OddsTable from "@/components/CompareOdds/OddsTable";
import AnalysisPage from "@/components/analysis/Analysis";
import { getMatchStatus, isDisplayScore } from "@/helper";
import findMatchData from "@/helper/matchAnalyticsHelper";
import moment from "moment";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import ImageWithFallback from "@/components/imageWithFallback";
import { getMatchOdds } from "@/apis/odd";
import scheduleApi from "@/apis/schedule.api";
import axios from "axios";

const ChiTietTranDau = ({
  slug,
  keyword,
  description,
  result,
  matchAnalysis,
  events,
  stats,
  matchAnalysisOrigin,
  odds,
  matchDetail,
}: {
  slug: string;
  keyword: string;
  description: string;
  result: any;
  matchAnalysis: any;
  events: any;
  stats: any;
  matchAnalysisOrigin: any;
  odds: any;
  matchDetail: any;
}) => {
  const router = useRouter();
  const [menu, setMenu] = useState(1);
  const convertDays = [
    "Chủ Nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const getMenu = () => {
    if (router.query["chi-tiet"] === "") {
      setMenu(1);
    }
    if (router.query["phan-tich"] === "") {
      setMenu(2);
    }
    if (router.query["so-sanh-tl"] === "") {
      setMenu(3);
    }
  };
  useEffect(() => {
    getMenu();
  }, [router?.query?.pid]);
  const matchTime = new Date(result.matchTime * 1000);
  return (
    <div className="page-container">
      <div className="body">
        <div className="my-8 menu-details-match-result">
          <p className="league-name-and-time">
            <span className="menu-detail-league-name">
              {result?.leagueShortName}
            </span>
            {`${matchTime.getDate()}/${(
              "0" +
              (matchTime.getMonth() + 1)
            ).substring(-2)}/${matchTime.getFullYear()}`}{" "}
            {`${matchTime.getHours()}:${matchTime.getMinutes()}`}{" "}
            {`${convertDays[matchTime.getDay()]}`}
          </p>
          <div className="match-result-versus">
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
          </div>
        </div>
        <div className="menu-details-match">
          {/* <button
            className={menu === 0 ? "menu-hover" : ""}
            onClick={() => setMenu(0)}
          >
            Tips
          </button> */}
          <button
            className={menu === 1 ? "menu-hover active" : ""}
            onClick={() => {
              router.push({
                pathname: `/chi-tiet-tran/${router.query?.pid}`,
                query: "chi-tiet",
              });
              setMenu(1);
            }}
          >
            Chi Tiết
          </button>
          <button
            className={menu === 2 ? "menu-hover active" : ""}
            onClick={() => {
              router.push({
                pathname: `/chi-tiet-tran/${router.query?.pid}`,
                query: "phan-tich",
              });
              setMenu(2);
            }}
          >
            Phân Tích
          </button>
          <button
            className={menu === 3 ? "menu-hover active" : ""}
            onClick={() => {
              router.push({
                pathname: `/chi-tiet-tran/${router.query?.pid}`,
                query: "so-sanh-tl",
              });
              setMenu(3);
            }}
          >
            So Sánh TL
          </button>
        </div>
        {menu === 1 && (
          <DetailMatch
            matchAnalysis={matchAnalysisOrigin}
            match={result}
            events={events}
            stats={stats}
            odds={odds}
          />
        )}
        <div className="details-match">
          {menu === 2 && (
            <AnalysisPage matchAnalysis={matchAnalysis} match={result} />
          )}
          {menu === 3 && (
            <>
              <CompareOdds match={result} />
              {/* <OddsTable /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const keyword = ["chi tiet tran", "Chi tiet tran dau", "chi tiết trận đấu"];
  const description = "Chi tiết trận đấu";
  const slug = "chi-tiet-tran";
  try {
    const id = params?.pid as string;

    const [result, matchAnalysis, stats, odds] = await Promise.all([
      getMatchById(id),
      getMatchAnalysis(id),
      getStatsByMatchId(id),
      scheduleApi.getPrematchAndInplayOddByMatchId(Number(id)),
    ]);
    const date = moment(new Date(result.data.match[0].matchTime * 1000))
      .utcOffset(0)
      .format("YYYY-MM-DD");
    const events = await getEvent(id, date);
    const returnMatchAnalysis = findMatchData(
      matchAnalysis.data[0],
      result.data?.match[0]
    );
    return {
      props: {
        result: result.data?.match[0] || {},
        matchAnalysis: returnMatchAnalysis || {},
        matchAnalysisOrigin: matchAnalysis.data?.[0] || {},
        slug,
        keyword,
        description,
        events: events.data?.[0] || {},
        stats: stats.data?.[0] || {},
        odds: odds?.data || {},
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
        events: {},
        stats: {},
        matchAnalysisOrigin: {},
        odds: {},
      },
    };
  }
};

export default ChiTietTranDau;
