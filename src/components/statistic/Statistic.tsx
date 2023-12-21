import StatsApi from "@/apis/statistic.api";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {IoIosArrowForward} from "react-icons/io";
import {MdKeyboardDoubleArrowRight, MdOutlinePercent} from "react-icons/md";
const statistics = [
	{
		type: 3,
		title: "Số lần sút",
	},
	{
		type: 4,
		title: "Sút trúng đích",
	},
	{
		type: 5,
		title: "Phạm lỗi",
	},
	{
		type: 6,
		title: "Phạt góc",
	},
	{
		type: 8,
		title: "Phạt trực tiếp",
	},
	{
		type: 9,
		title: "Việt vị",
	},
	{
		type: 10,
		title: "Bàn phản lưới",
	},
	{
		type: 11,
		title: "Thẻ vàng",
	},
	{
		type: 13,
		title: "Thẻ đỏ",
	},
	{
		type: 14,
		title: "Tỷ lệ kiểm soát bóng %",
	},
	{
		type: 16,
		title: "Thủ môn Cứu thua",
	},
	{
		type: 41,
		title: "Lượt chuyền bóng",
	},
	{
		type: 42,
		title: "Tỷ lệ chuyền bóng chính xác %",
	},
];
const Statistic = ({matchId}: any) => {
	const [stats, setStats] = useState<any>(null);

	useEffect(() => {
		const getStats = async () => {
			const res = await StatsApi.getMatchStats(matchId);
			const newData: any = {};
			res?.data?.data?.stats?.forEach((item: any) => {
				newData[item.type] = item;
			});
			setStats(newData);
		};
		getStats();
	}, [matchId]);

	return (
		<div className="bg-[#F1F1F1] w-full p-2 lg:p-5 rounded-lg shadow-lg border  ">
			<div className="flex items-center justify-between lg:justify-center lg:gap-20">
				<div className="flex items-center justify-center flex-col gap-2">
					<span className="text-[#7D7D7D] font-semibold text-xs lg:text-sm">
						Tấn công
					</span>
					<div className="flex items-center gap-2">
						<span className="text-[#15C071] font-semibold text-sm">
							{stats?.[43]?.home}
						</span>
						<div
							className="w-12 h-12 rounded-full relative"
							style={{
								background: `conic-gradient(from 144deg, #15C071 ${(
									(Number(stats?.[43]?.home) /
										(Number(stats?.[43]?.home) + Number(stats?.[43]?.away))) *
									100
								).toFixed(2)}%,red ${(
									(Number(stats?.[43]?.away) /
										(Number(stats?.[43]?.home) + Number(stats?.[43]?.away))) *
									100
								).toFixed(2)}%`,
							}}
						>
							<div className="bg-[#E4E4E4] w-10 h-10 rounded-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
								<div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
									<IoIosArrowForward
										className="font-bold text-gray-600 "
										size="24"
									/>
								</div>
							</div>
						</div>
						<span className="text-[#E62F2B] font-semibold text-sm">
							{stats?.[43]?.away}
						</span>
					</div>
				</div>

				<div className="flex items-center justify-center flex-col gap-2">
					<span className="text-[#7D7D7D] font-semibold text-xs lg:text-sm">
						Đòn tấn công nguy hiểm
					</span>
					<div className="flex items-center gap-2">
						<span className="text-[#15C071] font-semibold text-sm">
							{stats?.[44]?.home}
						</span>
						<div
							className="w-12 h-12 rounded-full relative"
							style={{
								background: `conic-gradient(from 144deg, #15C071 ${(
									(Number(stats?.[44]?.home) /
										(Number(stats?.[44]?.home) + Number(stats?.[44]?.away))) *
									100
								).toFixed(2)}%, red ${(
									(Number(stats?.[44]?.away) /
										(Number(stats?.[44]?.home) + Number(stats?.[44]?.away))) *
									100
								).toFixed(2)}%`,
							}}
						>
							<div className="bg-[#E4E4E4] w-10 h-10 rounded-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
								<div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
									<MdKeyboardDoubleArrowRight
										className="font-bold text-gray-600 "
										size="24"
									/>
								</div>
							</div>
						</div>
						<span className="text-[#E62F2B] font-semibold text-sm">
							{stats?.[44]?.away}
						</span>
					</div>
				</div>

				<div className="flex items-center justify-center flex-col gap-2">
					<span className="text-[#7D7D7D] font-semibold text-xs lg:text-sm">
						Tỷ lệ sở hữu bóng
					</span>
					<div className="flex items-center gap-2">
						<span className="text-[#15C071] font-semibold text-sm">
							{stats?.[14]?.home}
						</span>
						{/* background: conic-gradient(from 0deg, red 70%, blue 30%); */}
						<div
							className="w-12 h-12 rounded-full relative"
							style={{
								background: `conic-gradient(from 144deg, #15C071 ${stats?.[14]?.home}, red ${stats?.[14]?.away})`,
							}}
						>
							<div className="bg-[#E4E4E4] w-10 h-10 rounded-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
								<div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
									<MdOutlinePercent
										className="font-bold text-gray-600 "
										size="24"
									/>
								</div>
							</div>
						</div>
						<span className="text-[#E62F2B] font-semibold text-sm">
							{stats?.[14]?.away}
						</span>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between lg:justify-center lg:gap-20 mt-5">
				<div className="flex items-center justify-center gap-1 lg:gap-8">
					<div className="flex flex-col items-center justify-center gap-1">
						<div className="w-6 h-6 lg:w-8 lg:h-8 relative">
							<Image
								src="/football-note/corner.png"
								fill
								alt=""
								className="object-contain"
							/>
						</div>
						<span>{stats?.[6]?.home}</span>
					</div>
					<div className="flex flex-col items-center justify-center gap-1">
						<div className="w-6 h-6 lg:w-8 lg:h-8 relative">
							<Image
								src="/football-note/yellow-card.svg"
								fill
								alt=""
								className="object-contain"
							/>
						</div>
						<span> {stats?.[11]?.home}</span>
					</div>
					<div className="flex flex-col items-center justify-center gap-1">
						<div className="w-6 h-6 lg:w-8 lg:h-8 relative">
							<Image
								src="/football-note/red-card.svg"
								fill
								alt=""
								className="object-contain"
							/>
						</div>
						<span>{stats?.[13]?.home || 0}</span>
					</div>
				</div>
				<div>
					<div className="flex items-center justify-center flex-col">
						<span className="text-xs lg:text-base font-semibold text-[#7D7D7D]">
							Sút trúng khung thành
						</span>

						<div className="flex items-center gap-2">
							<span className=" text-sm lg:text-lg font-semibold">
								{stats?.[4]?.home}
							</span>
							<div className="bg-gray-400 h-2 w-[150px] lg:w-[300px] rounded-full relative flex items-center">
								<div
									className="bg-[#15C071] h-2  rounded-full flex items-center absolute top-0 left-0  "
									style={{
										width: `${
											(Number(stats?.[4]?.home) /
												(Number(stats?.[4]?.home) + Number(stats?.[4]?.away))) *
											100
										}%`,
									}}
								></div>

								<div
									className="bg-red-500 h-2  rounded-full flex items-center absolute top-0 right-0  "
									style={{
										width: `${
											(Number(stats?.[4]?.away) /
												(Number(stats?.[4]?.home) + Number(stats?.[4]?.away))) *
											100
										}%`,
									}}
								></div>
							</div>
							<span className=" text-sm lg:text-lg font-semibold">
								{stats?.[4]?.away}
							</span>
						</div>
					</div>
					<div className="flex items-center justify-center flex-col">
						<span className="text-xs lg:text-base font-semibold text-[#7D7D7D]">
							Sút trượt/ Cú sút bị cản phá
						</span>

						<div className="flex items-center gap-2">
							<span className="text-sm lg:text-lg font-semibold">
								{stats?.[34]?.home}
							</span>

							<div className="bg-gray-400 h-2 w-[150px] lg:w-[300px] rounded-full relative flex items-center">
								<div
									className="bg-[#15C071] h-2 w-[50%] rounded-full flex items-center absolute top-0 left-0  "
									style={{
										width: `${
											(Number(stats?.[34]?.home) /
												(Number(stats?.[34]?.home) +
													Number(stats?.[34]?.away))) *
											100
										}%`,
									}}
								></div>

								<div
									className="bg-red-500 h-2 w-[20%] rounded-full flex items-center absolute top-0 right-0  "
									style={{
										width: `${
											(Number(stats?.[34]?.away) /
												(Number(stats?.[34]?.home) +
													Number(stats?.[34]?.away))) *
											100
										}%`,
									}}
								></div>
							</div>
							<span className="text-sm lg:text-lg font-semibold">
								{stats?.[34]?.away}
							</span>
						</div>
					</div>
				</div>
				<div className="flex items-center flex-row-reverse gap-1 lg:gap-8">
					<div className="flex flex-col items-center justify-center gap-1">
						<div className="w-6 h-6 lg:w-8 lg:h-8 relative">
							<Image
								src="/football-note/corner.png"
								fill
								alt=""
								className="object-contain"
							/>
						</div>
						<span>{stats?.[6]?.away}</span>
					</div>
					<div className="flex flex-col items-center justify-center gap-1">
						<div className="w-6 h-6 lg:w-8 lg:h-8 relative">
							<Image
								src="/football-note/yellow-card.svg"
								fill
								alt=""
								className="object-contain"
							/>
						</div>
						<span>{stats?.[11]?.away}</span>
					</div>
					<div className="flex flex-col items-center justify-center gap-1">
						<div className="w-6 h-6 lg:w-8 lg:h-8 relative">
							<Image
								src="/football-note/red-card.svg"
								fill
								alt=""
								className="object-contain"
							/>
						</div>
						<span>{stats?.[13]?.away || 0}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistic;
