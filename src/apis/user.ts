import {axiosInstanceAuth, axiosInstanceNonAuth} from ".";

export const login = (userData: any) =>
	axiosInstanceNonAuth.post("/users/login", userData);

export const register = (data: any) =>
	axiosInstanceNonAuth.post("/users/signup", data);

export const receiveMoney = (userId: string, body: any) =>
	axiosInstanceAuth.put(`/users/receive-money/${userId}`, body);
export const receivedPromotion = (body: any) =>
	axiosInstanceAuth.post("/promotions", body);
export const getAllPromotions = () => axiosInstanceAuth.get("/promotions");
export const getMe = (userId: string) =>
	axiosInstanceAuth.put(`/users/${userId}`);

export const fowllow = (fowllowerId: string) =>
	axiosInstanceAuth.put(`/users/fowllow/${fowllowerId}`);

export const unFowllow = (fowllowerId: string) =>
	axiosInstanceAuth.put(`/users/unfowllow/${fowllowerId}`);

export const likeMatch = (matchId: string) =>
	axiosInstanceAuth.put(`/users/like-match/${matchId}`);

export const unLikeMatch = (matchId: string) =>
	axiosInstanceAuth.put(`/users/unlike-match/${matchId}`);

export const likeLeague = (leagueId: string) =>
	axiosInstanceAuth.put(`/users/like-league/${leagueId}`);

export const unlikeLeague = (leagueId: string) =>
	axiosInstanceAuth.put(`/users/unlike-league/${leagueId}`);
export const getRankTable = () => axiosInstanceNonAuth.get(`/users/rank`);
export const getRankUsers = (type: string) =>
	axiosInstanceNonAuth.post(`/rank-users/get-rank-user`, {type});

export const getUserInfo = (username: string) => {
	return axiosInstanceNonAuth.get(`/users/get-by-username/${username}`);
};

export const changePassword = (password: string, newPassword: string) =>
	axiosInstanceAuth.put(`/users/change-password`, {password, newPassword});

export const changeEmail = (password: string, email: string) =>
	axiosInstanceAuth.put(`/users/change-email`, {password, email});

export const getFollowingUsers = () => {
	return axiosInstanceAuth.get("/users/get-following-user");
};

export const getGroupByUsers = () => {
	return axiosInstanceAuth.get("/group/get-user-group");
};
export const getFavouriteLeagueByUser = (user: string) => {
	return axiosInstanceNonAuth.get(
		`/users/get-favourite-league-by-username/${user}`
	);
};

export const uploadAvatar = (data: any) => {
	return axiosInstanceAuth.post(`/users/upload-avatar`, data);
};
