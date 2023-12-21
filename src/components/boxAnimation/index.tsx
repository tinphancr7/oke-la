import { getMatchAnalysis } from "@/apis/match";
import { URL_AMINATION } from "@/constant";
import { IHotMatch, IMatch } from "@/interfaces";
import { useEffect, useState } from "react";
import GoalLose from "../GoalLose";
import PreviousMatch from "../previousMatch";

interface IMatchWithOdds extends IMatch {
  handicap: string;
  overUnder: string;
}
const BoxAnimation = ({
  match,
  matchAnalysis,
}: {
  match: IMatchWithOdds;
  matchAnalysis: any;
}) => {
  const [analysis, setAnalysis] = useState<any>();
  const [tabs, setTabs] = useState(1);
  const getMatchAnalysisByMatch = async () => {
    try {
      const analysys = await getMatchAnalysis(match?.matchId);
      setAnalysis(analysys.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMatchAnalysisByMatch();
  }, []);
  return (
    <div className="flex absolute w-[1200px] top-[100%] right-[0%] z-10 shadow-xl box-animation">
      <div className="w-[50%]">
        <iframe
          src={`${URL_AMINATION}?matchId=${match?.matchId}&accessKey=tEFL6ClbFnfkvmEn0xspIVQyPV9jAz9u&lang=vi&statsPanel=hide`}
          width="100%"
          height="100%"
        />
      </div>
      <div className="w-[50%] bg-white">
        <div className="p-3 flex justify-center border-b-2 ">
          <div
            className={`${
              tabs == 1 ? `bg-secondary text-white` : "text-black"
            } py-1 px-8  cursor-pointer `}
            style={{ border: "1px solid #A95E01" }}
            onClick={() => setTabs(1)}
          >
            Ghi/Mất
          </div>
          <div
            className={`${
              tabs == 2 ? `bg-secondary text-white` : "text-black"
            } py-1 px-8  cursor-pointer border-[#A95E01]`}
            style={{ border: "1px solid #A95E01" }}
            onClick={() => setTabs(2)}
          >
            Phong độ
          </div>
        </div>
        <div>
          {tabs == 1 ? (
            <GoalLose analysis={analysis?.[0]} />
          ) : (
            <PreviousMatch analysis={analysis?.[0]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BoxAnimation;
