import {getRankByLeague} from "@/apis/league";
import Image from "next/image";
import {useEffect, useState} from "react";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import {twMerge} from "tailwind-merge";
import LoadingSmall from "../loading/LoadingSmall";
import {IRankGroupItem} from "@/interfaces";

const RankTable = ({
	leagueId,
	status = "all",
	leagueType = "1",
}: {
	leagueId: string;
	status?: string;
	leagueType?: string;
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [teamProfile, setTeamProfile] = useState<any[]>([]);
	const [rankData, setRankData] = useState<any[]>([]);
	const [rankDataGroup, setRankDataGroup] = useState<IRankGroupItem[]>([]);
	const [leagueColorInfos, setLeagueColorInfos] = useState<
		{
			color: string;
			leagueName: string;
			beginRank: number;
			endRank: number;
		}[]
	>([]);
	const [statusRank, setStatusRank] = useState("all");

	useEffect(() => {
		setStatusRank(status);
	}, [status]);

	const getRankByLeagueId = async () => {
		try {
			setIsLoading(true);
			const result = await getRankByLeague(leagueId, leagueType);
			if (leagueType == "1") {
				setRankData(
					(statusRank === "all"
						? result.data?.totalStandings
						: statusRank === "home"
						? result?.data?.homeStandings
						: result?.data?.awayStandings) || []
				);
				setTeamProfile(result.data?.teamInfos || []);
				setLeagueColorInfos(result?.data?.leagueColorInfos || []);
			} else {
				setRankDataGroup(result?.data || []);
			}
		} catch (error) {
			setRankData([]);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const findTeam = (teamId: string) => {
		return teamProfile?.find((item) => item?.teamId == teamId);
	};

	const renderPreviousResult = (result: number) => {
		return result == 0 ? "W" : result == 1 ? "D" : result == 2 ? "L" : "-";
	};

	const genClassNamePreviousResult = (result: number) => {
		return result == 0
			? "bg-green02"
			: result == 1
			? "bg-red-500"
			: result == 2
			? "bg-[#9DA5AC]"
			: "bg-primary";
	};

	const genColorAndInfo = (rank: number) => {
		const temp = leagueColorInfos?.find(
			(item) => rank >= item?.beginRank && rank <= item?.endRank
		);
		return {
			color: temp?.color || "",
			leagueName: temp?.leagueName || "",
		};
	};

	useEffect(() => {
		getRankByLeagueId();
	}, [leagueId, statusRank]);

	const genQualifiedTeam = () => {
		let color = "";

		if (leagueType == "1") return color;

		rankDataGroup?.forEach((group) => {
			group?.scoreItems?.forEach((item) => {
				if (item?.color) {
					color = item?.color || "";

					return;
				}
			});
		});

		return color;
	};

	return (
		<div>
			<div className="w-full">
				{leagueType == "1" ? (
					<div className=" bg-gray-100 rounded-xl p-4">
						<h3 className="text-lg font-bold text-black pb-4 capitalize">
							Bảng xếp hạng hiện tại
						</h3>
						<div className="max-w-full overflow-x-auto">
							<div className="bg-secondary rounded-t-lg p-4 min-w-fit lg:min-w-full">
								<div className="flex items-center justify-between lg:justify-start w-full  text-xs lg:text-sm font-normal text-white">
									<div className="w-[50px] lg:w-[10%] flex items-center  ">
										#
									</div>
									<div className="w-[150px] lg:w-[20%] flex items-center ">
										Câu lạc bộ
									</div>
									<div className="w-[100px] lg:w-[30%] flex items-center justify-center gap-4 lg:gap-10">
										<div className="w-[15%] lg:w-[10%]">P</div>
										<div className="w-[15%] lg:w-[10%]">W</div>
										<div className="w-[15%] lg:w-[10%]">D</div>
										<div className="w-[15%] lg:w-[10%]">L</div>
									</div>
									<div className="w-[50px] hidden lg:w-[10%] lg:flex items-center ">
										Hiệu số
									</div>
									<div className="w-[200px] hidden lg:w-[20%] lg:flex items-center justify-center  ">
										<span className="inline-block pb-1 relative">
											Phong độ gần nhất
										</span>
									</div>
									<div className="w-[50px] lg:w-[10%] flex items-center justify-end">
										PTS
									</div>
								</div>
							</div>
							{isLoading ? (
								<div className="bg-white py-8 text-center">
									<LoadingSmall />
								</div>
							) : rankData?.length === 0 ? (
								<div className="bg-white py-8 text-center text-sm font-bold text-secondary">
									Hiện tại không có bảng xếp hạng
								</div>
							) : (
								<div className="min-w-fit ">
									{rankData?.map((item: any, index: number) => {
										return (
											<div
												key={index}
												className={twMerge(`bg-white shadow-lg`)}
											>
												<div key={index} className=" p-4 border-b">
													<div className="flex items-center w-full lg:justify-start justify-between text-xs font-normal text-white">
														<div className="w-[50px] lg:w-[10%] flex items-center ">
															<span
																className="text-xs w-6 h-6 text-white flex items-center justify-center rounded-full"
																style={{
																	background:
																		genColorAndInfo(item?.rank)?.color ||
																		"#333",
																}}
															>
																{item?.rank}
															</span>
														</div>
														<div className="w-[150px] lg:w-[20%] flex items-center gap-2">
															<div className="w-5 h-5 lg:w-6 lg:h-6 relative flex-shrink-0">
																<Image
																	src={findTeam(item?.teamId)?.logo}
																	fill
																	className="w-full h-full object-fill"
																	alt=""
																/>
															</div>
															<span className="text-xs font-normal text-black11">
																{findTeam(item?.teamId)?.name}
															</span>
														</div>
														<div className="w-[100px] lg:w-[30%] flex items-center justify-center gap-4 lg:gap-10 text-black11 text-xs">
															<div className="w-[15%] lg:w-[10%]">
																{item?.totalCount}
															</div>
															<div className="w-[15%] lg:w-[10%]">
																{item?.winCount}
															</div>
															<div className="w-[15%] lg:w-[10%]">
																{item?.drawCount}
															</div>
															<div className="w-[15%] lg:w-[10%]">
																{item?.loseCount}
															</div>
														</div>
														<div className="w-[50px] hidden lg:flex lg:w-[10%] text-black11 text-xs gap-1">
															<span>{item?.goalDifference}</span>
														</div>
														<div className="w-[200px] hidden lg:w-[20%] lg:flex items-center justify-center gap-2">
															<span
																key={index}
																className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${genClassNamePreviousResult(
																	item?.recentFirstResult
																)}`}
															>
																{renderPreviousResult(item?.recentFirstResult)}
															</span>
															<span
																key={index}
																className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${genClassNamePreviousResult(
																	item?.recentSecondResult
																)}`}
															>
																{renderPreviousResult(item?.recentSecondResult)}
															</span>
															<span
																key={index}
																className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${genClassNamePreviousResult(
																	item?.recentThirdResult
																)}`}
															>
																{renderPreviousResult(item?.recentThirdResult)}
															</span>
															<span
																key={index}
																className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${genClassNamePreviousResult(
																	item?.recentFourthResult
																)}`}
															>
																{renderPreviousResult(item?.recentFourthResult)}
															</span>
															<span
																key={index}
																className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${genClassNamePreviousResult(
																	item?.recentFifthResult
																)}`}
															>
																{renderPreviousResult(item?.recentFifthResult)}
															</span>

															<span
																key={index}
																className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${genClassNamePreviousResult(
																	item?.recentSixthResult
																)}`}
															>
																{renderPreviousResult(item?.recentSixthResult)}
															</span>
														</div>
														<div className="w-[50px] lg:w-[10%] flex items-center justify-end text-black11 text-xs">
															<span>{item?.integral}</span>
														</div>
													</div>
												</div>
											</div>
										);
									})}
									<div className="mt-2 px-2">
										<div className="font-bold text-sm">Ghi chú</div>
										<div className="flex items-start lg:items-center gap-x-4 flex-col lg:flex-row">
											{leagueColorInfos?.map((item) => (
												<div
													key={item?.leagueName}
													className="flex items-center gap-2"
												>
													<div
														className="min-w-[15px] min-h-[15px] rounded-full"
														style={{background: item?.color}}
													></div>
													<div className="text-sm">{item?.leagueName}</div>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</div>

						{/* @ts-ignore */}
					</div>
				) : (
					<div>
						{rankDataGroup?.length > 0 ? (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
								{rankDataGroup?.map((group) => (
									<div key={group?.groupName} className="col-span-1">
										<div className="bg-secondary rounded-t-lg p-4 ">
											<div className="flex items-center w-full  text-xs lg:text-sm font-normal text-white">
												<div className="w-[15%] flex items-center  ">
													{group?.groupName}
												</div>
												<div className="w-[30%] flex items-center ">
													Câu lạc bộ
												</div>
												<div className="w-[30%] flex items-center gap-2 lg:gap-10">
													<div className="flex-1">P</div>
													<div className="flex-1">W</div>
													<div className="flex-1">D</div>
													<div className="flex-1">L</div>
												</div>
												<div className="w-[15%] text-center">Hiệu số</div>
												<div className="w-[10%] text-right">PTS</div>
											</div>
										</div>

										{group?.scoreItems?.map((item, index: number) => {
											return (
												<div key={index} className={twMerge(`bg-white`)}>
													<div key={index} className=" p-4 border-b">
														<div className="flex items-center w-full  text-xs font-normal text-white">
															<div className="w-[15%] flex items-center ">
																<span
																	className="w-4 h-4 text-xs lg:w-6 lg:h-6 text-white flex items-center justify-center rounded-full"
																	style={{
																		background: item?.color || "#333",
																	}}
																>
																	{item?.rank}
																</span>
															</div>
															<div className="w-[30%] flex items-center gap-2">
																<span className="text-xs lg:text-sm font-semibold text-black11">
																	{item?.teamName}
																</span>
															</div>
															<div className=" w-[30%] flex items-center gap-2 lg:gap-10 text-black11 text-xs">
																<div className="flex-1">{item?.totalCount}</div>
																<div className="flex-1">{item?.winCount}</div>
																<div className="flex-1">{item?.drawCount}</div>
																<div className="flex-1">{item?.loseCount}</div>
															</div>
															<div className="w-[15%] text-black11 text-xs gap-1 text-center">
																<span>{item?.goalDifference}</span>
															</div>
															<div className="w-[10%] flex items-center justify-end text-black11 text-xs">
																<span>{item?.integral}</span>
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								))}
							</div>
						) : (
							<div className="bg-white py-8 text-center text-sm font-bold text-secondary">
								Hiện tại không có bảng xếp hạng
							</div>
						)}

						{genQualifiedTeam() && (
							<div className="flex items-center gap-4 mt-4">
								<div
									className="min-w-[20px] h-[20px] rounded-[4px]"
									style={{background: genQualifiedTeam()}}
								></div>
								:
								<div className="font-semibold text-sm">
									Các đội đã qua vòng bảng
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default RankTable;
