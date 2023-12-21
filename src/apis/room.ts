import { axiosInstanceNonAuth } from ".";

export const getRoomByMatchId = (matchId: string) =>
  axiosInstanceNonAuth.get(`/chat/get-room-by-match/${matchId}`);
