import { axiosInstanceAuth, axiosInstanceNonAuth } from ".";

export const getVoteByMatchId = (matchId: string) =>
  axiosInstanceNonAuth.get(`/vote/${matchId}`);

export const vote = (data: any) => axiosInstanceAuth.put(`/vote`, data);

export const unVote = (matchId: string) =>
  axiosInstanceAuth.delete(`/vote/${matchId}`);
