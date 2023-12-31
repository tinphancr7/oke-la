import React, {useState, useMemo, useContext, useEffect} from "react";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconStar from "@/components/icons/Star";
import IconCornerKick from "@/components/icons/CornerKick";
import moment from "moment";
import {AuthContext} from "@/context/AuthContext";
import {toast} from "react-toastify";
import {likeLeague, likeMatch, unLikeMatch, unlikeLeague} from "@/apis/user";
import {useRouter} from "next/router";
import {AiFillStar} from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {FaAngleLeft, FaAngleRight, FaCalendarAlt} from "react-icons/fa";
import Datetime from "react-datetime";
import "moment/locale/vi";
import ListAllMatchHome from "./ListAllMatchHome";
import ListMatchLiveHome from "./ListMatchLiveHome";
import ListMatchUpcomingHome from "./ListMatchUpcomingHome";
import ListMatchFinishHome from "./ListMatchFinishHome";
import ListMatchOddHome from "./ListMatchOddHome";

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
function ListMatchesHome({searchMatch}: {searchMatch: string}) {
	const [tab, setTab] = useState(0);
	const {user, updateAuthUser} = useContext(AuthContext);
	const router = useRouter();
	// filter league
	const [date, setDate] = useState(new Date());
	//

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

	const renderTab = (tab: number) => {
		switch (tab) {
			case 1:
				return (
					<ListMatchLiveHome
						date={date}
						handleLikeLeague={handleLikeLeague}
						handleUnLikeLeague={handleUnLikeLeague}
						handleLikeMatch={handleLikeMatch}
						handleUnLikeMatch={handleUnLikeMatch}
						handleNavigate={handleNavigate}
						Loading={Loading}
						search={searchMatch}
					/>
				);
			case 2:
				return (
					<ListMatchOddHome
						date={date}
						handleLikeLeague={handleLikeLeague}
						handleUnLikeLeague={handleUnLikeLeague}
						handleLikeMatch={handleLikeMatch}
						handleUnLikeMatch={handleUnLikeMatch}
						handleNavigate={handleNavigate}
						Loading={Loading}
						search={searchMatch}
					/>
				);
			case 3:
				return (
					<ListMatchUpcomingHome
						date={date}
						handleLikeLeague={handleLikeLeague}
						handleUnLikeLeague={handleUnLikeLeague}
						handleLikeMatch={handleLikeMatch}
						handleUnLikeMatch={handleUnLikeMatch}
						handleNavigate={handleNavigate}
						Loading={Loading}
						search={searchMatch}
					/>
				);
			case 4:
				return (
					<ListMatchFinishHome
						date={date}
						handleLikeLeague={handleLikeLeague}
						handleUnLikeLeague={handleUnLikeLeague}
						handleLikeMatch={handleLikeMatch}
						handleUnLikeMatch={handleUnLikeMatch}
						handleNavigate={handleNavigate}
						Loading={Loading}
						search={searchMatch}
					/>
				);
			default:
				return (
					<ListAllMatchHome
						date={date}
						handleLikeLeague={handleLikeLeague}
						handleUnLikeLeague={handleUnLikeLeague}
						handleLikeMatch={handleLikeMatch}
						handleUnLikeMatch={handleUnLikeMatch}
						handleNavigate={handleNavigate}
						Loading={Loading}
						search={searchMatch}
					/>
				);
		}
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
								className="w-[90px] text-xs lg:text-sm lg:w-[160px] root-match-date-picker "
								value={date}
								locale="vi"
								dateFormat="DD/MM ddd"
								timeFormat={false}
								onChange={(value) => setDate(moment(value).toDate())}
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
													setDate(moment(date).add(-1, "day").toDate())
												}
											>
												<FaAngleLeft className="text-gray-400" />
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
													setDate(moment(date).add(1, "day").toDate())
												}
											>
												<FaAngleRight className="text-gray-400" />
											</span>
										</div>
									);
								}}
							/>
						</div>
					)}
				</div>
			</div>
			{renderTab(tab)}
		</>
	);
}

export default React.memo(ListMatchesHome);
