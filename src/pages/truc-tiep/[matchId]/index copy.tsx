import {axiosInstanceISport} from "@/apis";
import {
	getEvent,
	getLineUpById,
	getMatchAnalysis,
	getMatchAnalysisAll,
	getMatchAnalysisGroupLeague,
	getMatchById,
} from "@/apis/match";
import {getMessagesRoom} from "@/apis/message";
import {getRoomByMatchId} from "@/apis/room";
import {getVoteByMatchId, unVote, vote as voteMatch} from "@/apis/vote";
import Breadcrumb from "@/components/Breadcrumb";
import Commentary from "@/components/DetailMatch/Commentary";
import MatchLive from "@/components/MatchLive";
import Sosanhkeo from "@/components/Sosanhkeo";
import IconLiveStream from "@/components/icons/LiveStream";
import ImageWithFallback from "@/components/imageWithFallback";
import RankTable from "@/components/rankTable";
import {LOGO_DEFAULT, URL_IFRAME_THESPORTS, notes} from "@/constant";
import H2H from "@/containers/H2H";
import LineUp from "@/containers/LiveStream/LineUp";
import {AuthContext} from "@/context/AuthContext";
import {SocketContext} from "@/context/SocketContext";
import findMatchData from "@/helper/matchAnalyticsHelper";
import {IHotMatch, IMessage, IVote} from "@/interfaces";
import {converToTheSportId, generateMatchTime, isPlayingMatches} from "@/utils";
import axios from "axios";
import moment from "moment";
import {GetServerSidePropsContext} from "next";
import Image from "next/image";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {IIdleTimer, useIdleTimer} from "react-idle-timer/legacy";
import {toast} from "react-toastify";

export type matchType =
	| "main"
	| "odd"
	| "lineup"
	| "h2h"
	| "rank"
	| "commentary";

const tabLives = [
	{
		id: 1,
		name: "Tổng quan",
		value: "main",
	},
	{
		id: 2,
		name: "Đội hình",
		value: "lineup",
	},
	{
		id: 3,
		name: "H2H",
		value: "h2h",
	},
	{
		id: 4,
		name: "Bảng xếp hạng",
		value: "rank",
	},
	{
		id: 5,
		name: "Góc bình luận",
		value: "commentary",
	},
];

const MatchDetail = ({
	match,
	matchIdLive,
	events,
	matchAnalysis,
	lineup,
	room,
	originalMatchAnalysis,
	matchDetail,
}: {
	match: IHotMatch;
	matchIdLive: string;
	events: any[];
	matchAnalysis: any;
	lineup: any;
	room: {
		room: any;
		messages: IMessage[];
	};
	originalMatchAnalysis: any;
	matchDetail: any;
}) => {
	const {user} = useContext(AuthContext);
	const socket: any = useContext(SocketContext);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [tab, setTab] = useState<matchType>("main");
	const options = [
		{value: "Bet 365", label: "Bet 365"},
		{value: "Macao", label: "Macao"},
	];
	const [isLiveStreamErr, setIsLiveStreamErr] = useState(false);
	const [vote, setVote] = useState<IVote>();
	//vote

	const checkLinkExist = async () => {
		try {
			const res = await axiosInstanceISport.get(
				`${URL_IFRAME_THESPORTS}${matchIdLive}/playlist.m3u8`
			);
			setIsLiveStreamErr(false);
		} catch (error) {
			console.log(error);

			setIsLiveStreamErr(true);
		}
	};
	const getVote = async () => {
		try {
			const res = await getVoteByMatchId(match?.matchId);

			if (res.data?.status === 1) {
				setVote(res.data?.result);
			}
		} catch (error) {}
	};

	useEffect(() => {
		checkLinkExist();
	}, [matchIdLive]);

	useEffect(() => {
		getVote();
	}, [match]);

	const handleVote = async (matchId: string, voteType: string) => {
		try {
			if (!user) {
				toast.error("Bạn cần đăng nhập để thực hiện tính năng này");
			} else {
				const res = await voteMatch({matchId, voteType});
				if (res.data?.status === 1) {
					toast.success("Bình chọn thành công");
					getVote();
				} else {
					toast.error("Bình chọn thất bại");
				}
			}
		} catch (error) {
			toast.error("Bình chọn thất bại");
		}
	};
	const handleUnVote = async (matchId: string) => {
		try {
			const res = await unVote(matchId);
			if (res.data?.status === 1) {
				toast.success("Bỏ Bình chọn thành công");
				getVote();
			} else {
				toast.error("Bỏ bình chọn thất bại");
			}
		} catch (error) {
			toast.error("Bỏ bình chọn thất bại");
		}
	};
	//
	useEffect(() => {
		if (socket && match?.matchId) {
			socket.emit("join_room", {
				matchId: match?.matchId,
			});

			socket.on("receive_message", (data: any) => {
				setMessages((prevState) => {
					return [data, ...prevState];
				});
			});
		}
		return () => {
			socket?.emit("leave_room", {
				matchId: match?.matchId,
			});
		};
	}, [match, socket]);

	useEffect(() => {
		setMessages(room?.messages);
	}, [room]);

	const returnMatchAnalysis = findMatchData(matchAnalysis, match);

	const renderTab = (tab: matchType) => {
		switch (tab) {
			case "main":
				return (
					<MatchLive
						matchAnalysis={matchAnalysis}
						event={events}
						match={match}
						matchIdLive={matchIdLive}
						room={room?.room || {}}
						messages={messages}
						matchDetail={matchDetail}
					/>
				);
			case "h2h":
				return <H2H match={match} matchAnalysis={originalMatchAnalysis} />;
			case "lineup":
				return <LineUp match={match} lineup={lineup} />;
			case "rank":
				return (
					<RankTable
						leagueId={match?.leagueId || ""}
						leagueType={match?.leagueType}
					/>
				);
			case "commentary":
				return <Commentary matchAnalysis={returnMatchAnalysis} match={match} />;
		}
	};
	const defaultOption = options[0];

	//handle timer
	const [stopCount, setStopCount] = useState<boolean>(false);

	const onAction = (data: any) => {
		if (data?.type === "visibilitychange") {
			setStopCount(true);
		} else {
			setStopCount(false);
		}
	};

	useIdleTimer({
		onAction,
		disabled: user?._id ? false : true,
	});

	const addTimeWatch = () => {
		if (!stopCount) {
			socket.emit("add_time_watched", {
				matchId: match?.matchId,
				userId: user?._id,
				time: moment().unix(),
			});
		}
	};

	useEffect(() => {
		if (user?._id) {
			let reload = 120;
			if (!reload) {
				return;
			}
			const autoRefresh = setInterval(() => {
				addTimeWatch();
			}, reload * 1000);
			return () => {
				// Clear previous timeout
				clearInterval(autoRefresh);
			};
		}
	}, [user?._id]);

	return (
		<div className=" pt-2 xl:container mx-auto md:px-4 xl:px-2">
			<div className="match-list-detail-header hidden lg:block ">
				<Breadcrumb
					backLink="/truc-tiep"
					breadCrumb={[
						{title: "Bóng đá trực tiếp", url: "/truc-tiep"},
						{title: `Giải bóng đá ${match?.leagueName}`, url: "/truc-tiep"},
					]}
				/>
			</div>

			<div className="bg-[#F1F1F1] w-full rounded-lg flex flex-col gap-5 mt-4  h-fit">
				<div className="flex items-center justify-center">
					<div className="clip-custom text-white relative">
						<div className="absolute -top-[25px] left-[50%] -translate-x-[50%] text-xs  text-white font-semibold uppercase w-full text-center">
							{match?.leagueName}
						</div>
					</div>
				</div>
				{match?.status === -1 ? (
					<>
						<div className="flex items-center justify-center">
							<div className="flex items-center justify-end gap-4 w-[40%] lg:w-[45%]">
								<span className="text-sm font-bold text-black capitalize">
									{match?.homeName}
								</span>
								<div className="w-12 h-12 bg-white shadow relative flex-shrink-0 rounded-full">
									<Image
										src={`${match?.homeIcon}` || LOGO_DEFAULT}
										className="object-cover rounded-full p-1"
										fill
										alt=""
									/>
								</div>
							</div>
							<div className="w-[20%] lg:w-[10%] flex items-center justify-center flex-col gap-1 font-bold text-red-500 text-xl">
								{match?.homeScore} - {match?.awayScore}
							</div>
							<div className="flex items-center gap-4 w-[40%] lg:w-[45%]">
								<div className="w-12 h-12 bg-white shadow relative flex-shrink-0 rounded-full">
									<Image
										src={`${match?.awayIcon}` || LOGO_DEFAULT}
										className="object-cover rounded-full p-1"
										fill
										alt=""
									/>
								</div>
								<span className="text-sm font-bold text-black capitalize">
									{match?.awayName}
								</span>
							</div>
						</div>

						<div className="flex items-center justify-center gap-2">
							<div className="flex items-center justify-end w-[40%]  lg:w-[35%] gap-4">
								<div className="w-6 h-4 lg:w-8 lg:h-[22px] relative flex-shrink-0 ">
									<Image
										src={"/images/stadium.png"}
										className="object-cover "
										fill
										alt=""
									/>
								</div>
								<span className="text-sm lg:text-base"> {match?.location}</span>
							</div>
							<div className="flex flex-col gap-1 items-center justify-center w-[20%] lg:w-[30%] ">
								<div className="px-3 py-1 rounded-md bg-[#FF9B00] text-white text-xs font-semibold flex items-center justify-center">
									{/* 22:00 */}
									{match?.matchTime &&
										moment.unix(match?.matchTime).format("HH:mm")}
								</div>
								<div className="text-sm text-[#2C3882] font-medium">
									{match?.matchTime &&
										moment.unix(match?.matchTime).format("DD/MM/YYYY")}
								</div>
							</div>

							<div className="flex items-center   w-[40%]  lg:w-[35%] gap-4">
								<div className="w-6 h-6 lg:w-8 lg:h-8 relative flex-shrink-0 ">
									<Image
										src={"/images/cloud.png"}
										className="object-cover "
										fill
										alt=""
									/>
								</div>
								<span className="text-sm lg:text-base">
									{match?.weather}, {match?.temperature}
								</span>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="flex items-center justify-center">
							<div className="flex items-center justify-end gap-4 w-[45%]">
								<span className="text-sm font-bold text-black capitalize">
									{match?.homeName}
								</span>
								<div className="w-12 h-12 bg-white shadow relative flex-shrink-0 rounded-full">
									<Image
										src={`${match?.homeIcon}` || LOGO_DEFAULT}
										className="object-cover rounded-full p-1"
										fill
										alt=""
									/>
								</div>
							</div>
							<div className="w-[10%] flex items-center justify-center flex-col gap-1">
								<div className="w-[62px] h-[56px]  relative">
									<Image
										src="/images/image 52.png"
										className="object-cover rounded-full p-2"
										fill
										alt=""
									/>
								</div>
								<div className="px-3 py-1 rounded-md bg-[#FF9B00] text-white text-xs font-semibold flex items-center justify-center">
									{/* 22:00 */}
									{match?.matchTime &&
										moment.unix(match?.matchTime).format("HH:mm")}
								</div>
								<div className="text-sm text-[#2C3882] font-medium">
									{match?.matchTime &&
										moment.unix(match?.matchTime).format("DD/MM/YYYY")}
								</div>
							</div>
							<div className="flex items-center gap-4 w-[45%]">
								<div className="w-12 h-12 bg-white shadow relative flex-shrink-0 rounded-full">
									<Image
										src={`${match?.awayIcon}` || LOGO_DEFAULT}
										className="object-cover rounded-full p-1"
										fill
										alt=""
									/>
								</div>
								<span className="text-sm font-bold text-black capitalize">
									{match?.awayName}
								</span>
							</div>
						</div>

						<div className="flex items-center justify-center">
							<div className="flex items-center justify-end w-[35%] gap-4">
								<div className="w-[32px] h-[22px] relative flex-shrink-0 ">
									<Image
										src={"/images/stadium.png"}
										className="object-cover "
										fill
										alt=""
									/>
								</div>
								<span className=""> {match?.location}</span>
							</div>
							<div className="flex items-center justify-center w-[30%] ">
								<button className="bg-brand-red px-4 py-2 rounded-lg gap-x-2 flex items-center shadow-brand-red h-full">
									<IconLiveStream />
									<span className="text-white font-semibold hidden xl:block">
										Live trực tiếp
									</span>
								</button>
							</div>

							<div className="flex items-center  w-[35%] gap-4">
								<div className="w-8 h-8 relative flex-shrink-0 ">
									<Image
										src={"/images/cloud.png"}
										className="object-cover "
										fill
										alt=""
									/>
								</div>
								<span>
									{match?.weather}, {match?.temperature}
								</span>
							</div>
						</div>
					</>
				)}

				{/* Tổng quan */}
				<div className="flex flex-col gap-4 lg:col-span-3">
					<div className="match-live-video-event p-4">
						<h2 className="mb-3 text-2xl font-semibold  text-center">
							Bình chọn
						</h2>
						<div className="flex justify-center p-3">
							<div className="flex items-center justify-center gap-2 lg:gap-4">
								{vote?.home.includes(user?._id) ? (
									<button
										onClick={() => handleUnVote(match?.matchId)}
										className="py-2 px-10 lg:px-20 bg-slate-200 rounded-full shadow-lg text-[#15C071]  ml-3 border font-bold"
									>
										Chủ
									</button>
								) : (
									<button
										onClick={() => handleVote(match?.matchId, "home")}
										className="py-2 px-10 lg:px-20 rounded-full shadow-lg text-[#15C071]  ml-3 border font-bold"
									>
										Chủ
									</button>
								)}
								{vote?.draw.includes(user?._id) ? (
									<button
										onClick={() => handleUnVote(match?.matchId)}
										className="py-2 px-10 lg:px-20 bg-slate-200 rounded-full shadow-lg text-[#FEAD02]  ml-3 border font-bold"
									>
										Hòa
									</button>
								) : (
									<button
										onClick={() => handleVote(match?.matchId, "draw")}
										className="py-2 px-10 lg:px-20 rounded-full shadow-lg text-[#FEAD02]  ml-3 border font-bold"
									>
										Hòa
									</button>
								)}
								{vote?.away.includes(user?._id) ? (
									<button
										onClick={() => handleUnVote(match?.matchId)}
										className="py-2 px-10 lg:px-20 bg-slate-200 rounded-full shadow-lg text-[#BB222F]  ml-3 border font-bold"
									>
										Khách
									</button>
								) : (
									<button
										onClick={() => handleVote(match?.matchId, "away")}
										className="py-2 px-10 lg:px-20 rounded-full shadow-lg text-[#BB222F]  ml-3 border font-bold"
									>
										Khách
									</button>
								)}
							</div>
						</div>
						<div className="mt-3">
							<div className="flex justify-between gap-1">
								<div
									className={`${
										vote?.total === 0
											? "w-1/3"
											: vote?.home.length === 0
											? "hidden"
											: `w-[${
													((vote?.home.length || 0) / (vote?.total || 1)) * 100
											  }%]`
									}`}
								>
									<span className="text-green-500 font-bold">
										{((vote?.home.length || 0) / (vote?.total || 1)) * 100}%
									</span>
									<span className="text-gray-400 text-xs ml-1">
										({vote?.home.length})
									</span>
									<div className="h-[10px] bg-green-600"></div>
								</div>
								<div
									className={`${
										vote?.total === 0
											? "w-1/3"
											: vote?.draw.length === 0
											? "hidden"
											: `w-[${
													((vote?.draw.length || 0) / (vote?.total || 1)) * 100
											  }%]`
									}`}
								>
									<span className="text-blue-500 font-bold">
										{((vote?.draw.length || 0) / (vote?.total || 1)) * 100}%
									</span>
									<span className="text-gray-400 text-xs ml-1">
										({vote?.draw.length})
									</span>
									<div className="h-[10px] bg-blue-600"></div>
								</div>

								<div
									className={`${
										vote?.total === 0
											? "w-1/3"
											: vote?.away.length === 0
											? "hidden"
											: `w-[${
													((vote?.away.length || 0) / (vote?.total || 1)) * 100
											  }%]`
									}`}
								>
									<span className="text-red-500 font-bold">
										{((vote?.away.length || 0) / (vote?.total || 1)) * 100}%
									</span>
									<span className="text-gray-400 text-xs ml-1">
										({vote?.away.length})
									</span>
									<div className="h-[10px] bg-red-600"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* // */}
				<div className="match-detail-layout w-full">
					<ul className="flex items-end justify-center gap-2 transition-all">
						{tabLives.map((tabLive, index) => (
							<li
								key={index}
								className={`inline-flex items-center text-sm lg:text-lg justify-center lg:min-w-[120px] text-white font-medium rounded-t-lg cursor-pointer   px-2.5 py-1 ${
									tabLive.value == "commentary" && "hidden md:block"
								}   ${
									tab == tabLive.value ? "bg-secondary py-2" : "bg-[#ADADAD]"
								}`}
								onClick={() => setTab(tabLive.value)}
							>
								{tabLive.name}
							</li>
						))}
					</ul>
					<div className="match-detail-tab">{renderTab(tab)}</div>
				</div>
			</div>
		</div>
	);
};

export default MatchDetail;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	try {
		const matchId = ctx.query.matchId;
		const url = `https://api.553328.com/api/match-detail?matchId=${matchId}`;

		if (matchId) {
			const [
				result,
				lineup,
				event,
				matchAnalyze,
				originalMatchAnalyze,
				matchDetail,
			] = await Promise.all([
				getMatchById(matchId.toString()),
				getLineUpById(matchId as string),
				getEvent(matchId.toString()),
				getMatchAnalysisAll(matchId.toString()),
				getMatchAnalysisGroupLeague(matchId.toString()),
				axios.post(url),
			]);
			console.log(matchDetail.data?.value?.datas);
			// const result = await getMatchById(matchId.toString());
			// const lineup = await getLineUpById(matchId as string);
			// const event = await getEvent(matchId.toString());
			// const matchAnalyze = await getMatchAnalysisGroupLeague(
			//   matchId.toString()
			//   );
			const match = result.data?.match?.[0];
			const theSportId = converToTheSportId(match?.matchId as string);
			let room: any = {};
			if (match) {
				room = await getRoomByMatchId(match?.matchId);
			}
			return {
				props: {
					match: result.data?.match?.[0],
					matchIdLive:
						result.data?.matchThesport?.find(
							(item: any) => item.match_id == theSportId
						)?.thesports_uuid || "",
					events: event.data?.[0]?.events || [],
					matchAnalysis: matchAnalyze.data?.[0] || {},
					lineup: lineup.data || {},
					room: room.data?.result || {},
					originalMatchAnalysis: originalMatchAnalyze.data || [],
					matchDetail: matchDetail.data?.value?.datas,
				},
			};
		}
		return {
			props: {
				match: {},
				matchIdLive: "",
				events: [],
				matchAnalysis: {},
				lineup: {},
				room: {},
				originalMatchAnalysis: [],
				matchDetail: {},
			},
		};
	} catch (error) {
		console.log("error", error);
		return {
			props: {
				match: {},
				matchIdLive: "",
				events: [],
				matchAnalysis: {},
				lineup: {},
				room: {},
				originalMatchAnalysis: [],
				matchDetail: {},
			},
		};
	}
}
