import React, {useState, useMemo, useContext, useEffect} from "react";
import ListMatchHomeItem from "./ListMatchHomeItem";

import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconStar from "@/components/icons/Star";

import IconCornerKick from "@/components/icons/CornerKick";

import moment from "moment";
import {AuthContext} from "@/context/AuthContext";
import {
	getFinishedMatchesGroupLeague,
	getHotMatchesGroupLeague,
	getHotMatchesGroupLeagueAuth,
	getMatchesByDateGroupLeague,
	getMatchesByDateGroupRateLeague,
	getPlayingMatchGroupLeague,
	getUpcomingMatchesGroupLeague,
} from "@/apis/match";
import {toast} from "react-toastify";
import {likeLeague, likeMatch, unLikeMatch, unlikeLeague} from "@/apis/user";
import {useRouter} from "next/router";
import {AiFillStar} from "react-icons/ai";
import FilterListMatchesHome from "./FilterListMatchesHome";
import {getLeagueHaveMatch} from "@/apis/league";
import {topLeague} from "@/constant";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ListMatchesHomeMobile from "./ListMatchesHomeMobile";
import {FaCalendarAlt} from "react-icons/fa";
import Datetime from "react-datetime";
import "moment/locale/vi";
import ListMatchOddHomeItem from "./ListMatchOddHomeItem";
import ListMatchesOddHomeMobile from "./ListMatchesOddHomeMobile";

const convertDateToVN = (date: string) => {
	switch (date) {
		case "T2":
			return "Hai";
		case "T3":
			return "Ba";
		case "T4":
			return "Tư";
		case "T5":
			return "Năm";
		case "T6":
			return "Sáu";
		case "T7":
			return "Bảy";
		default:
			return "CN";
	}
};

function ListMatchesHome() {
	const [tab, setTab] = useState(0);

	const {user, updateAuthUser} = useContext(AuthContext);

	const router = useRouter();

	const [playingMatches, setPlayingMatches] = useState<any[]>([]);
	const [todayMatches, setTodayMatches] = useState<any[]>([]);
	const [todayRateMatches, setTodayRateMatches] = useState<any[]>([]);
	const [upcomingMatches, setUpcomingHotMatches] = useState<any[]>([]);
	const [finishedMatches, setFinishMatches] = useState<any[]>([]);
	const [pageSize, setPageSize] = useState(5);
	const [pageIndex, setPageIndex] = useState(1);
	const [hasmore, setHasmore] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [searchMatch, setSearchMatch] = useState("");
	// filter league

	const [showBy, setShowBy] = useState<"league" | "time">("league");
	const [date, setDate] = useState(new Date());

	const getDataPlayingMatches = async (isFiltering = false) => {
		try {
			setLoading(true);
			const playingMatchesRes = await getPlayingMatchGroupLeague(
				1,
				showBy === "league" ? pageSize : 9999,
				searchMatch
			);

			setPlayingMatches(playingMatchesRes?.data?.result);

			setUpcomingHotMatches([]);

			setFinishMatches([]);
			setTodayMatches([]);
			setPageIndex(1);
			if (pageIndex >= playingMatchesRes?.data?.totalPage) {
				setHasmore(false);
			} else {
				setHasmore(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getDataTodayMatches = async (isFiltering = false) => {
		try {
			setLoading(true);
			const todayMatchesRes = await getMatchesByDateGroupLeague(
				1,
				showBy === "league" ? pageSize : 9999,
				moment(date).format("YYYY-MM-DD"),
				searchMatch
			);

			getMatchesByDateGroupLeagueNext(2);
			setTodayMatches(todayMatchesRes?.data?.result);
			setTodayRateMatches([]);

			setFinishMatches([]);
			setUpcomingHotMatches([]);
			setPlayingMatches([]);
			setPageIndex(1);
			if (pageIndex >= todayMatchesRes?.data?.totalPage) {
				setHasmore(false);
			} else {
				setHasmore(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const getDataTodayRateMatches = async (isFiltering = false) => {
		try {
			setLoading(true);
			const todayRateMatchesRes = await getMatchesByDateGroupRateLeague(
				1,
				showBy === "league" ? pageSize : 9999,
				moment(date).format("YYYY-MM-DD"),
				searchMatch
			);

			getMatchesByDateGroupLeagueNext(2);
			setTodayRateMatches(todayRateMatchesRes?.data?.result);
			setTodayMatches([]);

			setFinishMatches([]);
			setUpcomingHotMatches([]);
			setPlayingMatches([]);
			setPageIndex(1);
			if (pageIndex >= todayRateMatchesRes?.data?.totalPage) {
				setHasmore(false);
			} else {
				setHasmore(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getDataFinishMatch = async (isFiltering = false) => {
		try {
			setLoading(true);
			const finishedMatchesRes = await getFinishedMatchesGroupLeague(
				1,
				showBy === "league" ? pageSize : 9999,
				moment(date).format("YYYY-MM-DD"),
				searchMatch
			);

			setFinishMatches(finishedMatchesRes?.data?.result || []);

			setUpcomingHotMatches([]);

			setPlayingMatches([]);
			setTodayMatches([]);
			setTodayRateMatches([]);
			setPageIndex(1);
			if (pageIndex >= finishedMatchesRes?.data?.totalPage) {
				setHasmore(false);
			} else {
				setHasmore(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getDataUpcomingMatches = async (isFiltering = false) => {
		try {
			setLoading(true);
			const todayMatchesRes = await getUpcomingMatchesGroupLeague(
				1,
				showBy === "league" ? pageSize : 9999,
				moment(date).format("YYYY-MM-DD"),
				searchMatch
			);

			setUpcomingHotMatches(todayMatchesRes?.data?.result);

			setFinishMatches([]);
			setTodayMatches([]);
			setTodayRateMatches([]);
			setPlayingMatches([]);
			setPageIndex(1);
			if (pageIndex >= todayMatchesRes?.data?.totalPage) {
				setHasmore(false);
			} else {
				setHasmore(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getData = async (filtering = false) => {
		if (tab == 3) {
			getDataUpcomingMatches(filtering);
		} else if (tab === 2) {
			getDataTodayRateMatches(filtering);
		} else if (tab == 1) {
			getDataPlayingMatches(filtering);
		} else if (tab == 4) {
			getDataFinishMatch(filtering);
		} else {
			getDataTodayMatches(filtering);
		}
	};

	const getMatchesByDateGroupLeagueNext = async (page) => {
		return await getMatchesByDateGroupLeague(
			page,
			pageSize,
			moment(date).format("YYYY-MM-DD"),
			searchMatch
		);
	};
	const handleLoadMore = async (page: number) => {
		try {
			setLoadingMore(true);

			let result: any;

			if (tab === 3) {
				result = await getUpcomingMatchesGroupLeague(
					page,
					pageSize,
					moment(date).format("YYYY-MM-DD"),
					searchMatch
				);

				setUpcomingHotMatches((prev) => [...prev, ...result?.data?.result]);
			} else if (tab === 1) {
				result = await getPlayingMatchGroupLeague(page, pageSize, searchMatch);

				setPlayingMatches((prev) => [...prev, ...result?.data?.result]);
			} else if (tab === 2) {
				result = await getMatchesByDateGroupRateLeague(
					page,
					pageSize,
					moment(date).format("YYYY-MM-DD"),
					searchMatch
				);

				setTodayRateMatches((prev) => [...prev, ...result?.data?.result]);
			} else if (tab === 4) {
				result = await getFinishedMatchesGroupLeague(
					page,
					pageSize,
					moment(date).format("YYYY-MM-DD"),
					searchMatch
				);

				setFinishMatches((prev) => [...prev, ...result?.data?.result]);
			} else {
				result = await getMatchesByDateGroupLeague(
					page,
					pageSize,
					moment(date).format("YYYY-MM-DD"),
					searchMatch
				);
				getMatchesByDateGroupLeagueNext(page + 1);

				setTodayMatches((prev) => [...prev, ...result?.data?.result]);
			}

			if (page >= result?.data?.totalPage) {
				setHasmore(false);
			} else {
				setHasmore(true);
			}

			setPageIndex(page);
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingMore(false);
		}
	};

	useEffect(() => {
		getData();
	}, [tab, showBy, date]);

	useEffect(() => {
		const getLeagues = async () => {
			try {
				const result = await getLeagueHaveMatch(
					"",
					tab === 1 ? "live" : tab === 2 ? "hot" : tab === 4 ? "finished" : ""
				);
				setListLeague(
					(result.data?.result || [])?.sort((a: any, b: any) => {
						const A = topLeague?.find((e) => e?.leagueId === a?._id) ? 2 : 1;
						const B = topLeague?.find((e) => e?.leagueId === b?._id) ? 2 : 1;

						return B - A;
					})
				);

				setListChosenLeague(
					(result.data?.result || [])?.map((item: any) => item?._id)
				);
				setFiltering(false);
			} catch (error) {
				console.log(error);
			}
		};
		getLeagues();
	}, [tab]);

	const handleLikeMatch = async (matchId: string) => {
		try {
			if (!user) {
				toast.error("Bạn cần đăng nhập để thực hiện tính năng này");
			} else {
				const res = await likeMatch(matchId);
				if (res.data.status === 1) {
					toast.success("Yêu thích trận đấu thành công");
					updateAuthUser(res.data?.result);
				} else {
					toast.error("Yêu thích trận đấu thất bại");
				}
			}
		} catch (error) {
			toast.error("Yêu thích trận đấu thất bại");
		}
	};

	const handleUnLikeMatch = async (matchId: string) => {
		try {
			if (!user) {
				toast.error("Bạn cần đăng nhập để thực hiện tính năng này");
			} else {
				const res = await unLikeMatch(matchId);
				if (res.data.status === 1) {
					toast.success("Bỏ yêu thích trận đấu thành công");
					updateAuthUser(res.data?.result);
				} else {
					toast.error("Bỏ yêu thích trận đấu thất bại");
				}
			}
		} catch (error) {
			toast.error("Bỏ yêu thích trận đấu thất bại");
		}
	};

	const handleNavigate = (link: string, matchId: string) => {
		router.push(`/chi-tiet-tran/${matchId}?${link}`);
	};
	const handleLikeLeague = async (leagueId: string) => {
		try {
			if (!user) {
				toast.error("Bạn cần đăng nhập để thực hiện tính năng này");
			} else {
				const res = await likeLeague(leagueId);
				if (res.data.status === 1) {
					toast.success("Yêu thích giải đấu thành công");
					updateAuthUser(res.data?.result);
				} else {
					toast.error("Yêu thích giải đấu thất bại");
				}
			}
		} catch (error) {
			toast.error("Yêu thích giải đấu thất bại");
		}
	};

	const handleUnLikeLeague = async (leagueId: string) => {
		try {
			if (!user) {
				toast.error("Bạn cần đăng nhập để thực hiện tính năng này");
			} else {
				const res = await unlikeLeague(leagueId);
				if (res.data.status === 1) {
					toast.success("Bỏ yêu thích giải đấu thành công");
					updateAuthUser(res.data?.result);
				} else {
					toast.error("Bỏ yêu thích giải đấu thất bại");
				}
			}
		} catch (error) {
			toast.error("Bỏ yêu thích giải đấu thất bại");
		}
	};

	const tabs = [
		{
			id: 0,
			title: "TẤT CẢ",
		},
		{
			id: 1,
			title: "TRỰC TIẾP",
			isBlink: true,
		},
		{
			id: 2,
			title: "TỶ LỆ KÈO",
		},

		{
			id: 3,
			title: "SẮP DIỄN RA",
		},
		{
			id: 4,
			title: "ĐÃ KẾT THÚC",
		},
	];

	const genDataMatches = useMemo(() => {
		if (tab === 1) return playingMatches;
		if (tab === 2) {
			return todayRateMatches;
		}

		if (tab === 3) return upcomingMatches;

		if (tab === 4) return finishedMatches;

		if (tab === 0) return todayMatches;

		return [];
	}, [
		tab,
		playingMatches,
		todayMatches,
		todayRateMatches,
		finishedMatches,
		upcomingMatches,
	]);

	const Loading = () => {
		return new Array(5).fill(5).map((item) => {
			return (
				<div key={item?._id} className="mt-6">
					<div className="bg-secondary px-4 py-2 border-b-2 border-primary text-white text-sm flex items-center justify-between">
						{user?.leagues?.includes(item?._id) ? (
							<ButtonOnlyIcon onClick={() => handleUnLikeLeague(item?._id)}>
								<AiFillStar color={"#ffad01"} size={24} />
							</ButtonOnlyIcon>
						) : (
							<ButtonOnlyIcon onClick={() => handleLikeLeague(item?._id)}>
								<IconStar color="#ffffff" />
							</ButtonOnlyIcon>
						)}
					</div>
					{new Array(2).fill(2).map((x, index) => {
						return (
							<div
								className="p-4 bg-[#F4F5F6] border-b-2 border-[#DFDFDF]"
								key={index}
							>
								<div className="flex items-center justify-between gap-x-4">
									<div className="flex items-center gap-x-4 w-full sm:w-1/2">
										<div className="text-sm">
											<div>
												<Skeleton count={1} />
											</div>
											<div>
												<Skeleton count={1} />
											</div>
										</div>
										<div className="flex items-center justify-between gap-x-2 w-full">
											<div className="flex items-center gap-x-2 w-full">
												<div>
													<Skeleton count={1} />
												</div>

												<div className="text-xs font-semibold">
													<div>
														<Skeleton count={1} />
													</div>
													<div className="mt-2">
														<Skeleton count={1} />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="w-[60px] flex items-center justify-between">
										<Skeleton count={1} />
									</div>
								</div>
								<div className="mt-2 p-2 bg-white flex justify-between">
									{/*  Cược chấp */}
									<div className="w-[80px] text-center">
										<div className="text-secondary text-sm font-semibold mb-1.5">
											Cược chấp
										</div>
										<div className="flex items-center justify-between text-sm bg-light p-1">
											<div>
												<Skeleton count={1} />
											</div>
											<div className="flex items-center gap-x-1 font-bold">
												<span>
													<Skeleton count={1} />
												</span>
											</div>
										</div>
										<div className="flex items-center justify-between text-sm bg-light p-1 mt-1">
											<div>
												<Skeleton count={1} />
											</div>
											<div className="flex items-center gap-x-1 font-bold">
												<span>
													<Skeleton count={1} />
												</span>
											</div>
										</div>
									</div>

									{/*  Tài xỉu */}
									<div className="w-[80px] text-center">
										<div className="text-secondary text-sm font-semibold mb-1.5">
											Tài xỉu
										</div>
										<div className="flex items-center justify-between text-sm bg-light p-1">
											<div>
												<Skeleton count={1} />
											</div>
											<div className="flex items-center gap-x-1 font-bold">
												<span>
													<Skeleton count={1} />
												</span>
											</div>
										</div>
										<div className="flex items-center justify-between text-sm bg-light p-1 mt-1">
											<div>
												<Skeleton count={1} />
											</div>
											<div className="flex items-center gap-x-1 font-bold">
												<span>
													<Skeleton count={1} />
												</span>
											</div>
										</div>
									</div>

									{/* HT */}
									<div className="flex flex-col justify-end min-h-full gap-y-2">
										<div className="gap-x-2 items-center justify-between flex text-xs text-secondary-light">
											<span>HT</span>
											<span>
												<Skeleton count={1} />
											</span>
										</div>
										<div className="gap-x-2 flex items-center justify-between text-xs text-secondary-light">
											<IconCornerKick />
											<span>
												<Skeleton count={1} />
											</span>
										</div>
									</div>

									{/*  Data */}
									<div className="text-center flex flex-col relative">
										<div className="text-secondary text-sm font-semibold mb-1.5">
											Data
										</div>
										<div className="flex items-center justify-between gap-x-1 h-full">
											<div className="bg-secondary">
												<Skeleton count={1} />
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			);
		});
	};

	return (
		<>
			<div
				id="matches-home"
				className="mt-4 lg:mt-0 list-matches-home bg-white lg:rounded-t-[8px]"
			>
				<div className="w-full flex items-center justify-between lg:border-none border-t border-b bg-[#EEE] lg:bg-white border-[#BBB] lg:px-4 lg:pt-2 lg:rounded-t-[8px]">
					<div className="max-w-fit lg:max-w-full flex flex-no-wrap gap-4 overflow-x-auto py-2">
						{tabs.map((item, index) => (
							<button
								className={`px-2 py-1 rounded-[8px] font-semibold text-xs lg:text-sm min-w-fit border-[#8A8A8A] ${
									item?.id === tab
										? ` text-white border-none ${
												item?.id === 1 ? "bg-red-500" : "bg-secondary"
										  }`
										: "bg-[#EEE] text-[#8A8A8A] border"
								}`}
								onClick={() => {
									if ([0, 2, 3, 4].includes(item.id)) {
										setDate(new Date());
									}
									setTab(item.id);
								}}
								key={index}
							>
								{item?.title}
							</button>
						))}
					</div>

					{[0, 2, 3, 4].includes(tab) && (
						<div
							className="bg-white py-2 px-2 lg:p-0 rounded-s-[8px] lg:!shadow-none"
							style={{boxShadow: `-1px 0px 2px 0px rgba(0, 0, 0, 0.25)`}}
						>
							<Datetime
								className="w-[90px] lg:w-[150px] root-match-date-picker"
								value={date}
								locale="vi"
								dateFormat="DD/MM ddd"
								timeFormat={false}
								onChange={(value) =>
									!loading && setDate(moment(value).toDate())
								}
								renderMonth={(props, month, year, selectedDate) => (
									<td
										{...props}
										onClick={(e) => {
											setDate(
												new Date(`${year}-${month + 1}-${date.getDate()}`)
											);
											props.onClick(e);
										}}
									>
										<div className="text-xs">Tháng {month + 1}</div>
									</td>
								)}
								renderInput={(props) => {
									return (
										<div className="flex items-center justify-between rounded-[8px] border px-2 py-1 lg:px-4 lg:py-2 bg-white">
											<span
												className="cursor-pointer hidden lg:inline"
												onClick={() =>
													!loading &&
													setDate(moment(date).add(-1, "day").toDate())
												}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="8"
													height="13"
													viewBox="0 0 8 13"
													fill="none"
												>
													<path
														d="M7.207 10.7929L7.20703 10.7929C7.39461 10.9805 7.5 11.2349 7.5 11.5002C7.5 11.7655 7.39461 12.0199 7.20703 12.2075C7.01944 12.3951 6.76501 12.5005 6.49972 12.5005C6.23443 12.5005 5.98001 12.3951 5.79242 12.2075L0.792617 7.20771C0.792551 7.20765 0.792484 7.20758 0.792419 7.20751C0.699534 7.11468 0.625844 7.00446 0.575556 6.88315C0.525229 6.76175 0.499329 6.63162 0.499329 6.50021C0.499329 6.3688 0.525229 6.23867 0.575556 6.11727C0.625844 5.99596 0.699534 5.88574 0.792419 5.79291C0.792485 5.79284 0.792551 5.79277 0.792617 5.79271L5.79242 0.792906C5.88531 0.700018 5.99558 0.626341 6.11693 0.576075C6.23829 0.525805 6.36836 0.499931 6.49972 0.499931C6.63108 0.499931 6.76116 0.525805 6.88251 0.576075C7.00387 0.626341 7.11414 0.700018 7.20703 0.792907C7.29991 0.885791 7.37359 0.99606 7.42386 1.11742C7.47413 1.23878 7.5 1.36885 7.5 1.50021C7.5 1.63157 7.47413 1.76164 7.42386 1.883C7.37359 2.00436 7.29991 2.11463 7.20703 2.20751L7.207 2.20754L2.91375 6.50021L7.207 10.7929Z"
														fill="#958C8C"
														stroke="#958C8C"
													/>
												</svg>
											</span>

											<div
												{...props}
												className="flex items-center gap-1 text-[#8A8A8A]"
											>
												<FaCalendarAlt className="w-[12px] h-[12px]" />
												<span className="text-xs lg:text-sm">
													{props?.value?.substring(0, 6)}
													{convertDateToVN(props?.value?.substring(6))}
												</span>
											</div>
											<span
												className="cursor-pointer hidden lg:inline"
												onClick={() =>
													!loading &&
													setDate(moment(date).add(1, "day").toDate())
												}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="8"
													height="13"
													viewBox="0 0 8 13"
													fill="none"
												>
													<path
														d="M0.792998 10.7929L0.792974 10.7929C0.605385 10.9805 0.5 11.2349 0.5 11.5002C0.5 11.7655 0.605385 12.0199 0.792974 12.2075C0.980563 12.3951 1.23499 12.5005 1.50028 12.5005C1.76557 12.5005 2.01999 12.3951 2.20758 12.2075L7.20738 7.20771C7.20745 7.20765 7.20752 7.20758 7.20758 7.20751C7.30047 7.11468 7.37416 7.00446 7.42444 6.88315C7.47477 6.76175 7.50067 6.63162 7.50067 6.50021C7.50067 6.3688 7.47477 6.23867 7.42444 6.11727C7.37416 5.99596 7.30047 5.88574 7.20758 5.79291C7.20752 5.79284 7.20745 5.79277 7.20738 5.79271L2.20758 0.792906C2.11469 0.700018 2.00442 0.626341 1.88307 0.576075C1.76171 0.525805 1.63164 0.499931 1.50028 0.499931C1.36892 0.499931 1.23884 0.525805 1.11749 0.576075C0.996133 0.626341 0.885862 0.700018 0.792973 0.792907C0.70009 0.885791 0.62641 0.99606 0.576141 1.11742C0.525872 1.23878 0.5 1.36885 0.5 1.50021C0.5 1.63157 0.525872 1.76164 0.576141 1.883C0.62641 2.00436 0.70009 2.11463 0.792973 2.20751L0.792998 2.20754L5.08625 6.50021L0.792998 10.7929Z"
														fill="#958C8C"
														stroke="#958C8C"
													/>
												</svg>
											</span>
										</div>
									);
								}}
							/>
						</div>
					)}
				</div>

				<div className="mt-4">
					{(loading ? [] : genDataMatches)?.map((item) => (
						<>
							{tab === 2 ? (
								<>
									<div className="hidden lg:block">
										<ListMatchOddHomeItem
											isGroup={Boolean(showBy === "league")}
											matchThesport={[]}
											matchGroupLeague={item}
											key={item?._id}
										/>
									</div>
									<div className="block lg:hidden">
										<ListMatchesOddHomeMobile
											isGroup={Boolean(showBy === "league")}
											key={item?._id}
											item={item}
											handleLikeLeague={handleLikeLeague}
											handleUnLikeLeague={handleUnLikeLeague}
											handleLikeMatch={handleLikeMatch}
											handleUnLikeMatch={handleUnLikeMatch}
											handleNavigate={handleNavigate}
										/>
									</div>
								</>
							) : (
								<>
									<div className="hidden lg:block">
										<ListMatchHomeItem
											isGroup={Boolean(showBy === "league")}
											matchThesport={[]}
											matchGroupLeague={item}
											key={item?._id}
										/>
									</div>
									<div className="block lg:hidden">
										<ListMatchesHomeMobile
											isGroup={Boolean(showBy === "league")}
											key={item?._id}
											item={item}
											handleLikeLeague={handleLikeLeague}
											handleUnLikeLeague={handleUnLikeLeague}
											handleLikeMatch={handleLikeMatch}
											handleUnLikeMatch={handleUnLikeMatch}
											handleNavigate={handleNavigate}
										/>
									</div>
								</>
							)}
						</>
					))}
				</div>

				{(loading || loadingMore) && <Loading />}
			</div>
			{/* filter list matches */}
			{/* <FilterListMatchesHome
				listLeague={listLeague as any}
				onClose={() => setShowFilterLeague(false)}
				show={showFilterLeague}
				listChosenLeague={listChosenLeague}
				onChangeChosenListLeague={handleChangeChosenListLeague}
				onFilterByLeague={handleFilterByLeague}
				handleCheckAll={handleCheckAll}
			/> */}
			<div className="flex items-center justify-center mt-4">
				<button
					onClick={() => handleLoadMore(pageIndex + 1)}
					type="button"
					disabled={!hasmore}
					className={`w-[150px] text-white bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary dark:focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
						!hasmore ? "opacity-50" : ""
					}  }`}
				>
					<span>Xem Thêm</span>
				</button>
			</div>
		</>
	);
}

export default React.memo(ListMatchesHome);
