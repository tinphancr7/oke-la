import { IMatch, ITip } from "@/interfaces";
import Link from "next/link";
import React, { useCallback } from "react";
import ImageWithFallback from "../imageWithFallback";
import { BiMessage } from "react-icons/bi";

type Props = {
  match: IMatch;
  tip: ITip;
  matchAnalysis: any;
};

function TipMatchItem({ match, tip, matchAnalysis }: Props) {
  console.log("matchAnalysis", matchAnalysis);

  const genH2H = useCallback(
    (type: "home" | "away") => {
      const listMatches = [];
      for (let i = 0; i < matchAnalysis?.headToHead?.length; i++) {
        let item = matchAnalysis?.headToHead?.[i]?.split(",");

        listMatches.push({
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

      const W = (
        <img className="w-[18px] h-[18px]" src="/icons/Checkmark.png" alt="" />
      );

      const L = (
        <img className="w-[18px] h-[18px]" src="/icons/Crossmark.png" alt="" />
      );

      const D = (
        <div className="min-w-[16px] max-h-[16px] bg-gray-600 text-white rounded-full font-bold text-base flex items-center justify-center leading-1">
          -
        </div>
      );

      const O = (
        <div className="min-w-[20px] max-h-[20px] min-h-[20px] bg-green-600 text-white rounded-full font-bold text-xs flex items-center justify-center leading-1">
          T
        </div>
      );

      const U = (
        <div className="min-w-[20px] max-h-[20px] min-h-[20px] bg-red-500 text-white rounded-full font-bold text-xs flex items-center justify-center leading-1">
          X
        </div>
      );

      const result: any[] = [];
      const resultOU: any[] = [];
      listMatches
        ?.sort((a, b) => b?.matchTime - a?.matchTime)
        ?.slice(0, 6)
        ?.forEach((item) => {
          if (type === "home") {
            result.push(
              item?.scoreHome > item?.scoreAway
                ? W
                : item?.scoreHome < item?.scoreAway
                ? L
                : D
            );
          } else {
            result.push(
              item?.scoreHome > item?.scoreAway
                ? L
                : item?.scoreHome < item?.scoreAway
                ? W
                : D
            );
          }

          resultOU.push(
            item?.scoreHome + item?.scoreAway >= item?.initialTotal ? O : U
          );
        });

      return {
        h2h: result,
        ou: resultOU,
      };
    },
    [matchAnalysis]
  );

  const genWinLose = () => {
    if (tip?.odd?.choosen === "initialOver")
      return (match?.homeScore || 0) + Number(match?.awayScore || 0) >=
        Number(tip?.odd?.initialHandicap)
        ? "Thắng"
        : "Thua";

    if (tip?.odd?.choosen === "initialUnder")
      return (match?.homeScore || 0) + Number(match?.awayScore || 0) <
        Number(tip?.odd?.initialHandicap)
        ? "Thắng"
        : "Thua";

    if (tip?.odd?.choosen === "initialHome")
      return (match?.homeScore || 0) + Number(tip?.odd?.initialHandicap) * -1 >
        (match?.awayScore || 0)
        ? "Thắng"
        : "Thua";

    if (tip?.odd?.choosen === "initialAway")
      return (match?.awayScore || 0) + Number(tip?.odd?.initialHandicap) >
        (match?.awayScore || 0)
        ? "Thắng"
        : "Thua";

    return null;
  };

  const genOddHDP = (odd: any) => {
    let title = "";
    let oddTitle: any = "";

    if (odd?.type === 0) {
      title = "Kèo Châu Á";
      if (odd?.choosen?.includes("Home")) {
        oddTitle =
          // @ts-ignore
          (match?.homeName as string) +
          " (" +
          (Number(odd?.initialHandicap) > 0
            ? `-${Number(odd?.initialHandicap)}`
            : `+${Number(odd?.initialHandicap * -1)}`) +
          ")";
      } else {
        oddTitle =
          // @ts-ignore
          (match?.awayName as string) +
          " (" +
          (Number(odd?.initialHandicap) < 0
            ? `${Number(odd?.initialHandicap)}`
            : `+${Number(odd?.initialHandicap)}`) +
          ")";
      }
    } else {
      title = "Kèo tài xỉu";
      if (odd?.choosen?.includes("Over")) {
        oddTitle = "Tài" + ` (${odd?.initialHandicap})`;
      } else {
        oddTitle = "Xỉu" + ` (${odd?.initialHandicap})`;
      }
    }
    return { title, oddTitle };
  };

  return (
    <div className="p-4 bg-white rounded-[4px] mb-4">
      <div>
        <span className="font-semibold text-base">Nhận định: </span>
        <span className="text-sm">{tip?.title}. </span>
        <Link href={"/tips" + tip?.slug} className="text-sm text-[#0038FF]">
          [Tiếp]
        </Link>
      </div>

      <div className="flex mt-4 items-center justify-between">
        <div>
          <div className="flex items-center gap-x-2 mt-2">
            <div className="font-bold text-[14px]">
              {genOddHDP(tip?.odd)?.title}:
            </div>
            <div className="border bg-red-600 text-white rounded-[4px] text-xs px-2 py-1 font-semibold">
              {genOddHDP(tip?.odd)?.oddTitle}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start lg:items-center justify-between flex-col lg:flex-row">
        {tip?.odd?.choosen?.includes("Home") ||
        tip?.odd?.choosen?.includes("Away") ? (
          <div className="flex items-stretch gap-4">
            <div className="min-h-full flex items-center">
              <ImageWithFallback
                className="w-[48px] h-[48px] rounded-full"
                src={
                  tip?.odd?.choosen?.includes("Home")
                    ? match?.homeIcon
                    : match?.awayIcon
                }
                alt=""
              />
            </div>
            <div>
              <div className="font-bold text-base">
                {tip?.odd?.choosen?.includes("Home")
                  ? match?.homeName
                  : match?.awayName}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    key={index}
                  >
                    <path
                      d="M15.2897 12.3863C15.1986 12.4663 15.131 12.5694 15.0938 12.6848C15.0567 12.8001 15.0515 12.9234 15.0788 13.0415L16.2014 17.9024C16.2311 18.0293 16.2227 18.1622 16.1774 18.2845C16.1321 18.4067 16.0518 18.5129 15.9465 18.5898C15.8413 18.6668 15.7157 18.711 15.5855 18.7171C15.4552 18.7232 15.3261 18.6908 15.2141 18.6239L10.971 16.0498C10.8679 15.9871 10.7496 15.954 10.6289 15.954C10.5082 15.954 10.3899 15.9871 10.2868 16.0498L6.04367 18.6239C5.93171 18.6908 5.80257 18.7232 5.67233 18.7171C5.54209 18.711 5.41652 18.6668 5.31126 18.5898C5.206 18.5129 5.1257 18.4067 5.08038 18.2845C5.03505 18.1622 5.0267 18.0293 5.05637 17.9024L6.17902 13.0415C6.2063 12.9234 6.2011 12.8001 6.16397 12.6848C6.12683 12.5694 6.05915 12.4663 5.9681 12.3863L2.22236 9.11884C2.12222 9.03373 2.04958 8.92083 2.01362 8.79441C1.97767 8.668 1.98002 8.53377 2.02038 8.40869C2.06074 8.28362 2.13729 8.17333 2.24035 8.09177C2.34341 8.01021 2.46834 7.96106 2.59935 7.95053L7.53665 7.52373C7.65711 7.513 7.77235 7.46959 7.86995 7.39818C7.96755 7.32677 8.04381 7.23007 8.0905 7.11852L10.0194 2.52166C10.0709 2.40281 10.1561 2.30162 10.2644 2.23054C10.3727 2.15945 10.4994 2.12158 10.6289 2.12158C10.7584 2.12158 10.8851 2.15945 10.9934 2.23054C11.1017 2.30162 11.1869 2.40281 11.2384 2.52166L13.1673 7.11852C13.214 7.23007 13.2902 7.32677 13.3878 7.39818C13.4854 7.46959 13.6007 7.513 13.7211 7.52373L18.6585 7.95053C18.7895 7.96106 18.9144 8.01021 19.0175 8.09177C19.1205 8.17333 19.1971 8.28362 19.2374 8.40869C19.2778 8.53377 19.2801 8.668 19.2442 8.79441C19.2082 8.92083 19.1356 9.03373 19.0354 9.11884L15.2897 12.3863Z"
                      fill="#FFA800"
                    />
                    <path
                      d="M19.862 8.2C19.7815 7.95205 19.6299 7.73324 19.426 7.57082C19.2221 7.40841 18.9749 7.30957 18.7152 7.28661L13.7837 6.86147L11.8507 2.26461C11.75 2.0234 11.5803 1.81737 11.3628 1.67245C11.1453 1.52752 10.8898 1.4502 10.6284 1.4502C10.367 1.4502 10.1115 1.52752 9.89401 1.67245C9.67651 1.81737 9.50675 2.0234 9.4061 2.26461L7.47885 6.86147L2.54154 7.2891C2.28084 7.31101 2.03241 7.4094 1.8274 7.57193C1.62239 7.73447 1.46994 7.95392 1.38915 8.20275C1.30836 8.45159 1.30284 8.71874 1.37327 8.9707C1.44371 9.22266 1.58697 9.44822 1.78509 9.61908L5.53083 12.8924L4.40818 17.7533C4.34882 18.0076 4.36576 18.2739 4.45688 18.5187C4.548 18.7635 4.70927 18.976 4.92051 19.1296C5.13175 19.2833 5.3836 19.3712 5.64456 19.3825C5.90553 19.3938 6.16403 19.3279 6.38776 19.1931L10.6226 16.619L14.8665 19.1931C15.0903 19.3279 15.3488 19.3938 15.6097 19.3825C15.8707 19.3712 16.1225 19.2833 16.3338 19.1296C16.545 18.976 16.7063 18.7635 16.7974 18.5187C16.8885 18.2739 16.9055 18.0076 16.8461 17.7533L15.7243 12.8874L19.4692 9.61908C19.6673 9.44763 19.8103 9.22143 19.8802 8.96893C19.95 8.71643 19.9437 8.44891 19.862 8.2ZM18.5982 8.61518L14.8532 11.8835C14.671 12.042 14.5354 12.2472 14.4611 12.4771C14.3867 12.707 14.3765 12.9527 14.4314 13.188L15.5566 18.0572L11.3159 15.4831C11.109 15.3571 10.8715 15.2904 10.6292 15.2904C10.387 15.2904 10.1494 15.3571 9.94251 15.4831L5.70769 18.0572L6.82535 13.1913C6.88028 12.956 6.87003 12.7103 6.79571 12.4804C6.72138 12.2506 6.5858 12.0453 6.40353 11.8868L2.65696 8.62016C2.65666 8.61768 2.65666 8.61517 2.65696 8.61269L7.5926 8.18589C7.83358 8.16465 8.06417 8.07802 8.25953 7.93535C8.45488 7.79267 8.60757 7.59937 8.70113 7.37629L10.6284 2.78524L12.5548 7.37629C12.6484 7.59937 12.8011 7.79267 12.9964 7.93535C13.1918 8.07802 13.4224 8.16465 13.6633 8.18589L18.5998 8.61269C18.5998 8.61269 18.5998 8.61767 18.5998 8.6185L18.5982 8.61518Z"
                      fill="#FFA800"
                    />
                  </svg>
                ))}
              </div>

              <div className="flex items-center gap-1 mt-1">
                {genH2H(
                  tip?.odd?.choosen?.includes("Home") ? "home" : "away"
                )?.h2h?.map((item, index: number) => (
                  <React.Fragment key={index}>{item}</React.Fragment>
                ))}
              </div>
            </div>
            <div className="min-w-[1px] min-h-full bg-gray-300"></div>
            <div className="text-sm flex flex-col justify-center">
              <div>
                <span className="text-secondary-light">Tips: </span>
                <span className="font-semibold">40</span>
              </div>

              <div>
                <span className="text-secondary-light">Win: </span>
                <span className="font-semibold">34%</span>
              </div>

              <div>
                <span className="text-secondary-light">Tips: </span>
                <span className="font-semibold text-green-500">99</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-stretch gap-4">
            <div className="flex flex-col justify-center flex-1">
              <div className="flex items-center gap-2 lg:gap-4 truncate">
                <div className="font-bold text-sm lg:text-base">{match?.homeName}</div>
                <div className="font-bold text-sm lg:text-lg text-secondary">VS</div>
                <div className="font-bold text-sm lg:text-base text-right">
                  {match?.awayName}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    key={index}
                  >
                    <path
                      d="M15.2897 12.3863C15.1986 12.4663 15.131 12.5694 15.0938 12.6848C15.0567 12.8001 15.0515 12.9234 15.0788 13.0415L16.2014 17.9024C16.2311 18.0293 16.2227 18.1622 16.1774 18.2845C16.1321 18.4067 16.0518 18.5129 15.9465 18.5898C15.8413 18.6668 15.7157 18.711 15.5855 18.7171C15.4552 18.7232 15.3261 18.6908 15.2141 18.6239L10.971 16.0498C10.8679 15.9871 10.7496 15.954 10.6289 15.954C10.5082 15.954 10.3899 15.9871 10.2868 16.0498L6.04367 18.6239C5.93171 18.6908 5.80257 18.7232 5.67233 18.7171C5.54209 18.711 5.41652 18.6668 5.31126 18.5898C5.206 18.5129 5.1257 18.4067 5.08038 18.2845C5.03505 18.1622 5.0267 18.0293 5.05637 17.9024L6.17902 13.0415C6.2063 12.9234 6.2011 12.8001 6.16397 12.6848C6.12683 12.5694 6.05915 12.4663 5.9681 12.3863L2.22236 9.11884C2.12222 9.03373 2.04958 8.92083 2.01362 8.79441C1.97767 8.668 1.98002 8.53377 2.02038 8.40869C2.06074 8.28362 2.13729 8.17333 2.24035 8.09177C2.34341 8.01021 2.46834 7.96106 2.59935 7.95053L7.53665 7.52373C7.65711 7.513 7.77235 7.46959 7.86995 7.39818C7.96755 7.32677 8.04381 7.23007 8.0905 7.11852L10.0194 2.52166C10.0709 2.40281 10.1561 2.30162 10.2644 2.23054C10.3727 2.15945 10.4994 2.12158 10.6289 2.12158C10.7584 2.12158 10.8851 2.15945 10.9934 2.23054C11.1017 2.30162 11.1869 2.40281 11.2384 2.52166L13.1673 7.11852C13.214 7.23007 13.2902 7.32677 13.3878 7.39818C13.4854 7.46959 13.6007 7.513 13.7211 7.52373L18.6585 7.95053C18.7895 7.96106 18.9144 8.01021 19.0175 8.09177C19.1205 8.17333 19.1971 8.28362 19.2374 8.40869C19.2778 8.53377 19.2801 8.668 19.2442 8.79441C19.2082 8.92083 19.1356 9.03373 19.0354 9.11884L15.2897 12.3863Z"
                      fill="#FFA800"
                    />
                    <path
                      d="M19.862 8.2C19.7815 7.95205 19.6299 7.73324 19.426 7.57082C19.2221 7.40841 18.9749 7.30957 18.7152 7.28661L13.7837 6.86147L11.8507 2.26461C11.75 2.0234 11.5803 1.81737 11.3628 1.67245C11.1453 1.52752 10.8898 1.4502 10.6284 1.4502C10.367 1.4502 10.1115 1.52752 9.89401 1.67245C9.67651 1.81737 9.50675 2.0234 9.4061 2.26461L7.47885 6.86147L2.54154 7.2891C2.28084 7.31101 2.03241 7.4094 1.8274 7.57193C1.62239 7.73447 1.46994 7.95392 1.38915 8.20275C1.30836 8.45159 1.30284 8.71874 1.37327 8.9707C1.44371 9.22266 1.58697 9.44822 1.78509 9.61908L5.53083 12.8924L4.40818 17.7533C4.34882 18.0076 4.36576 18.2739 4.45688 18.5187C4.548 18.7635 4.70927 18.976 4.92051 19.1296C5.13175 19.2833 5.3836 19.3712 5.64456 19.3825C5.90553 19.3938 6.16403 19.3279 6.38776 19.1931L10.6226 16.619L14.8665 19.1931C15.0903 19.3279 15.3488 19.3938 15.6097 19.3825C15.8707 19.3712 16.1225 19.2833 16.3338 19.1296C16.545 18.976 16.7063 18.7635 16.7974 18.5187C16.8885 18.2739 16.9055 18.0076 16.8461 17.7533L15.7243 12.8874L19.4692 9.61908C19.6673 9.44763 19.8103 9.22143 19.8802 8.96893C19.95 8.71643 19.9437 8.44891 19.862 8.2ZM18.5982 8.61518L14.8532 11.8835C14.671 12.042 14.5354 12.2472 14.4611 12.4771C14.3867 12.707 14.3765 12.9527 14.4314 13.188L15.5566 18.0572L11.3159 15.4831C11.109 15.3571 10.8715 15.2904 10.6292 15.2904C10.387 15.2904 10.1494 15.3571 9.94251 15.4831L5.70769 18.0572L6.82535 13.1913C6.88028 12.956 6.87003 12.7103 6.79571 12.4804C6.72138 12.2506 6.5858 12.0453 6.40353 11.8868L2.65696 8.62016C2.65666 8.61768 2.65666 8.61517 2.65696 8.61269L7.5926 8.18589C7.83358 8.16465 8.06417 8.07802 8.25953 7.93535C8.45488 7.79267 8.60757 7.59937 8.70113 7.37629L10.6284 2.78524L12.5548 7.37629C12.6484 7.59937 12.8011 7.79267 12.9964 7.93535C13.1918 8.07802 13.4224 8.16465 13.6633 8.18589L18.5998 8.61269C18.5998 8.61269 18.5998 8.61767 18.5998 8.6185L18.5982 8.61518Z"
                      fill="#FFA800"
                    />
                  </svg>
                ))}
              </div>
              <div className="flex items-center justify-start gap-1 mt-1">
                {genH2H("home")?.ou?.map((item, index: number) => (
                  <React.Fragment key={index}>{item}</React.Fragment>
                ))}
              </div>
            </div>

            <div className="min-w-[1px] min-h-full bg-gray-300"></div>
            <div className="text-sm flex flex-col justify-center flex-1">
              <div>
                <span className="text-secondary-light">Tips: </span>
                <span className="font-semibold">40</span>
              </div>

              <div>
                <span className="text-secondary-light">Win: </span>
                <span className="font-semibold">34%</span>
              </div>

              <div>
                <span className="text-secondary-light">Tips: </span>
                <span className="font-semibold text-green-500">99</span>
              </div>
            </div>
          </div>
        )}

        {/*  */}
        <div className="flex flex-col justify-end w-full lg:w-fit lg:block">
          <div className="mb-4 text-right">
            {genWinLose() && (
              <div
                className={`px-2 py-[3px] text-xs font-semibold text-white ${
                  genWinLose() === "Thắng" ? "bg-[#44f272]" : "bg-[#E62F2B]"
                } inline rounded-[4px]`}
              >
                {genWinLose()}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link href={`/tips/${tip?.slug}`}>
              <button className="border border-secondary text-secondary rounded-[4px] text-xs px-2 py-1 font-semibold">
                XEM TIPS
              </button>
            </Link>
            <Link href={`/truc-tiep/${match?.matchId}`}>
              <button className="border border-secondary text-secondary rounded-[4px] text-xs px-2 py-1 font-semibold">
                TRẬN ĐẤU
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2 text-xs font-semibold mt-4">
            <img className="w-[14px] h-[14px]" src="/icons/eye.png" />
            <span>{(tip?.view as number) || 0}</span>
            <img className="w-[14px] h-[14px]" src="/icons/like.png" />
            <span>{(tip?.like as number) || 0}</span>
            <BiMessage className="w-[14px] h-[14px]" />
            <span>{(tip?.comment as number) || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TipMatchItem;
