import {axiosInstanceISport} from ".";

export const getLeagueAndSubLeage = (leagueName: string) =>
	axiosInstanceISport.get(`/country-league?leagueName=${leagueName}`);

export const getLeagueById = (leagueId: string) =>
	axiosInstanceISport.get(`/getLeagueById?leagueId=${leagueId}`);

export const getRankByLeague = (leagueId: string, leagueType: string) =>
	axiosInstanceISport.get(
		`getLeagueStandingByLeague?leagueId=${leagueId}&leagueType=${leagueType}`
	);

export const getLeagueHaveMatch = (date: string, type: string) =>
	axiosInstanceISport.get(`getLeagueHaveMatch?date=${date}&type=${type}`);

export const getOtherLeagues = () => axiosInstanceISport.get(`other-leagues`);
