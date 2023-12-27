import moment from "moment";

const formatDate = (timestamp: number) => {
	// Convert timestamp to a Date object
	const date = new Date(timestamp * 1000); // Multiply by 1000 because JavaScript uses milliseconds, while Unix timestamps are in seconds

	// Format the time as "2:00 AM"
	const formattedTime = moment(date).format("h:mm A");

	// Format the date as "26.05.2023"
	const formattedDate = moment(date).format("DD.MM.YYYY");

	// Combine the formatted time and date
	const combinedFormat = `${formattedTime} | ${formattedDate}`;

	return combinedFormat;
};

const findTourName = (arr: any[], id: number) => {
	const tourName = arr.find((item: any) => item.id === id);
	return tourName;
};

const getLastElement = (str: string) => {
	const arrStr = str?.split("-");
	return arrStr[arrStr?.length - 1];
};
const formattedPrice = (price: number) => {
	return price.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&.");
};
const sortTopScore = (data: any) => {
	data?.sort((a: any, b: any) => b.goalsCount - a.goalsCount);
	let currentRank = 1;
	let currentGoalsCount = data[0]?.goalsCount;
	const newData = data?.map((player: any) => {
		if (player.goalsCount < currentGoalsCount) {
			currentRank++;
			currentGoalsCount = player.goalsCount;
		}

		return {
			top: currentRank,
			...player,
		};
	});
	return newData;
};
export {formatDate, findTourName, getLastElement, formattedPrice, sortTopScore};
