import {axiosInstanceISport} from ".";

const StatsApi = {
	getMatchStats: (matchId: string) => {
		return axiosInstanceISport.get(`/matchStats?matchId=${matchId}`);
	},
};
export default StatsApi;
