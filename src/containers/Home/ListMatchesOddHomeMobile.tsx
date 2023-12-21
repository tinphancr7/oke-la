import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconCaretDown from "@/components/icons/CaretDown";
import IconChartLine from "@/components/icons/ChartLine";
import IconCornerKick from "@/components/icons/CornerKick";
import IconFlag from "@/components/icons/Flag";
import IconLive from "@/components/icons/Live";
import IconStar from "@/components/icons/Star";
import IconTShirt from "@/components/icons/TShirt";
import LiveMatchTime from "@/components/renderLiveMatchTime";
import { AuthContext } from "@/context/AuthContext";
import { IMatch } from "@/interfaces";
import {
  convertStringOddToArray,
  convertToOdd,
  isPlayingMatches,
} from "@/utils";
import moment from "moment";
import Link from "next/link";
import React, { useContext } from "react";
import { AiFillStar } from "react-icons/ai";

const compareStringFloatOdds = (initial: any, instant: any) => {
  if (initial !== undefined) {
    let a = parseFloat(initial).toFixed(2);
    let b = parseFloat(instant).toFixed(2);
    if (a > b) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <div className="oddDowns">{instant} </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
          >
            <path
              d="M4 6L0.535899 -6.52533e-07L7.4641 -4.68497e-08L4 6Z"
              fill="#D41115"
            />
          </svg>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            {instant}{" "}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
          >
            <path d="M4 0L7.4641 6L0.535898 6L4 0Z" fill="#31823F" />
          </svg>
        </div>
      );
    }
  }
};

interface IMatchWithOdds extends IMatch {
  handicap: string;
  overUnder: string;
  europeOdds: string;
}

type Props = {
  item: any;
  isGroup?: boolean;
  handleLikeLeague: (e: any) => void;
  handleUnLikeLeague: (e: any) => void;
  handleLikeMatch: (e: any) => void;
  handleUnLikeMatch: (e: any) => void;
  handleNavigate: (url: string, e: any) => void;
};

function ListMatchesOddHomeMobile({
  item,
  handleLikeLeague,
  handleUnLikeLeague,
  handleLikeMatch,
  handleUnLikeMatch,
  handleNavigate,
  isGroup = true,
}: Props) {
  const { user } = useContext(AuthContext);

  return (
    <div className="lg:hidden">
      <div className="bg-secondary px-4 py-2 border-b-2 border-primary text-white text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-[50%] max-w-[50%]">
          {user?.leagues?.includes(item?._id) ? (
            <ButtonOnlyIcon onClick={() => handleUnLikeLeague(item?._id)}>
              <AiFillStar color={"#FF3849"} size={18} />
            </ButtonOnlyIcon>
          ) : (
            <ButtonOnlyIcon onClick={() => handleLikeLeague(item?._id)}>
              <IconStar color="#ffffff" size="18" />
            </ButtonOnlyIcon>
          )}
          <div className="truncate">
            {item?.leagueName}{" "}
            {isGroup ? `(${item?.listMatches?.length || 0})` : null}
          </div>
        </div>
        <div className="w-[20%] text-right font-semibold text-xs">
          Cược chấp
        </div>
        <div className="w-[20%] text-right font-semibold text-xs">Tài xỉu</div>
        <div className="w-[10%] text-right font-semibold text-xs">1X2</div>
      </div>

      {(isGroup ? item?.listMatches : [item])?.map((match: IMatchWithOdds) => (
        <div
          className="px-2 py-4 bg-[#F4F5F6] border-b-2 border-[#DFDFDF]"
          key={item?._id}
        >
          <div className="flex items-stretch gap-x-2">
            <div className="flex items-center gap-x-2 max-w-[50%] min-w-[50%]">
              <div className="text-xs text-center">
                <div className="text-xs">
                  {moment(match?.matchTime * 1000).format("HH:mm")}
                </div>
                {match?.status == -1 ? (
                  <div>Hết</div>
                ) : isPlayingMatches(match?.status) ? (
                  <div className="mt-1">
                    <LiveMatchTime match={match} />
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between text-[10px] font-semibold">
                  <div className="flex items-center gap-1">
                    <img
                      width={16}
                      height={16}
                      src={match?.homeIcon || "/images/no-image-logo-team.png"}
                      alt=""
                    />
                    <div>{match?.homeName}</div>
                  </div>

                  <div>{match?.status === 0 ? "-" : match?.homeScore}</div>
                </div>

                <div className="flex items-center justify-between text-[10px] mt-2 font-semibold">
                  <div className="flex items-center gap-1">
                    <img
                      width={16}
                      height={16}
                      src={match?.awayIcon || "/images/no-image-logo-team.png"}
                      alt=""
                    />
                    <div>{match?.awayName}</div>
                  </div>

                  <div>{match?.status === 0 ? "-" : match?.homeScore}</div>
                </div>

                <div className="text-[10px] mt-2 ml-[20px]">Hòa</div>
              </div>
            </div>

            {/* cược chấp */}
            <div className="w-[20%] text-[10px] font-semibold">
              <div className="bg-[#EDEDED] py-[2px] px-[4px] flex items-center justify-between w-full mt-[2px]">
                <div>
                  {Number(convertStringOddToArray(match?.handicap)?.[5]) >= 0
                    ? convertToOdd(
                        convertStringOddToArray(match?.handicap)?.[5]
                      )
                    : ""}
                </div>

                <div className="font-bold">
                  {convertStringOddToArray(match?.handicap)?.[6]
                    ? compareStringFloatOdds(
                        convertStringOddToArray(match?.handicap)?.[3],
                        convertStringOddToArray(match?.handicap)?.[6]
                      )
                    : "-"}
                </div>
              </div>

              <div className="bg-[#EDEDED] py-[2px] px-[4px] flex items-center justify-between w-full mt-2">
                <div>
                  {Number(convertStringOddToArray(match?.handicap)?.[5]) < 0
                    ? convertToOdd(
                        convertStringOddToArray(match?.handicap)?.[5]
                      )
                    : ""}
                </div>

                <div className="font-bold">
                  {convertStringOddToArray(match?.handicap)?.[7]
                    ? compareStringFloatOdds(
                        convertStringOddToArray(match?.handicap)?.[4],
                        convertStringOddToArray(match?.handicap)?.[7]
                      )
                    : "-"}
                </div>
              </div>
            </div>

            {/* tài xỉu */}
            <div className="w-[20%] text-[10px] font-semibold">
              <div className="bg-[#EDEDED] py-[2px] px-[4px] flex items-center justify-between w-full mt-[2px]">
                <div>
                  {Number(convertStringOddToArray(match?.overUnder)?.[5]) >= 0
                    ? convertToOdd(
                        convertStringOddToArray(match?.overUnder)?.[5]
                      )
                    : ""}
                </div>

                <div className="font-bold">
                  {convertStringOddToArray(match?.overUnder)?.[6]
                    ? compareStringFloatOdds(
                        convertStringOddToArray(match?.overUnder)?.[3],
                        convertStringOddToArray(match?.overUnder)?.[6]
                      )
                    : "-"}
                </div>
              </div>

              <div className="bg-[#EDEDED] py-[2px] px-[4px] flex items-center justify-between w-full mt-2">
                <div>u</div>

                <div className="font-bold">
                  {convertStringOddToArray(match?.overUnder)?.[7]
                    ? compareStringFloatOdds(
                        convertStringOddToArray(match?.overUnder)?.[4],
                        convertStringOddToArray(match?.overUnder)?.[7]
                      )
                    : "-"}
                </div>
              </div>
            </div>

            {/* 1x2 */}
            <div className="w-[10%] text-[10px] font-semibold">
              <div className="bg-[#EDEDED] py-[2px] px-[4px] text-right w-full mt-[2px]">
                {convertStringOddToArray(match?.europeOdds)?.[5]
                  ? compareStringFloatOdds(
                      convertStringOddToArray(match?.europeOdds)?.[2],
                      convertStringOddToArray(match?.europeOdds)?.[5]
                    )
                  : "-"}
              </div>

              <div className="bg-[#EDEDED] py-[2px] px-[4px] text-right w-full mt-2">
                {convertStringOddToArray(match?.europeOdds)?.[6]
                  ? compareStringFloatOdds(
                      convertStringOddToArray(match?.europeOdds)?.[3],
                      convertStringOddToArray(match?.europeOdds)?.[6]
                    )
                  : "-"}
              </div>

              <div className="bg-[#EDEDED] py-[2px] px-[4px] text-right w-full mt-2">
                {convertStringOddToArray(match?.europeOdds)?.[7]
                  ? compareStringFloatOdds(
                      convertStringOddToArray(match?.europeOdds)?.[4],
                      convertStringOddToArray(match?.europeOdds)?.[7]
                    )
                  : "-"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListMatchesOddHomeMobile;
