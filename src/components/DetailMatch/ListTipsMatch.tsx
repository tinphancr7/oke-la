import { getTipsByMatchId } from "@/apis/tip";
import { IMatch, ITip } from "@/interfaces";
import React, { useEffect, useState } from "react";
import TipMatchItem from "./TipMatchItem";

type Props = {
  match: IMatch;
  matchAnalysis: any;
};

function ListTipsMatch({ match, matchAnalysis }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [tips, setTips] = useState<ITip[]>([]);

  const getTips = async (matchId: string) => {
    try {
      setIsLoading(true);
      const result = await getTipsByMatchId(matchId);
      setTips(result.data?.result || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (match?.matchId) {
      getTips(match?.matchId);
    }
  }, [match]);

  return (
    <div className="mt-4">
      {tips?.map((item) => (
        <TipMatchItem
          match={match}
          tip={item}
          key={item?._id}
          matchAnalysis={matchAnalysis}
        />
      ))}
    </div>
  );
}

export default ListTipsMatch;
