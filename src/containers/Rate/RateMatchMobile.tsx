import LiveMatchTime from "@/components/renderLiveMatchTime";
import { LOGO_DEFAULT } from "@/constant";
import {
  convertStringOddToArray,
  convertToOdd,
  isPlayingMatches,
} from "@/utils";
import moment from "moment";
import React from "react";

function RateMatchMobile({ league }: { league: any }) {
  return (
    <div className="bg-[#F4F5F6] p-2 md:p-4 font-semibold block lg:hidden border-b-2 last:border-b-0 border-[#DFDFDF]">
      <div className="flex items-center gap-x-4 text-xs">
        <div>
          {" "}
          {league?.status == 2
            ? "HT"
            : league?.status == -1
            ? "FT"
            : moment(league?.matchTime * 1000)?.format("HH:mm A")}
          {isPlayingMatches(league?.status) && <LiveMatchTime match={league} />}
        </div>
        <div className="text-sm">
          <div className="flex gap-x-2">
            <img
              width={20}
              height={20}
              src={league?.homeIcon || LOGO_DEFAULT}
              alt=""
            />

            <div>{league?.homeName}</div>
          </div>
          <div className="mt-1 flex gap-x-2">
            <img
              width={20}
              height={20}
              src={league?.awayIcon || LOGO_DEFAULT}
              alt=""
            />

            <div>{league?.awayName}</div>
          </div>
        </div>
      </div>
      <div className="mt-2 p-2 bg-white flex justify-between gap-1 text-[10px] sm:text-xs md:text-sm">
        {/* ty le */}
        <div className="[&>div]:mb-1 [&>div:last-child]:mb-0 flex-1">
          <div className="text-center">Tỷ lệ</div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div>
              {" "}
              {convertToOdd(convertStringOddToArray(league?.handicap)?.[5])}
            </div>
            <div>{convertStringOddToArray(league?.handicap)?.[6]}</div>
          </div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div></div>
            <div>{convertStringOddToArray(league?.handicap)?.[7]}</div>
          </div>
        </div>

        {/* Tai xiu */}
        <div className="[&>div]:mb-1 [&>div:last-child]:mb-0 flex-1">
          <div className="text-center">Tài xỉu</div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div>
              {" "}
              {convertToOdd(convertStringOddToArray(league?.overUnder)?.[5])}
            </div>
            <div>{convertStringOddToArray(league?.overUnder)?.[6]}</div>
          </div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div></div>
            <div>{convertStringOddToArray(league?.overUnder)?.[7]}</div>
          </div>
        </div>

        {/* 1x2 */}
        <div className="[&>div]:mb-1 [&>div:last-child]:mb-0 flex-1">
          <div className="text-center">1x2</div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div></div>
            <div>{convertStringOddToArray(league?.europeOdds)?.[5]}</div>
          </div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div></div>
            <div>{convertStringOddToArray(league?.europeOdds)?.[6]}</div>
          </div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div></div>
            <div>{convertStringOddToArray(league?.europeOdds)?.[7]}</div>
          </div>
        </div>

        {/* Ty le H1 */}
        <div className="[&>div]:mb-1 [&>div:last-child]:mb-0 flex-1">
          <div className="text-center">Tỷ lệ H1</div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div>
              {convertToOdd(convertStringOddToArray(league?.handicapHalf)?.[5])}
            </div>
            <div>{convertStringOddToArray(league?.handicapHalf)?.[6]}</div>
          </div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div></div>
            <div>{convertStringOddToArray(league?.handicapHalf)?.[7]}</div>
          </div>
        </div>

        {/* Tài xỉu H1 */}
        <div className="[&>div]:mb-1 [&>div:last-child]:mb-0 flex-1">
          <div className="text-center">Tài xỉu H1</div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div>
              {convertToOdd(
                convertStringOddToArray(league?.overUnderHalf)?.[5]
              )}
            </div>
            <div>{convertStringOddToArray(league?.overUnderHalf)?.[6]}</div>
          </div>
          <div className="p-1 bg-[#EDEDED] flex items-center justify-between">
            <div></div>
            <div>{convertStringOddToArray(league?.overUnderHalf)?.[7]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateMatchMobile;
