import jwtDecode from "jwt-decode";

const expiredSession = () => {
	localStorage.removeItem("authUser");
	localStorage.removeItem("accessToken");
};

const getTokenFromLocastorage = () => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		return JSON.parse(token);
	} else {
		return null;
	}
};

const saveTokenToLocalStorage = (token: string) => {
	localStorage.setItem("accessToken", JSON.stringify(token));
};
const reverseString = (str: string): any => {
	return str === "" || str === undefined
		? ""
		: reverseString(str.substr(1)) + str.charAt(0);
};

const removeTokenFromLocalstorage = () => {
	localStorage.removeItem("accessToken");
};

const renderStatus = (status: number) => {
	if ([1, 2, 3, 4].includes(status)) {
		return "Đang trực tiếp";
	} else if (status == 0) {
		return "Sắp diễn ra";
	} else if (status == -1) {
		return "Đã kết thúc";
	}
};

const isPlayingMatches = (status: number) => {
	if ([1, 2, 3, 4, 5].includes(status)) {
		return true;
	} else {
		return false;
	}
};

const convertStringOddToArray = (str: string) => {
	return str?.split(",");
};

const generateMatchTime = (
	matchTime: number,
	status: number,
	halfStartTime: number
) => {
	const time = new Date().setTime(matchTime * 1000);
	const dateNow = new Date();
	if (status == 1) {
		const diff = Math.abs(
			new Date(dateNow).getTime() - new Date(time).getTime()
		);
		const result = Math.floor(diff / 1000 / 60);
		if (result > 45) return `${45}+`;
		return `${result}`;
	} else if (status == 3) {
		const halfTime = new Date().setTime(halfStartTime * 1000);
		const diff = Math.abs(
			new Date(dateNow).getTime() - new Date(halfTime).getTime()
		);
		const result = Math.floor(diff / 1000 / 60) + 45;
		if (result > 90) return `${90}+`;
		return `${result}`;
	} else if (status == 2) {
		return "HT";
	} else if (status == 4) {
		return "ET";
	} else if (status == 5) {
		return "Penalty";
	} else {
		return "";
	}
};

const formatKMBT = (n: number) => {
	if (n < 1e3) return n;
	if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
	if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
	if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
	if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

const converToTheSportId = (id: string) => {
	return reverseString(id?.toString().slice(1, 8));
};

const convertToOdd = (number: string) => {
	let strString = "";
	let numberParse = Math.abs(Number(number));

	if (
		numberParse == 0.5 ||
		numberParse == 1.5 ||
		numberParse == 2.5 ||
		numberParse == 1 ||
		numberParse == 3.5
	) {
		return numberParse;
	}

	if (numberParse > 0 && numberParse < 0.5) {
		strString += "0/0.5";
		return strString;
	}

	if (numberParse > 0.5 && numberParse < 1) {
		strString += "0.5/1";
		return strString;
	}

	if (numberParse > 1 && numberParse < 1.5) {
		strString += "1/1.5";
		return strString;
	}

	if (numberParse > 1.5 && numberParse < 2) {
		strString += "1.5/2";
		return strString;
	}

	if (numberParse > 2 && numberParse < 2.5) {
		strString += "2/2.5";
		return strString;
	}

	if (numberParse > 2.5 && numberParse < 3) {
		strString += "2.5/3";
		return strString;
	}

	if (numberParse > 3 && numberParse < 3.5) {
		strString += "3/3.5";
		return strString;
	}

	if (numberParse > 3.5 && numberParse < 4) {
		strString += "3.5/4";
		return strString;
	}

	return number;
};

const convertToOdd1 = (number: string) => {
	let strString = "";
	let nte0 = Number(number) < 0;

	let numberParse = Math.abs(Number(number));

	if (
		numberParse == 0.5 ||
		numberParse == 1.5 ||
		numberParse == 2.5 ||
		numberParse == 1 ||
		numberParse == 3.5
	) {
		return (nte0 ? "-" : "") + numberParse;
	}

	if (numberParse > 0 && numberParse < 0.5) {
		strString += "0/0.5";
		return (nte0 ? "-" : "") + strString;
	}

	if (numberParse > 0.5 && numberParse < 1) {
		strString += "0.5/1";
		return (nte0 ? "-" : "") + strString;
	}

	if (numberParse > 1 && numberParse < 1.5) {
		strString += "1/1.5";
		return (nte0 ? "-" : "") + strString;
	}

	if (numberParse > 1.5 && numberParse < 2) {
		strString += "1.5/2";
		return (nte0 ? "-" : "") + strString;
	}

	if (numberParse > 2 && numberParse < 2.5) {
		strString += "2/2.5";
		return (nte0 ? "-" : "") + strString;
	}

	if (numberParse > 2.5 && numberParse < 3) {
		strString += "2.5/3";
		return (nte0 ? "-" : "") + strString;
	}

	if (numberParse > 3 && numberParse < 3.5) {
		strString += "3/3.5";
		return (nte0 ? "-" : "") + strString;
	}

	if (numberParse > 3.5 && numberParse < 4) {
		strString += "3.5/4";
		return (nte0 ? "-" : "") + strString;
	}

	return (nte0 ? "-" : "") + Math.abs(Number(number));
};
const checkExpireToken = (token: string) => {
	try {
		const decodedToken = jwtDecode<{exp: number; iat: number}>(token);

		if (decodedToken?.exp * 1000 < new Date().getTime()) {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("authUser");
			return false;
		}

		return true;
	} catch (error) {
		console.log(error);
		expiredSession();
	}
};

const EnterHelper = (key: any, run: any) => {
	if (key.keyCode === 13) {
		run();
	}
};

const genShortPlayerName = (name: string) => {
	let temp = name?.split(" ");

	if (temp?.length > 2) {
		temp = [temp?.[0], temp?.[temp?.length - 1]];
	}

	let result = "";

	for (let i = 0; i < temp?.length; i++) {
		if (i === temp?.length - 1) {
			result += " " + temp[i];
		} else result += temp[i]?.charAt(0) + ".";
	}

	return result;
};

const genDayOfWeekVietnamese = (value: string) => {
	switch (value) {
		case "Monday":
			return "T2";
		case "Tuesday":
			return "T3";
		case "Wednesday":
			return "T4";
		case "Thursday":
			return "T5";
		case "Friday":
			return "T6";
		case "Saturday":
			return "T7";
		case "Sunday":
			return "CN";

		default:
			return "";
	}
};

const isFavouriteLeague = (leagues: string[], leagueId: string) => {
	return leagues?.includes(leagueId);
};

export {
	converToTheSportId,
	getTokenFromLocastorage,
	saveTokenToLocalStorage,
	removeTokenFromLocalstorage,
	renderStatus,
	isPlayingMatches,
	formatKMBT,
	generateMatchTime,
	convertStringOddToArray,
	convertToOdd,
	checkExpireToken,
	expiredSession,
	EnterHelper,
	genShortPlayerName,
	genDayOfWeekVietnamese,
	isFavouriteLeague,
	convertToOdd1,
};
