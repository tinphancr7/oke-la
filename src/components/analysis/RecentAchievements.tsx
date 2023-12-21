  //@ts-nocheck

import React from "react";
import { HomeLastMatches } from "./lastMatches/HomeLastMatches";
import { AwayLastMatches } from "./lastMatches/AwayLastMatches";

export const RecentAchievements = ({ matchAnalysis, matche }) => {
  return (
    <div className="compare-odds container">
      {matchAnalysis > 0 && (
        <>
          <h2 className="team-table-title text-sm sm:text-[25px]">Thành tích gần đây</h2>
          <HomeLastMatches matchAnalysis={matchAnalysis} />
          <AwayLastMatches matchAnalysis={matchAnalysis} />
        </>
      )}
    </div>
  );
};
