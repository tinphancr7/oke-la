import { getMatchById } from "@/apis/match";
import { ITip } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { BsFillDatabaseFill } from "react-icons/bs";
import { FaAdjust, FaAward, FaLightbulb } from "react-icons/fa";

function AnalyticsIncoming({ user, tips }: { user: any; tips: ITip[] }) {
  const [manners, setManners] = useState<any>([]);
  const checkWInLose = async (item: ITip) => {
    const result = await getMatchById(item?.matchId, "1");
    const match = result?.data?.match?.[0] || {};
    if (item?.odd?.choosen === "initialOver")
      return (match?.homeScore || 0) + Number(match?.awayScore || 0) >=
        Number(item?.odd?.initialHandicap)
        ? true
        : false;

    if (item?.odd?.choosen === "initialUnder")
      return (match?.homeScore || 0) + Number(match?.awayScore || 0) <
        Number(item?.odd?.initialHandicap)
        ? true
        : false;

    if (item?.odd?.choosen === "initialHome")
      return (match?.homeScore || 0) + Number(item?.odd?.initialHandicap) >
        (match?.awayScore || 0)
        ? true
        : false;

    if (item?.odd?.choosen === "initialAway")
      return (match?.awayScore || 0) + Number(item?.odd?.initialHandicap) >
        (match?.awayScore || 0)
        ? true
        : false;

    return false;
  };

  let totalTime = 0;
  user?.watched?.forEach((item: any) => {
    totalTime += Number(item?.total);
  });

  const setUserManner = async () => {
    try {
      const manners = await Promise.all(
        tips.map(async (item, index) => {
          try {
            const result = await checkWInLose(item);

            return {
              id: index,
              result: result == true ? "w" : "l",
            };
          } catch (error) {
            return {
              id: index,
              result: "l",
            };
          }
        })
      );

      setManners(manners);
    } catch (error) {
      setManners([]);
    }
  };

  useEffect(() => {
    setUserManner();
  }, []);

  return (
    <div className="col-span-12  lg:col-span-5 shadow h-full order-2 border relative">
      <div className="bg-secondary border-l-[20px] border-primary p-1 text-md font-bold text-white rounded-t-[4px] flex items-center justify-between">
        <div>PHONG ĐỘ SOI KÈO 15 TRẬN GẦN NHẤT</div>
      </div>

      <div className="flex items-start p-4 h-full">   
        {manners.map((manner, index: number) => {
          return (
            <div className="manner-table flex-1  h-[85%] border border-l-0 first:border-l last:border-r relative">
              {/* {manners[index - 1]?.result == "w" && manner.result == "l" && (
                <div className="cross-bar h-[113%] w-0 border-dashed border rotate-135 relative left-[-50%] top-[-7%]"></div>
              )}
              {manners[index - 1]?.result == "l" && manner.result == "w" && (
                <div className="cross-bar h-[113%] w-0 border-dashed border rotate-85 relative left-[-50%] top-[-7%]"></div>
              )} */}
              {manner.result == "w" ? (
                <img
                  src="/icons/Checkmark.png"
                  width={20}
                  height={20}
                  className="absolute top-[-10px] left-[-10px] z-10"
                />
              ) : (
                <img
                  src="/icons/Crossmark.png"
                  width={20}
                  height={20}
                  className="absolute top-[94%] left-[-10px] z-10"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnalyticsIncoming;
