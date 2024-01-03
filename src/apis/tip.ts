import {axiosInstanceAuth, axiosInstanceNonAuth} from ".";

export const getPagingTips = (pageIndex: number, pageSize: number) =>
	axiosInstanceNonAuth.get(
		`/tips/get-tips?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);

export const getTipBySlug = (slug: string) => {
	return axiosInstanceNonAuth.get(`/tips?slug=${slug}`);
};

export const getUserForTip = (userId: string) =>
	axiosInstanceNonAuth.get(`/users/tips/${userId}`);

export const getTipByUserOrGroup = (userId: string) =>
	axiosInstanceNonAuth.get(`/tips/get-tips-by-user-or-group/${userId}`);

export const getMyTip = (pageSize = 5, pageIndex = 1) =>
	axiosInstanceAuth.get(
		`/tips/get-my-tips?pageSize=${pageSize}&pageIndex=${pageIndex}`
	);

export const createComment = (data: {content: string; tip: string}) =>
	axiosInstanceAuth.post("/comment", data);
export const likeTip = (tipId: string) =>
	axiosInstanceAuth.post("/react/like", {tip: tipId});
export const disLikeTip = (tipId: string) =>
	axiosInstanceAuth.post("/react/dislike", {tip: tipId});

export const getPaggingGroup = (
	pageSize: number,
	pageIndex: number,
	groupId?: string
) => {
	let url = `/group/get-paging?pageIndex=${pageIndex}&pageSize=${pageSize}`;
	if (groupId) {
		url += `&groupId=${groupId}`;
	}
	return axiosInstanceNonAuth.get(url);
};

export const joinGroup = (groupId: string) =>
	axiosInstanceAuth.post("/group/join", {groupId});

export const leaveGroup = (groupId: string) =>
	axiosInstanceAuth.post("/group/leave", {groupId});

export const getDetailGroup = (groupId: string) =>
	axiosInstanceAuth.get(`/group/${groupId}`);

export const getMemberGroup = (groupId: string) =>
	axiosInstanceNonAuth.get(`/group/member/${groupId}`);

export const getTipsByMatchId = (matchId: string) =>
	axiosInstanceNonAuth.get(`/tips/get-tips-by-match/${matchId}`);

export const createTip = (data: any) => axiosInstanceAuth.post("/tips", data);
export const getTipsFollowByUSer = (pageIndex: number, pageSize: number) =>
	axiosInstanceAuth.get(
		`/react/tips-by-user?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);
