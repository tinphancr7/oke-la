import {IMatchGroupLeague} from "@/interfaces";
import moment from "moment";

export const genDateToVietnamese = (date: string | Date) => {
	const value = new Date(date).getDay();

	switch (value) {
		case 0:
			return "Chủ nhật";

		case 1:
			return "Thứ hai";

		case 2:
			return "Thứ ba";

		case 3:
			return "Thứ tư";

		case 4:
			return "Thứ năm";

		case 5:
			return "Thứ sáu";

		case 6:
			return "Thứ bảy";

		default:
			return "";
	}
};

export const convertToRoundVietnamese = (str: string) => {
	switch (str) {
		case "Quarter-finals":
			return `Tứ kết`;

		case "Semi-finals":
			return "Bán kết";

		case "Final":
			return `Chung kết`;

		default:
			return str;
	}
};

// export const countWinLose = (analysis: string[]) => {
//   let home = {
//     win: 0,
//     draw: 0,
//     lose: 0,
//     winOneGoal: 0,
//     winMoreThanTwoGoal: 0,
//     loseOneGoal: 0,
//     loseMoreThanTwoGoal: 0,
//   };
//   let away = {
//     win: 0,
//     draw: 0,
//     lose: 0,
//     winOneGoal: 0,
//     winMoreThanTwoGoal: 0,
//     loseOneGoal: 0,
//     loseMoreThanTwoGoal: 0,
//   };
//   analysis?.map((item) => {
//     const stringToArray = item?.split(",");
//     const homeScore = stringToArray?.[8];
//     const awayScore = stringToArray?.[9];

//     if (homeScore > awayScore) {
//       home.win += 1;
//       away.lose += 1;
//     } else if (homeScore == awayScore) {
//       home.draw += 1;
//       away.draw += 1;
//     } else {
//       home.lose += 1;
//       away.win += 1;
//     }

//     if (Number(homeScore) - Number(awayScore) == 1) {
//       home.winOneGoal += 1;
//       away.loseOneGoal += 1;
//     }

//     if (Number(homeScore) - Number(awayScore) >= 2) {
//       home.winMoreThanTwoGoal += 1;
//       away.loseMoreThanTwoGoal += 1;
//     }

//     if (Number(homeScore) - Number(awayScore) == -1) {
//       home.loseOneGoal += 1;
//       away.winOneGoal += 1;
//     }

//     if (Number(homeScore) - Number(awayScore) <= -2) {
//       home.loseMoreThanTwoGoal += 1;
//       away.winMoreThanTwoGoal += 1;
//     }
//   });

//   return {
//     home,
//     away,
//   };
// };
export const countWinLose = (data: any) => {
	const teamStats: any = {};
	data?.length > 0 &&
		data.forEach((match: any) => {
			const homeTeam = match.split(",")[5];
			const awayTeam = match.split(",")[7];

			if (!teamStats[homeTeam]) {
				teamStats[homeTeam] = {
					homeWins: 0,
					homeDraws: 0,
					homeLosses: 0,
					awayWins: 0,
					awayDraws: 0,
					awayLosses: 0,
				};
			}
			if (!teamStats[awayTeam]) {
				teamStats[awayTeam] = {
					homeWins: 0,
					homeDraws: 0,
					homeLosses: 0,
					awayWins: 0,
					awayDraws: 0,
					awayLosses: 0,
				};
			}

			if (match.split(",")[8] > match.split(",")[9]) {
				teamStats[homeTeam].homeWins++;
				teamStats[awayTeam].awayLosses++;
			} else if (match.split(",")[8] < match.split(",")[9]) {
				teamStats[homeTeam].homeLosses++;
				teamStats[awayTeam].awayWins++;
			} else {
				teamStats[homeTeam].homeDraws++;
				teamStats[awayTeam].awayDraws++;
			}
		});

	return teamStats;
};
export const filterMatchesUndefinedIcon = (matches: IMatchGroupLeague[]) => {
	const result = matches
		?.map((item) => {
			const listMatchFilter = item.listMatches?.filter(
				(item) => item?.homeIcon && item?.awayIcon
			);

			return {
				...item,
				listMatches: listMatchFilter,
			};
		})
		.filter((item) => item.listMatches?.length > 0);

	return result;
};

export const genRound = (round_int: number, round: string) => {
	if (round_int) {
		return `Vòng ${round_int}`;
	}

	return convertToRoundVietnamese(round);
};

export const reverseDate = (date: string) => {
	const dateArray = date.split("-");

	return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
};

export const listChampionLeague = [4335, 4378, 4346, 4399, 4347];

const listColorStanding = [
	{
		id: 4335,
		first: [1, 2, 3, 4],
		second: [5],
		third: [6],
		fourth: [18, 19, 20],
	},
	{
		id: 4378,
		first: [1, 2, 3, 4],
		second: [5],
		third: [6],
		fourth: [18, 19, 20],
	},
	{
		id: 4346,
		first: [1, 2, 3, 4],
		second: [5],
		third: [6],
		fourth: [16],
		// xuống hạng thẳng
		firth: [17, 18],
	},
	{
		id: 4399,
		first: [1, 2, 3, 4],
		second: [5],
		third: [6],
		fourth: [18, 19, 20],
	},
	{
		id: 4347,
		first: [1, 2],
		second: [3],
		third: [4],
		fourth: [18],
		// xuống hạng thẳng
		firth: [19, 20],
		// Dự sơ loại Europa League
		sixth: [5],
	},
	{
		id: 4976,
		first: [1, 2, 3, 4, 5, 6, 7, 8],
		fourth: [9, 10, 11, 12, 13, 14],
	},
	{
		id: 4314,
		first: [1, 2],
		second: [3],
	},
	{
		id: 4584,
		first: [1, 2],
	},
];

export const renderColorStanding = (id: number, index: number) => {
	const temp = listColorStanding?.find((item) => item.id === id);
	let type = "";

	if (!temp)
		return {
			background: "#fff",
			color: "#000",
		};

	Object.entries(temp).forEach((item) => {
		const [key, value] = item;

		const list = ["first", "second", "third", "fourth", "firth", "sixth"];

		if (list.includes(key) && value?.find((e: any) => e === index)) type = key;
	});

	switch (type) {
		case "first":
			return {
				background: "#306EE5",
				color: "#fff",
			};

		case "second":
			return {
				background: "#33579C",
				color: "#fff",
			};

		case "third":
			return {
				background: "#2A374F",
				color: "#fff",
			};

		case "fourth":
			return {
				background: "#F34848",
				color: "#fff",
			};
		case "firth":
			return {
				background: "#C23E3E",
				color: "#fff",
			};

		case "sixth":
			return {
				background: "#9C3372",
				color: "#fff",
			};

		default:
			return {
				background: "#fff",
				color: "#000",
			};
	}
};

export const genPositionPlayer = (value: string) => {
	switch (value) {
		case "G":
			return `Thủ môn`;

		case "D":
			return `Hậu vệ`;

		case "M":
			return `Tiện vệ`;

		case "F":
			return `Tiền đạo`;

		default:
			return ``;
	}
};

export const formatDate = (item: any) => {
	const dateMoment = moment(item);
	const today = moment();
	if (dateMoment.isSame(today, "day")) {
		return `Hôm nay, ${dateMoment?.format("HH:mm")}`;
	} else if (dateMoment.isSame(today.clone().add(1, "day"), "day")) {
		return `Ngày mai, ${dateMoment?.format("HH:mm")}`;
	} else if (dateMoment.isSame(today.clone().add(-1, "day"), "day")) {
		return `Hôm qua`;
	} else {
		return `${genDateToVietnamese(item)}, ${moment(item).format("HH:mm")}`;
	}
};

export const getMatchStatus = (status: number) => {
	switch (status) {
		case 0:
			return "Chưa đá";
		case 1:
			return "H1";
		case 2:
			return "HT";
		case 3:
			return "H2";
		case 4:
			return "Hiệp Phụ";
		case 5:
			return "Penalty";
		case -1:
			return "FT";
		case -10:
			return "Hủy";
		case -11:
			return "Chưa xác định";
		case -12:
			return "Hủy";
		case -13:
			return "Gián đoạn";
		case -14:
			return "Hoãn";
	}
};

export const getStatsType = (eventCode: number) => {
	switch (eventCode) {
		case 0:
			return "Đá phạt đầu tiên";
		case 1:
			return "Góc đầu tiên";
		case 2:
			return "Thẻ vàng đầu tiên";
		case 3:
			return "Tổng số cú sút";
		case 4:
			return "Sút trúng đích";
		case 5:
			return "Vi phạm";
		case 6:
			return "Phạt Góc";
		case 7:
			return "Phạt Góc (Hiệp phụ)";
		case 8:
			return "Phạt góc";
		case 9:
			return "Việt vị";
		case 10:
			return "Phản lưới nhà";
		case 11:
			return "Thẻ vàng";
		case 12:
			return "Thẻ vàng (Hiệp phụ)";
		case 13:
			return "Thẻ đỏ";
		case 14:
			return "Tỷ lệ kiểm soát bóng%";
		case 15:
			return "Đánh đầu";
		case 16:
			return "Cứu thua";
		case 17:
			return "Thủ môn ra ngoài";
		case 18:
			return "Bị mất bóng";
		case 19:
			return "Chặn bóng thành công";
		case 20:
			return "Đối đầu";
		case 21:
			return "Đường chuyền dài";
		case 22:
			return "Đường chuyền ngắn";
		case 23:
			return "Kiến tạo";
		case 24:
			return "Tạo cơ hội thành công";
		case 25:
			return "Thay người đầu tiên";
		case 26:
			return "Thay người cuối cùng";
		case 27:
			return "Việt vị đầu tiên";
		case 28:
			return "Việt vị cuối cùng";
		case 29:
			return "Thay người";
		case 30:
			return "Góc cuối cùng";
		case 31:
			return "Thẻ vàng cuối cùng";
		case 32:
			return "Thay người (Hiệp phụ)";
		case 33:
			return "Việt vị (Hiệp phụ)";
		case 34:
			return "Sút chệch";
		case 35:
			return "Dọc cột";
		case 36:
			return "Đánh đầu thành công";
		case 37:
			return "Chặn cú sút";
		case 38:
			return "Cản bóng";
		case 39:
			return "Vượt qua đối thủ";
		case 40:
			return "Ném biên";
		case 41:
			return "Số lần chuyền";
		case 42:
			return "Tỷ lệ thành công chuyền%";
		case 43:
			return "Tấn công";
		case 44:
			return "Tấn công nguy hiểm";
		case 45:
			return "Phạt góc H1";
		case 46:
			return "Tỉ lệ kiểm soát bóng H1";
		case 47:
			return "Cứu thua penalty";
		default:
			break;
	}
};

export const getStatsTypeUse = [
	6, 7, 45, 11, 12, 13, 14, 3, 4, 34, 43, 44, 8, 46, 5, 9, 33, 16,
];

export const isDisplayScore = (status: number) => {
	const statusNotDisplay = [0, -10, -11, -12, -14];
	return !statusNotDisplay.includes(status);
};
