import {getTopScoreByLeague} from "@/apis/league";
import LoadingSmall from "@/components/loading/LoadingSmall";
import {sortTopScore} from "@/utils/common";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

interface IProps {
	leagueId: string;
	currentSeason: string;
}
function TopScore({leagueId, currentSeason}: IProps) {
	const {data, isLoading} = useQuery({
		queryKey: ["topScore", leagueId, currentSeason],
		queryFn: () => getTopScoreByLeague(leagueId, currentSeason),
		enabled: !!leagueId && !!currentSeason,
	});
	const topScoreData = data?.data?.length > 0 ? sortTopScore(data?.data) : [];
	return (
		<>
			{isLoading ? (
				<div className="mt-10">
					<LoadingSmall />
				</div>
			) : (
				<div>
					<div className="rounded-t-lg p-4 w-full bg-secondary">
						<div className="flex items-center w-full justify-between text-[10px] lg:text-sm font-normal text-white">
							<div className="flex-1 w-[50%]">#TÊN CẦU THỦ</div>
							<div className="w-[30%] flex-1">TÊN ĐỘI</div>
							<div className="w-[20%] text-right">BÀN THẮNG</div>
						</div>
					</div>
					{topScoreData.length > 0 ? (
						<>
							<div className="bg-gray-100 p-5">
								<div className="flex items-center gap-2 ">
									<span className="text-6xl font-bold text-gray-300">1</span>
									<div className="relative w-14 h-14 flex-shrink-0">
										<Image
											className="object-contain rounded-full"
											fill
											src={topScoreData[0]?.profile[0]?.photo || ""}
											alt=""
										/>
									</div>
									<div className="flex flex-col gap-1.5">
										<span className="font-semibold text-sm capitalize">
											{topScoreData[0]?.playerName}
										</span>
										<span className="font-bold text-[10px]">
											{topScoreData[0]?.teamName}
										</span>
										<span className="text-red-600 text-sm font-bold ">
											{topScoreData[0]?.goalsCount} bàn
										</span>
									</div>
								</div>
							</div>

							{topScoreData
								.slice(1, topScoreData.length)
								?.map((item: any, index: number) => (
									<div
										className={`flex items-center w-full justify-between text-xs lg:text-sm font-normal p-2 ${
											index % 2 === 0 ? "" : "bg-gray-100"
										}`}
										key={index}
									>
										<div className="flex-1 w-[50%] flex items-center gap-4">
											<div className="font-semibold text-sm text-text-blue25">
												{item?.top}
											</div>
											<div className="flex items-center gap-2">
												<div className="relative w-8 h-8 flex-shrink-0">
													<Image
														className="object-contain rounded-full"
														fill
														src={
															item?.profile[0]?.photo || "/images/no-avatar.png"
														}
														alt=""
													/>
												</div>
												<span>{item?.playerName}</span>
											</div>
										</div>
										<div className="w-[30%] flex-1">{item?.teamName}</div>
										<div className="w-[20%] text-right">{item?.goalsCount}</div>
									</div>
								))}
						</>
					) : (
						<p className="text-red-500 font-semibold text-lg text-center uppercase pt-10">
							Đang cập nhật dữ liệu
						</p>
					)}
				</div>
			)}
		</>
	);
}

export default TopScore;
