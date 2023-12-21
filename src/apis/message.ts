import { axiosInstanceAuth, axiosInstanceNonAuth } from ".";

export const getMessagesHome = (pageIndex: number, pageSize: number) =>
  axiosInstanceNonAuth.get(
    `/message/message-home?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );

export const getMessagesRoom = (roomId: string) =>
  axiosInstanceNonAuth.get(`/message/message-room?roomId=${roomId}`);
