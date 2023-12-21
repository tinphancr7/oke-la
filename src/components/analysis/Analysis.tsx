//@ts-nocheck
import React, { useEffect, useState } from "react";
import { RankTable } from "./RankTable";
import { HeadToHead } from "./HeadToHead";
import { RecentAchievements } from "./RecentAchievements";
import CompareData from "./CompareData";
import AsianOddsStatistics from "./AsianOddsStatistics";
import AsianOddsStatisticsHistory from "./AsianOddsStatisticsHistory";
import { GoalTotal } from "./GoalTotal";
import { HTFTDetail } from "./HTFTDetail";
import { BigSicOddEven } from "./BigSicOddEven";
import { UpcomingMatchesThree } from "./UpcomingMatchesThree";
import RecentLineups from "./RecentLineups";
import DataHistory from "./DataHistory";
import InjuriesAndSuspensions from "./InjuriesAndSuspensions";
import { TimeToScoreGoals } from "./TimeToScoreGoals";
import findMatchData from "@/helper/matchAnalyticsHelper";

const AnalysisPage = ({
  match,
  matchAnalysis,
}: {
  match: any;
  matchAnalysis: any;
}) => {
  console.log(matchAnalysis);
  const [more, setMore] = useState<number>(0);

  return (
    <>
      <div>
        <div>
          <div id="rankTable" style={{ marginTop: "30px" }}>
            <RankTable match={match} />
          </div>
          <div id="headToHead" style={{ marginTop: "30px" }}>
            {matchAnalysis.headToHead?.length > 0 && (
              <HeadToHead matchAnalysis={matchAnalysis} />
            )}
          </div>
          <div id="recentAchievements" style={{ marginTop: "30px" }}>
            {matchAnalysis?.homeLastMatches &&
              matchAnalysis?.awaytLastMatchesh > 0 && (
                <RecentAchievements matchAnalysis={matchAnalysis} />
              )}
          </div>
          <div id="CompareData">
            {matchAnalysis?.homeLastMatches &&
              matchAnalysis?.awaytLastMatches && (
                <CompareData matchAnalysis={matchAnalysis} />
              )}
          </div>

          <div id="asianOddsStatistics" style={{ marginTop: "30px" }}>
            {matchAnalysis?.homeOdds?.length > 0 &&
              matchAnalysis?.awayOdds?.length > 0 && (
                <AsianOddsStatistics matchAnalysis={matchAnalysis} />
              )}
          </div>
          <div id="asianOddsStatisticsHistory" style={{ marginTop: "30px" }}>
            {matchAnalysis?.homeLastMatches?.length > 0 &&
              matchAnalysis?.awaytLastMatches?.length > 0 && (
                <AsianOddsStatisticsHistory
                  matchAnalysis={matchAnalysis}
                  match={match}
                />
              )}
          </div>

          <div id="goalTotal" style={{ marginTop: "30px" }}>
            {match?.homeGoals && match?.awayGoals && (
              <GoalTotal matchAnalysis={matchAnalysis} />
            )}
          </div>
          <div id="hTFTDetail" style={{ marginTop: "30px" }}>
            {match?.homeHT && match?.awayHT && (
              <HTFTDetail matchAnalysis={matchAnalysis} />
            )}
          </div>
          <div id="bigSicOddEven">
            {matchAnalysis?.homeOdds && matchAnalysis?.awayOdds && (
              <BigSicOddEven matchAnalysis={matchAnalysis} />
            )}
          </div>
          <div id="timeToScoreGoals">
            {matchAnalysis?.homeShootTime && matchAnalysis?.awayShootTime && (
              <TimeToScoreGoals matchAnalysis={matchAnalysis} />
            )}
          </div>
          <div id="upcomingMatchesThree">
            {match?.homeSchedule && match?.awaySchedule && (
              <UpcomingMatchesThree matchAnalysis={matchAnalysis} />
            )}
          </div>
          <div id="injuriesAndSuspensions">
            {/* <InjuriesAndSuspensions /> */}
          </div>
          <div id="recentLineups">{/* <RecentLineups /> */}</div>
          <div id="dataHistory">
            {matchAnalysis && <DataHistory matchAnalysis={matchAnalysis} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisPage;
