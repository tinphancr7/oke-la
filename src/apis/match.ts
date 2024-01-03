import {axiosInstanceISport, axiosInstanceISportAuth} from ".";

export const getPlayingMatchGroupLeague = (
	pageIndex: number,
	pageSize: number,
	date: string,
	search: string
) =>
	axiosInstanceISportAuth.get(
		`/getPlayingMatchesGroupLeague?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${date}&search=${search}`
	);

export const getMatchesByDate = (
	pageIndex: number,
	pageSize: number,
	date: string
) =>
	axiosInstanceISport.get(
		`/getScheduleAndResultByDate?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${date}`
	);

export const getMatchesByDateWithOdds = (
	pageIndex: number,
	pageSize: number,
	date: string
) =>
	axiosInstanceISport.get(
		`/getScheduleAndResultByDateWithOdd?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${date}`
	);

export const getMatchesByDateWithOddsSlide = (
	pageIndex: number,
	pageSize: number,
	date: string
) =>
	axiosInstanceISport.get(
		`/getScheduleAndResultByDateWithOddSlide?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${date}`
	);
export const getMatchesByDateWithOddsGroupLeague = (
	pageIndex: number,
	pageSize: number,
	date: string,
	search: string = ""
) =>
	axiosInstanceISport.get(
		`/getScheduleAndResultByDateWithOddGroupLeague?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${date}&search=${search}`
	);

export const getMatchesByDateGroupLeague = (
	pageIndex: number,
	pageSize: number,
	date: string,
	search: string = ""
) =>
	axiosInstanceISportAuth.get(
		`/getScheduleAndResultByDateGroupLeague?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${date}&search=${search}`
	);
export const getMatchesByDateGroupRateLeague = (
	pageIndex: number,
	pageSize: number,
	date: string,
	search: string = ""
) =>
	axiosInstanceISportAuth.get(
		`/getScheduleAndResultByDateGroupRateLeague?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${date}&search=${search}`
	);

export const getHotMatchesGroupLeague = (
	pageIndex: number,
	pageSize: number,
	leagueId: string = "",
	round: string = "",
	search: string = "",
	showBy: string = ""
) =>
	axiosInstanceISport.get(
		`/getHotMatchesGroupLeague?pageIndex=${pageIndex}&pageSize=${pageSize}&leagueId=${leagueId}&round=${round}&search=${search}&showBy=${showBy}`
	);

export const getFinishedMatchesGroupLeague = (
	pageIndex: number,
	pageSize: number,
	date: string,
	search: string = "",
	leagueId: string = "",
	round: string = "",
	showBy: string = ""
) =>
	axiosInstanceISportAuth.get(
		`/getFinishedMatchesGroupLeague?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${date}&leagueId=${leagueId}&round=${round}&search=${search}&showBy=${showBy}`
	);

export const getUpcomingMatchesGroupLeague = (
	pageIndex: number,
	pageSize: number,
	date: string,
	search: string = "",
	leagueId: string = "",
	round: string = "",
	showBy: string = ""
) =>
	axiosInstanceISportAuth.get(
		`/getUpcomingMatchesGroupLeague?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${date}&leagueId=${leagueId}&round=${round}&search=${search}&showBy=${showBy}`
	);

export const getCentralPointMatches = (
	pageIndex = 1,
	pageSize = 10,
	today = ""
) => {
	return axiosInstanceISport.get(
		`/getCentralPointMatches?pageIndex=${pageIndex}&pageSize=${pageSize}&today=${today}`
	);
};

export const getHotMatch = (pageIndex = 1, pageSize = 10, today = "") => {
	return axiosInstanceISport.get(
		`/getHotMatches?pageIndex=${pageIndex}&pageSize=${pageSize}&today=${today}`
	);
};

export const getPlayingMatches = (pageSize: number, pageIndex: number) => {
	return axiosInstanceISport.get(
		`/getPlayingMatches?pageSize=${pageSize}&pageIndex=${pageIndex}`
	);
};

export const getMatchById = (matchId: string, isOnlyMatch = "") => {
	return axiosInstanceISport.get(
		`/getScheduleAndResultByMatchId?matchId=${matchId}&isOnlyMatch=${isOnlyMatch}`
	);
};
// export const getMatchById = (matchId: string) => {
// 	return axiosInstanceISport.get(
// 		`/liveScoreByMatch/${matchId}`
// 	);
// };

export const getMatchTheSport = () => {
	return axiosInstanceISport.get(`/getMatchTheSport`);
};

export const getStatsByMatchId = async (matchId: string) => {
	try {
		const response = await axiosInstanceISport.get(
			`/getLiveDataStatByMatchId?matchId=${matchId}`
		);

		return response.data?.[0] || {};
	} catch (error) {
		throw error;
	}
};

export const getEvent = (matchId: string, date?: string) => {
	let url = `/getEventsByMatchId?matchId=${matchId}`;
	if (date) {
		url += `&date=${date}`;
	}
	return axiosInstanceISport.get(url);
};
export const getHotMatches = (pageIndex: number, pageSize: number) =>
	axiosInstanceISport.get(
		`/getHotMatches?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);

export const getMatchAnalysis = (matchId: string) => {
	return axiosInstanceISport.get(`/matchAnalysis?matchId=${matchId}`);
};

export const getMatchAnalysisAll = (matchId: string) => {
	return axiosInstanceISport.get(`/matchAnalysis?matchId=${matchId}`);
};

export const getMatchAnalysisGroupLeague = (matchId: string) => {
	return axiosInstanceISport.get(
		`/getMatchAnalysisGroupLeague?matchId=${matchId}`
	);
};

export const getLineUpById = (matchId: string) => {
	return axiosInstanceISport.get(`/getLineUpV3?matchId=${matchId}`);
};

export const getHotMatchesGroupLeagueAuth = (
	pageIndex: number,
	pageSize: number,
	search: string,
	leagueId: string = "",
	round: string = "",
	showBy: string = ""
) =>
	axiosInstanceISportAuth.get(
		`/getHotMatchesGroupLeague?pageIndex=${pageIndex}&pageSize=${pageSize}&leagueId=${leagueId}&round=${round}&search=${search}&showBy=${showBy}`
	);

export const getMatchesByLeagueAndRound = (
	pageIndex: number,
	pageSize: number,
	leagueId: string = "",
	round: string = ""
) =>
	axiosInstanceISportAuth.get(
		`/getMatchesByLeagueAndRound?pageIndex=${pageIndex}&pageSize=${pageSize}&leagueId=${leagueId}&round=${round}`
	);

export const getLeagueStanding = async (
	leagueId: string,
	subLeagueId: string
) => {
	try {
		const response = await axiosInstanceISport.get(
			`/leagueStandings?leagueId=${leagueId}&subLeagueId=${subLeagueId}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getComparison1X2 = async (matchId: number) => {
	try {
		const result = await axiosInstanceISport.get(
			`/getEuropeanOdds?matchId=${matchId}`
		);

		return result.data?.[0] || {};
	} catch (error) {
		throw error;
	}
};
