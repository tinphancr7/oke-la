import config from "@/config";
import {checkExpireToken, getTokenFromLocastorage} from "@/utils";
import axios from "axios";

const axiosInstanceNonAuth = axios.create({
	baseURL: config.API_URL,
});

const axiosInstanceAuth = axios.create({
	baseURL: config.API_URL,
});

const axiosInstanceISport = axios.create({
	baseURL: config.API_ISPORT_URL,
});
const axiosInstanceISportAuth = axios.create({
	baseURL: config.API_ISPORT_URL,
});

axiosInstanceISportAuth.interceptors.request.use((config) => {
	const token = getTokenFromLocastorage();
	config.headers.Authorization = `Bearer ${token}`;

	return config;
});

axiosInstanceAuth.interceptors.request.use((config) => {
	const token = getTokenFromLocastorage();
	const checkToken = checkExpireToken(token);
	if (checkToken) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export {
	axiosInstanceAuth,
	axiosInstanceNonAuth,
	axiosInstanceISport,
	axiosInstanceISportAuth,
};
