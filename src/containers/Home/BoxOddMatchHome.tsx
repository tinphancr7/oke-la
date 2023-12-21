import { getMatchOdds } from "@/apis/odd";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import { IMatch } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IMatchWithOdds extends IMatch {
  handicap: string;
  overUnder: string;
  europeOdds: string;
  handicapSecond?: string;
  overUnderSecond?: string;
  europeOddsSecond?: string;
}
type Props = {
  show: boolean;
  match: IMatchWithOdds;
  onClose: () => void;
};

function BoxOddMatchHome({ show, match, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [odds, setOdds] = useState();
  const getOddsByMatchId = async () => {
    try {
      setLoading(true);
      const result = await getMatchOdds(match?.matchId);
      setOdds(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const convertStringOddToArray = (str: string = "") => {
    return str?.split(",");
  };

  useEffect(() => {
    if (show) {
      getOddsByMatchId();
    }
  }, [match, show]);

  const LoadingComp = () => {
    return (
      <div
        className={`ood-match-home p-2 z-50 rounded-lg shadow ${
          show ? "show" : ""
        }`}
      >
        <div className="px-2 flex items-center justify-between">
          <div
            className="text-sm px-2 rounded-md py-1 text-white font-semibold"
            style={{ background: match?.leagueColor || "transparent" }}
          >
            {match?.leagueShortName}
          </div>

          <div className="flex items-center gap-x-2">
            <div className="font-semibold text-sm">{match?.homeName}</div>
            <div className="font-bold text-md">VS</div>
            <div className="font-semibold text-sm">{match?.awayName}</div>
          </div>

          <ButtonOnlyIcon
            onClick={onClose}
            wrapperClassName="bg-light p-1 rounded-full text-black text-lg"
          >
            <RiCloseLine />
          </ButtonOnlyIcon>
        </div>

        <div>
          <table border={1} className="w-full table-odd-home mt-4">
            <thead>
              <tr>
                <th></th>
                <th colSpan={4}>
                  <Skeleton />
                </th>
                <th colSpan={4}>
                  <Skeleton />
                </th>
                <th colSpan={4}>
                  <Skeleton />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <Skeleton />
                  </div>
                </td>
                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <Skeleton />
                  </div>
                </td>
                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <Skeleton />
                  </div>
                </td>
                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
            </tbody>
          </table>

          <table border={1} className="w-full table-odd-home mt-4">
            <thead>
              <tr>
                <th></th>
                <th colSpan={4}>
                  <Skeleton />
                </th>
                <th colSpan={4}>
                  <Skeleton />
                </th>
                <th colSpan={4}>
                  <Skeleton />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <Skeleton />
                  </div>
                </td>
                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <Skeleton />
                  </div>
                </td>
                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <Skeleton />
                  </div>
                </td>
                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>

                <td>
                  <Skeleton />
                </td>
                <td colSpan={2}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  return loading ? (
    <LoadingComp />
  ) : (
    <div
      className={`ood-match-home p-2 rounded-lg shadow ${show ? "show" : ""}`}
    >
      <div className="px-2 flex items-center justify-between">
        <div
          className="text-sm px-2 rounded-md py-1 text-white font-semibold"
          style={{ background: match?.leagueColor || "transparent" }}
        >
          {match?.leagueShortName}
        </div>

        <div className="flex items-center gap-x-2">
          <div className="font-semibold text-sm">{match?.homeName}</div>
          <div className="font-bold text-md">VS</div>
          <div className="font-semibold text-sm">{match?.awayName}</div>
        </div>

        <ButtonOnlyIcon
          onClick={onClose}
          wrapperClassName="bg-light p-1 rounded-full text-black text-lg"
        >
          <RiCloseLine />
        </ButtonOnlyIcon>
      </div>

      <div>
        <table border={1} className="w-full table-odd-home mt-4">
          <thead>
            <tr>
              <th></th>
              <th colSpan={4}>Running (FT)</th>
              <th colSpan={4}>TL (FT)</th>
              <th colSpan={4}>Sớm (FT)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>HDP</div>
              </td>
              <td>
                {convertStringOddToArray(match?.handicap)?.[6]
                  ? convertStringOddToArray(match?.handicap)?.[6]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.handicap)?.[5]}
              </td>
              <td>
                {convertStringOddToArray(match?.handicap)?.[7]
                  ? convertStringOddToArray(match?.handicap)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.handicap)?.[6]
                  ? convertStringOddToArray(match?.handicap)?.[6]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.handicap)?.[5]}
              </td>
              <td>
                {convertStringOddToArray(match?.handicap)?.[7]
                  ? convertStringOddToArray(match?.handicap)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.handicap)?.[3]
                  ? convertStringOddToArray(match?.handicap)?.[3]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.handicap)?.[2]}
              </td>
              <td>
                {convertStringOddToArray(match?.overUnder)?.[4]
                  ? convertStringOddToArray(match?.overUnder)?.[4]
                  : "-"}
              </td>
            </tr>
            <tr>
              <td>
                <div>T/X</div>
              </td>
              <td>
                {convertStringOddToArray(match?.overUnder)?.[6]
                  ? convertStringOddToArray(match?.overUnder)?.[6]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.overUnder)?.[5] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.overUnder)?.[7]
                  ? convertStringOddToArray(match?.overUnder)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.overUnder)?.[6]
                  ? convertStringOddToArray(match?.overUnder)?.[6]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.overUnder)?.[5] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.overUnder)?.[7]
                  ? convertStringOddToArray(match?.overUnder)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.overUnder)?.[3]
                  ? convertStringOddToArray(match?.overUnder)?.[3]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.overUnder)?.[2] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.overUnder)?.[4]
                  ? convertStringOddToArray(match?.overUnder)?.[4]
                  : "-"}
              </td>
            </tr>
            <tr>
              <td>
                <div>1x2</div>
              </td>
              <td>
                {convertStringOddToArray(match?.europeOdds)?.[5]
                  ? convertStringOddToArray(match?.europeOdds)?.[5]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.europeOdds)?.[6] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.europeOdds)?.[7]
                  ? convertStringOddToArray(match?.europeOdds)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.europeOdds)?.[5]
                  ? convertStringOddToArray(match?.europeOdds)?.[5]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.europeOdds)?.[6] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.europeOdds)?.[7]
                  ? convertStringOddToArray(match?.europeOdds)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.europeOdds)?.[3]
                  ? convertStringOddToArray(match?.europeOdds)?.[3]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.europeOdds)?.[3] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.europeOdds)?.[4]
                  ? convertStringOddToArray(match?.europeOdds)?.[4]
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>

        <table border={1} className="w-full table-odd-home mt-4">
          <thead>
            <tr>
              <th></th>
              <th colSpan={4}>Running (FT)</th>
              <th colSpan={4}>TL (FT)</th>
              <th colSpan={4}>Sớm (FT)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>HDP</div>
              </td>
              <td>
                {convertStringOddToArray(match?.handicapSecond)?.[6]
                  ? convertStringOddToArray(match?.handicapSecond)?.[6]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.handicapSecond)?.[5]}
              </td>
              <td>
                {convertStringOddToArray(match?.handicapSecond)?.[7]
                  ? convertStringOddToArray(match?.handicapSecond)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.handicapSecond)?.[6]
                  ? convertStringOddToArray(match?.handicapSecond)?.[6]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.handicapSecond)?.[5]}
              </td>
              <td>
                {convertStringOddToArray(match?.handicapSecond)?.[7]
                  ? convertStringOddToArray(match?.handicapSecond)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.handicapSecond)?.[3]
                  ? convertStringOddToArray(match?.handicapSecond)?.[3]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.handicapSecond)?.[2]}
              </td>
              <td>
                {convertStringOddToArray(match?.overUnderSecond)?.[4]
                  ? convertStringOddToArray(match?.overUnderSecond)?.[4]
                  : "-"}
              </td>
            </tr>
            <tr>
              <td>
                <div>T/X</div>
              </td>
              <td>
                {convertStringOddToArray(match?.overUnderSecond)?.[6]
                  ? convertStringOddToArray(match?.overUnderSecond)?.[6]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.overUnderSecond)?.[5] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.overUnderSecond)?.[7]
                  ? convertStringOddToArray(match?.overUnderSecond)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.overUnderSecond)?.[6]
                  ? convertStringOddToArray(match?.overUnderSecond)?.[6]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.overUnderSecond)?.[5] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.overUnderSecond)?.[7]
                  ? convertStringOddToArray(match?.overUnderSecond)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.overUnderSecond)?.[3]
                  ? convertStringOddToArray(match?.overUnderSecond)?.[3]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.overUnderSecond)?.[2] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.overUnderSecond)?.[4]
                  ? convertStringOddToArray(match?.overUnderSecond)?.[4]
                  : "-"}
              </td>
            </tr>
            <tr>
              <td>
                <div>1x2</div>
              </td>
              <td>
                {convertStringOddToArray(match?.europeOddsSecond)?.[5]
                  ? convertStringOddToArray(match?.europeOddsSecond)?.[5]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.europeOddsSecond)?.[6] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.europeOddsSecond)?.[7]
                  ? convertStringOddToArray(match?.europeOddsSecond)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.europeOddsSecond)?.[5]
                  ? convertStringOddToArray(match?.europeOddsSecond)?.[5]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.europeOddsSecond)?.[6] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.europeOddsSecond)?.[7]
                  ? convertStringOddToArray(match?.europeOddsSecond)?.[7]
                  : "-"}
              </td>

              <td>
                {convertStringOddToArray(match?.europeOddsSecond)?.[3]
                  ? convertStringOddToArray(match?.europeOddsSecond)?.[3]
                  : "-"}
              </td>
              <td colSpan={2}>
                {convertStringOddToArray(match?.europeOddsSecond)?.[3] || "-"}
              </td>
              <td>
                {convertStringOddToArray(match?.europeOddsSecond)?.[4]
                  ? convertStringOddToArray(match?.europeOddsSecond)?.[4]
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BoxOddMatchHome;
