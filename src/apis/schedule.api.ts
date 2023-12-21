import axios from "axios";
import {axiosInstanceISport} from ".";

const scheduleApi = {
	getSchedulesById: (id: string, date: string) => {
		return axiosInstanceISport.get(
			`/getScheduleAndResultByLeagueId?leagueId=${id}&date=${date}`
		);
	},

	getLiveMatches: (pageSize: number, pageIndex: number, home: boolean) => {
		return axiosInstanceISport.get(
			`/getPlayingMatches?pageSize=${pageSize}&pageIndex=${pageIndex}&home=${home}`
		);
	},

	getMatchById: (matchId: number) => {
		return axiosInstanceISport.get(
			`/getScheduleAndResultByMatchId?matchId=${matchId}`
		);
	},

	getEventByMatchId: (matchId: number) => {
		return axiosInstanceISport.get(`/getEventsByMatchId?matchId=${matchId}`);
	},

	getScheduleAndResultGroupBy: (pageSize: number, pageIndex: number) =>
		axiosInstanceISport.get(
			`/getScheduleAndResultGroupBy?pageSize=${pageSize}&pageIndex=${pageIndex}`
		),
	getPrematchAndInplayOddByMatchId: (matchId: number) =>
		axiosInstanceISport.get(
			`/getPrematchAndInplayOddByMatchId?matchId=${matchId}`
		),
	getPrematchAndInplayOdd: (matchId: number) =>
		axiosInstanceISport.get(`/getPrematchAndInplayOdd?matchId=${matchId}`),

	getCornerOddsPreMatch: (matchId: string) =>
		axiosInstanceISport.get(`/getCornerOddsPreMatch?matchId=${matchId}`),

	getCornerOddsInPlay: (matchId: string) =>
		axiosInstanceISport.get(`/getCornerOddsInPlay?matchId=${matchId}`),

	getScoreOddsPreMatch: (matchId: string) =>
		axiosInstanceISport.get(`/getScoreOddsPreMatch?matchId=${matchId}`),

	getScoreHalfTimeOddsPreMatch: (matchId: string) =>
		axiosInstanceISport.get(`/getScoreHalfTimeOddsPreMatch?matchId=${matchId}`),
};
export default scheduleApi;
