import { axiosInstanceISport } from ".";

export const getMatchOdds = async (matchId: string) => {
  return axiosInstanceISport(
    `/getPrematchAndInplayOddByMatchId?matchId=${matchId}`
  );
};

export const getCornerOddsPreMatch = async (matchId: string) => {
  return axiosInstanceISport(`/getCornerOddsPreMatch?matchId=${matchId}`);
};
