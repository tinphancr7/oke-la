import {axiosInstanceISport} from ".";

export const getTeamsByLeagueId = (leagueId: string) => {
	return axiosInstanceISport.get(`/teamprofiles?leagueId=${leagueId}`);
};
