import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import CompareRatioBar from "../CompareRatioBar";
import { countWinLose } from "@/helper";
import CompareRatioBar2 from "../CompareRatioBar2";
import CompareLiveOdds from "../compareLiveOdds";
import CompareOdds2 from "../CompareOdds/CompareOdds2";
import { IMatch } from "@/interfaces";
import ForecastMatch from "../forecastMatch";
import { getRankByLeague } from "@/apis/league";
import StandingMatchRate from "../standingMatchRate";
import H2HMatchRate from "../H2HMatchRate";
import CompareLastMatches from "../CompareLastMatch";
import AsianOddsTable from "../AsianOddsTable";
import HistoryHDPSame from "../historyHDPSame";
import OverUnderParity from "../overUnderParity";
import FiveNextMatch from "../FiveNextMatch";
import ShootingTimeMatchRate from "../shootingTimeMatchRate";
import DetailHTAndFT from "../DetailHTAndFT";
import GoalH1AndH2 from "../GoalH1AndH2";

export default function DetailMatch_Content({
  matchAnalysis,
  odds,
  match,
}: {
  matchAnalysis: any;
  odds: any;
  match: IMatch;
}) {
  const [standing, setStanding] = useState({});

  const getStanding = async (leagueId: any) => {
    try {
      const result = await getRankByLeague(leagueId);

      setStanding(result?.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (match?.leagueId) {
      getStanding(match?.leagueId);
    }
  }, [match]);

  const analyzeHome = countWinLose(matchAnalysis?.homeLastMatches);
  const analyzeAway = countWinLose(matchAnalysis?.awayLastMatches);
  const headToHeadAnalyze = countWinLose(matchAnalysis?.headToHead);
  const analyzeHome6Match = countWinLose(
    matchAnalysis?.homeLastMatches?.slice(1, 6)
  );
  const analyzeAway6Match = countWinLose(
    matchAnalysis?.awayLastMatches?.slice(1, 6)
  );
  return (
    <div
      className="w-full content"
      style={{ backgroundColor: "white", padding: "20px 6px" }}
    >
      <p className="text-center text-[20px] font-bold">Thống kê mùa giải này</p>
      {/* desktop */}
      <div className="hidden lg:block">
        <div className="table-header bg-slate-100 flex mt-6">
          <p className="text-center w-[40%] font-bold p-1">Tổng</p>
          <p className="text-center w-[20%] font-bold p-1">
            Thống kê thành tích
          </p>
          <p
            className="text-center w-[40%] font-bold p-1
        "
          >
            Chủ/Khách
          </p>
        </div>
        <div className="table-content flex">
          <div className="table-content-col w-[50%]">
            <CompareRatioBar
              home={analyzeHome?.home?.win}
              away={analyzeAway.away.win}
              title="Thắng"
            />
            <CompareRatioBar
              home={analyzeHome?.home?.draw}
              away={analyzeAway.away.draw}
              title="Hòa"
            />
            <CompareRatioBar
              home={analyzeHome?.home?.win}
              away={analyzeAway.away.win}
              title="Bại"
            />
          </div>
          <div className="table-content-col w-[50%]">
            <CompareRatioBar
              home={headToHeadAnalyze?.home?.win}
              away={headToHeadAnalyze.away.win}
              title="Thắng"
            />
            <CompareRatioBar
              home={headToHeadAnalyze?.home?.draw}
              away={headToHeadAnalyze.away.draw}
              title="Hòa"
            />
            <CompareRatioBar
              home={headToHeadAnalyze?.home?.lose}
              away={headToHeadAnalyze.away.lose}
              title="Bại"
            />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="block lg:hidden">
        <p className="text-center font-bold p-1">Tổng</p>
        <div className="shadow pb-2">
          <CompareRatioBar
            home={analyzeHome?.home?.win}
            away={analyzeAway.away.win}
            title="Thắng"
          />
          <CompareRatioBar
            home={analyzeHome?.home?.draw}
            away={analyzeAway.away.draw}
            title="Hòa"
          />
          <CompareRatioBar
            home={analyzeHome?.home?.win}
            away={analyzeAway.away.win}
            title="Bại"
          />
        </div>
        <p className="text-center font-bold p-1 mt-4">Chủ/Khách</p>
        <div>
          <CompareRatioBar
            home={analyzeHome?.home?.win}
            away={analyzeAway.away.win}
            title="Thắng"
          />
          <CompareRatioBar
            home={analyzeHome?.home?.draw}
            away={analyzeAway.away.draw}
            title="Hòa"
          />
          <CompareRatioBar
            home={analyzeHome?.home?.win}
            away={analyzeAway.away.win}
            title="Bại"
          />
        </div>
      </div>

      <div className="relative">
        <div className="table-header bg-slate-100 flex mt-6">
          <p className="text-center w-[50%] font-bold p-1">
            Số ghi/mất bàn của đội nhà
          </p>
          <p
            className="text-center w-[50%] font-bold p-1
        "
          >
            Số ghi mất bàn của đội khách
          </p>
        </div>
        <div className="mt-8">
          <CompareRatioBar2 isDisplayRatio={false} title="Tổng" />
          <CompareRatioBar2
            home={analyzeHome.home.win}
            away={analyzeAway.away.win}
            title="Tổng số được điểm"
          />
          <CompareRatioBar2
            home={analyzeHome.home.lose}
            away={analyzeAway.away.lose}
            title="Tổng số được điểm"
          />
          <CompareRatioBar2
            home={
              analyzeHome.home.win /
              (analyzeHome.home.win + analyzeHome.home.lose)
            }
            away={
              analyzeAway.home.win /
              (analyzeAway.home.win + analyzeAway.home.lose)
            }
            title="TB được điểm"
          />
          <CompareRatioBar2
            home={
              analyzeHome.home.lose /
              (analyzeHome.home.win + analyzeHome.home.lose)
            }
            away={
              analyzeAway.home.lose /
              (analyzeAway.home.win + analyzeAway.home.lose)
            }
            title="TB mất điểm"
          />
          <CompareRatioBar2 isDisplayRatio={false} title="6 trận gần đây" />
          <CompareRatioBar2
            home={analyzeHome6Match.home.win}
            away={analyzeAway6Match.away.win}
            title="Tổng số được điểm"
          />
          <CompareRatioBar2
            home={analyzeHome6Match.home.lose}
            away={analyzeAway6Match.away.lose}
            title="Tổng số mất điểm"
          />
          <CompareRatioBar2
            home={
              analyzeHome6Match.home.win /
              (analyzeHome6Match.home.win + analyzeHome6Match.home.lose)
            }
            away={
              analyzeHome6Match.away.win /
              (analyzeHome6Match.away.win + analyzeHome6Match.away.lose)
            }
            title="TB được điểm"
          />
          <CompareRatioBar2
            home={
              analyzeHome6Match.home.lose /
              (analyzeHome6Match.home.win + analyzeHome6Match.home.lose)
            }
            away={
              analyzeHome6Match.away.lose /
              (analyzeHome6Match.away.win + analyzeHome6Match.away.lose)
            }
            title="TB mất điểm"
          />
        </div>
      </div>
      <div className="table-header bg-slate-100 flex mt-12">
        <p className="text-center w-[100%] font-bold p-1">
          Thống kê hiệu số bàn thắng
        </p>
      </div>
      <div className="table-content flex flex-col lg:flex-row">
        <div className="table-content-col w-[100%] lg:w-[50%]">
          <CompareRatioBar
            home={analyzeHome?.home?.winMoreThanTwoGoal}
            away={analyzeAway.away.winMoreThanTwoGoal}
            title="Thắng 2 bàn +"
          />
          <CompareRatioBar
            home={analyzeHome?.home?.winOneGoal}
            away={analyzeAway.away.winOneGoal}
            title="Thắng 1 bàn"
          />
          <CompareRatioBar
            home={analyzeHome?.home?.draw}
            away={analyzeAway.away.draw}
            title="Hòa"
          />
        </div>
        <div className="table-content-col w-[100%] lg:w-[50%]">
          <CompareRatioBar
            home={headToHeadAnalyze?.home?.loseOneGoal}
            away={headToHeadAnalyze.away.loseOneGoal}
            title="Mất 1 bàn"
          />
          <CompareRatioBar
            home={headToHeadAnalyze?.home?.loseMoreThanTwoGoal}
            away={headToHeadAnalyze.away.loseMoreThanTwoGoal}
            title="Mất 2 bàn +"
          />
        </div>
      </div>
      <div>{/* <CompareLiveOdds odds={odds}/> */}</div>

      {/* So sánh kèo trực tuyến */}
      <CompareOdds2 match={match} />

      {/* Dự đoán đội thắng */}
      <ForecastMatch match={match} />

      {/* Bảng xếp hạng */}
      <StandingMatchRate standing={standing} match={match} />

      {/* Thành tích đối đầu */}
      <H2HMatchRate
        title="Thành tích đối đầu"
        titleMatch={`${match?.homeName} VS ${match?.awayName}`}
        analysis={matchAnalysis?.headToHead || []}
        match={match}
        classHeader="bg-[#FFE9CF]"
        teamId={match?.homeId}
      />

      <H2HMatchRate
        title="Thành tích gần đây"
        titleMatch={`${match?.homeName}`}
        analysis={matchAnalysis?.homeLastMatches || []}
        match={match}
        classHeader="bg-secondary !text-white"
        type="home"
        teamId={match?.homeId}
      />

      <H2HMatchRate
        title=""
        titleMatch={`${match?.awayName}`}
        analysis={matchAnalysis?.awayLastMatches || []}
        match={match}
        classHeader="bg-[#2D87D1] !text-white"
        type="away"
        teamId={match?.awayId}
      />

      {/* Lịch sử kèo châu á tương đồng */}
      <div className="mt-12">
        <div className="text-[20px] font-bold mb-4 text-center">
          Lịch sử kèo Châu Á tương đồng
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-1">
            <HistoryHDPSame
              titleMatch={`${match?.homeName}`}
              analysis={matchAnalysis}
              match={match}
              classHeader="bg-secondary !text-white"
              teamId={match?.homeId}
            />
          </div>
          <div className="col-span-1">
            <HistoryHDPSame
              titleMatch={`${match?.awayName}`}
              analysis={matchAnalysis}
              match={match}
              classHeader="bg-[#2D87D1] !text-white"
              teamId={match?.awayId}
            />
          </div>
        </div>
      </div>

      {/* Tài xỉu/lẻ chẵn */}
      <div className="mt-12">
        <div className="text-[20px] font-bold mb-4 text-center">
          Tài xỉu/lẻ chẵn
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-1">
            <OverUnderParity
              analysis={matchAnalysis?.homeLastMatches}
              match={match}
              type={"home"}
              teamId={match?.homeId}
            />
          </div>
          <div className="col-span-1">
            <OverUnderParity
              analysis={matchAnalysis?.awayLastMatches}
              match={match}
              type={"away"}
              teamId={match?.awayId}
            />
          </div>
        </div>
      </div>

      {/* Tổng số ghi bàn thắng/số bàn thắng trong h1&h2 */}
      <div className="mt-12">
        <div className="text-[20px] font-bold mb-4 text-center">
          Tổng số ghi bàn thắng/số bàn thắng trong H1&H2
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-1">
            <GoalH1AndH2
              analysis={matchAnalysis?.homeGoals}
              match={match}
              type={"home"}
              teamId={match?.homeId}
            />
          </div>
          <div className="col-span-1">
            <GoalH1AndH2
              analysis={matchAnalysis?.awayGoals}
              match={match}
              type={"away"}
              teamId={match?.awayId}
            />
          </div>
        </div>
      </div>

      {/* Chi tiết về hT/FT */}
      <div className="mt-12">
        <div className="text-[20px] font-bold mb-4 text-center">
          Chi tiết về hT/FT
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-1">
            <DetailHTAndFT
              analysis={matchAnalysis?.homeHT}
              match={match}
              type={"home"}
              teamId={match?.homeId}
            />
          </div>
          <div className="col-span-1">
            <DetailHTAndFT
              analysis={matchAnalysis?.awayHT}
              match={match}
              type={"away"}
              teamId={match?.awayId}
            />
          </div>
        </div>
      </div>

      {/* So sánh số liệu */}
      <CompareLastMatches matchAnalysis={matchAnalysis} match={match} />

      {/* Kèo châu Á */}
      <AsianOddsTable
        matchAnalysis={matchAnalysis}
        standing={standing}
        match={match}
      />

      {/* Thời gian ghi bàn thắng */}
      <div className="mt-12">
        <div className="text-[20px] font-bold text-center">
          Thời gian ghi bàn thắng
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-1">
            <ShootingTimeMatchRate
              analysis={matchAnalysis?.homeShootTime}
              match={match}
              type={"home"}
              teamId={match?.homeId}
            />
          </div>
          <div className="col-span-1">
            <ShootingTimeMatchRate
              analysis={matchAnalysis?.awayShootTime}
              match={match}
              type={"away"}
              teamId={match?.awayId}
            />
          </div>
        </div>
      </div>

      {/* 3 trận tiếp theo */}
      <div className="mt-12">
        <div className="text-[20px] font-bold text-center">3 trận sắp tới</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-1">
            <FiveNextMatch
              analysis={matchAnalysis?.homeSchedule}
              match={match}
              type={"home"}
              teamId={match?.homeId}
            />
          </div>
          <div className="col-span-1">
            <FiveNextMatch
              analysis={matchAnalysis?.awaySchedule}
              match={match}
              type={"away"}
              teamId={match?.awayId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
