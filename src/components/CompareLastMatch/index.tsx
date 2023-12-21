import { IMatch } from "@/interfaces";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  matchAnalysis: any;
  match: IMatch;
};

function CompareLastMatches({ matchAnalysis, match }: Props) {
  const [optionsQuantity, setOptionsQuantity] = useState<number>(10);
  const [quantity, setQuantity] = useState<number>(0);
  const [sameLeague, setSameLeague] = useState(false);
  const homeLastMatches = useMemo(() => {
    let homeGoal = 0;
    let homeLose = 0;
    let winAndDraw = 0;
    let homeGoalatHome = 0;
    let homeLoseAtHome = 0;
    let winAtHome = 0;
    let drawAtHome = 0;
    let loseAtHome = 0;
    let homeMatches = 0;
    let win = 0;
    let draw = 0;
    let lose = 0;
    let winAndDrawAtHome = 0;
    matchAnalysis.homeLastMatches
      ?.slice(
        matchAnalysis.homeLastMatches?.length - optionsQuantity,
        matchAnalysis.homeLastMatches?.length
      )
      ?.forEach((item: any) => {
        const arrayAnalys = item.split(",");
        if (arrayAnalys[4] == match.homeName) {
          homeGoal += Number(arrayAnalys[8]);
          homeLose += Number(arrayAnalys[9]);
          homeGoalatHome += Number(arrayAnalys[8]);
          homeLoseAtHome += Number(arrayAnalys[9]);
          homeMatches += 1;
          if (arrayAnalys[8] > arrayAnalys[9]) {
            winAndDrawAtHome += 1;
            winAtHome += 1;
            winAndDraw += 1;
            win += 1;
          } else if (arrayAnalys[8] < arrayAnalys[9]) {
            lose += 1;
            loseAtHome += 1;
          } else {
            winAndDrawAtHome += 1;
            winAndDraw += 1;
            draw += 1;
            drawAtHome += 1;
          }
        } else {
          homeGoal += Number(arrayAnalys[9]);
          homeLose += Number(arrayAnalys[8]);
          if (arrayAnalys[9] > arrayAnalys[8]) {
            winAndDraw += 1;
            win += 1;
          } else if (arrayAnalys[9] < arrayAnalys[8]) {
            lose += 1;
          } else {
            winAndDraw += 1;
            draw += 1;
          }
        }
      });

    return {
      homeGoal,
      homeLose,
      averageHavePoint:
        Math.round((winAndDraw / optionsQuantity) * 100 * 100) / 100,
      win: Math.round((win / optionsQuantity) * 100 * 100) / 100,
      lose: Math.round((lose / optionsQuantity) * 100 * 100) / 100,
      draw: Math.round((draw / optionsQuantity) * 100 * 100) / 100,
      homeGoalatHome,
      homeLoseAtHome,
      winAtHome: Math.round((winAtHome / homeMatches) * 100 * 100) / 100,
      loseAtHome: Math.round((loseAtHome / homeMatches) * 100 * 100) / 100,
      drawAtHome: Math.round((drawAtHome / homeMatches) * 100 * 100) / 100,
      winAndDrawAtHomeAverage:
        Math.round((winAndDrawAtHome / homeMatches) * 100 * 100) / 100,
    };
  }, [matchAnalysis, match, optionsQuantity]);

  const awayLastMatches = useMemo(() => {
    let winAtAway = 0;
    let drawAtAway = 0;
    let loseAtAway = 0;
    let awayMatches = 0;
    let awayGoalAtAway = 0;
    let awayLoseAtAway = 0;
    let homeGoal = 0;
    let homeLose = 0;
    let winAndDraw = 0;
    let win = 0;
    let draw = 0;
    let lose = 0;
    let winAndDrawAtAway = 0;
    matchAnalysis.awayLastMatches
      ?.slice(
        matchAnalysis.awayLastMatches?.length - optionsQuantity,
        matchAnalysis.awayLastMatches?.length
      )
      ?.forEach((item: any) => {
        const arrayAnalys = item.split(",");
        if (arrayAnalys[6] == match.awayName) {
          homeGoal += Number(arrayAnalys[8]);
          homeLose += Number(arrayAnalys[9]);
          if (arrayAnalys[8] > arrayAnalys[9]) {
            winAndDraw += 1;
            win += 1;
          } else if (arrayAnalys[8] < arrayAnalys[9]) {
            lose += 1;
          } else {
            winAndDraw += 1;
            draw += 1;
          }
        } else {
          homeGoal += Number(arrayAnalys[9]);
          homeLose += Number(arrayAnalys[8]);
          awayGoalAtAway += Number(arrayAnalys[9]);
          awayLoseAtAway += Number(arrayAnalys[8]);
          awayMatches += 1;
          if (arrayAnalys[9] > arrayAnalys[8]) {
            winAndDrawAtAway += 1;
            winAndDraw += 1;
            win += 1;
            winAtAway += 1;
          } else if (arrayAnalys[9] < arrayAnalys[8]) {
            lose += 1;
            loseAtAway += 1;
          } else {
            winAndDraw += 1;
            winAndDrawAtAway += 1;
            draw += 1;
            drawAtAway += 1;
          }
        }
      });

    return {
      homeGoal,
      homeLose,
      averageHavePoint:
        Math.round((winAndDraw / optionsQuantity) * 100 * 100) / 100,
      win: Math.round((win / optionsQuantity) * 100 * 100) / 100,
      lose: Math.round((lose / optionsQuantity) * 100 * 100) / 100,
      draw: Math.round((draw / optionsQuantity) * 100 * 100) / 100,
      awayGoalAtAway,
      awayLoseAtAway,
      winAtAway: Math.round((winAtAway / awayMatches) * 100 * 100) / 100,
      loseAtAway: Math.round((loseAtAway / awayMatches) * 100 * 100) / 100,
      drawAtAway: Math.round((drawAtAway / awayMatches) * 100 * 100) / 100,
      winAndDrawAtAwayAverage:
        Math.round((winAndDrawAtAway / awayMatches) * 100 * 100) / 100,
    };
  }, [matchAnalysis, match, optionsQuantity]);
  return (
    <div className="mt-12">
      <div className="mt-8 relative  px-6 py-2 flex items-start lg:items-center justify-between flex-col lg:flex-row gap-4 lg:gap-8">
        <div></div>
        <div className="flex-1 text-[20px] font-bold mb-4 text-center w-full lg:w-fit lg:absolute lg:left-[50%] lg:translate-x-[-50%]">
          So sánh số liệu
        </div>
        <select
          style={{ border: "1px solid rgba(0,0,0,0.4)" }}
          className="text-sm  py-1 px-2 outline-none rounded-[8px] mb-2"
          value={optionsQuantity as any}
          onChange={(e) => setOptionsQuantity(e?.target?.value as any)}
        >
          <option value={10}>10 trận gần nhất</option>
          <option value={20}>20 trận gần nhất</option>
        </select>
      </div>

      <div className="max-w-fit lg:max-w-full overflow-x-auto">
        <div className="bg-[#F1F1F1] text-[#BBB] flex items-stretch text-xs [&>div]:border-r w-fit lg:w-full">
          <div className="w-[100px] lg:w-[15%] text-center p-2 flex items-center justify-center">
            Đội bóng
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            Ghi
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            Mất
          </div>
          <div className="w-[50px] lg:w-[8%] text-center p-2 flex items-center justify-center">
            + / -
          </div>
          <div className="w-[50px] lg:w-[20%] text-center p-2 flex items-center justify-center">
            TB được điểm
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            T%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            H%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            B%
          </div>
          <div className="w-[50px] lg:w-[15%] text-center p-2 flex items-center justify-center">
            C/K
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            Ghi
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            Mất
          </div>
          <div className="w-[50px] lg:w-[8%] text-center p-2 flex items-center justify-center">
            + / -
          </div>
          <div className="w-[50px] lg:w-[20%] text-center p-2 flex items-center justify-center">
            TB được điểm
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            T%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            H%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            B%
          </div>
        </div>

        <div className="bg-white text-[#BBB] flex items-stretch text-xs [&>div]:border-r w-fit lg:w-full">
          <div className="bg-[#D86232] text-white w-[100px] lg:w-[15%] text-center p-2 flex items-center justify-center">
            {match?.homeName}
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.homeGoal}
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.homeLose}
          </div>
          <div className="w-[50px] lg:w-[8%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.homeGoal - homeLastMatches.homeLose}
          </div>
          <div className="w-[50px] lg:w-[20%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.averageHavePoint}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.win}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.draw}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.lose}%
          </div>
          <div className="w-[50px] lg:w-[15%] text-center p-2 flex items-center justify-center">
            Chủ
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.homeGoalatHome}
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.homeGoalatHome}
          </div>
          <div className="w-[50px] lg:w-[8%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.homeGoalatHome - homeLastMatches.homeLoseAtHome}
          </div>
          <div className="w-[50px] lg:w-[20%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.winAndDrawAtHomeAverage}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.winAtHome}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.drawAtHome}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {homeLastMatches.loseAtHome}%
          </div>
        </div>
        <div className="bg-white text-[#BBB] flex items-stretch text-xs [&>div]:border-r w-fit lg:w-full">
          <div className="bg-[#2D87D1] text-white w-[100px] lg:w-[15%] text-center p-2 flex items-center justify-center">
            {match?.awayName}
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.homeGoal}
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.homeLose}
          </div>
          <div className="w-[50px] lg:w-[8%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.homeGoal - awayLastMatches.homeLose}
          </div>
          <div className="w-[50px] lg:w-[20%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.averageHavePoint}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.win}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.draw}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.lose}%
          </div>
          <div className="w-[50px] lg:w-[15%] text-center p-2 flex items-center justify-center">
            Khách
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.awayGoalAtAway}
          </div>
          <div className="w-[50px] lg:w-[7%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.awayLoseAtAway}
          </div>
          <div className="w-[50px] lg:w-[8%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.awayGoalAtAway - awayLastMatches.awayLoseAtAway}
          </div>
          <div className="w-[50px] lg:w-[20%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.winAndDrawAtAwayAverage}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.winAtAway}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.drawAtAway}%
          </div>
          <div className="w-[50px] lg:w-[5%] text-center p-2 flex items-center justify-center">
            {awayLastMatches.loseAtAway}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareLastMatches;
