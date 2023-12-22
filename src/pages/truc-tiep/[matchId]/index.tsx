import {getMatchById} from "@/apis/match";
import {getRoomByMatchId} from "@/apis/room";
import {getVoteByMatchId, unVote, vote as voteMatch} from "@/apis/vote";
import Breadcrumb from "@/components/Breadcrumb";
import Commentary from "@/components/DetailMatch/Commentary";
import MatchLive from "@/components/MatchLive";
import IconLiveStream from "@/components/icons/LiveStream";
import RankTable from "@/components/rankTable";
import {LOGO_DEFAULT} from "@/constant";
import H2H from "@/containers/H2H";
import LineUp from "@/containers/LiveStream/LineUp";
import {AuthContext} from "@/context/AuthContext";
import {SocketContext} from "@/context/SocketContext";
import {IMessage} from "@/interfaces";
import {useQuery, useQueryClient} from "@tanstack/react-query";

import moment from "moment";

import Image from "next/image";

import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import "react-dropdown/style.css";
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

const MatchDetail = () => {
	const {user} = useContext(AuthContext);
	const router = useRouter();
	const {matchId} = router.query;
	const queryClient = useQueryClient();
	const socket: any = useContext(SocketContext);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [tab, setTab] = useState<matchType>("main");

	//vote

	const {data} = useQuery({
		queryKey: ["match", matchId],
		queryFn: () => getMatchById(matchId as any),
		enabled: !!matchId,
	});

	const matchData = data?.data?.match?.[0];
	const {data: roomData} = useQuery({
		queryKey: ["room", matchId],
		queryFn: () => getRoomByMatchId(matchId as any),
		enabled: !!matchId,
	});
	const room = roomData?.data?.result;

	const {data: voteData} = useQuery({
		queryKey: ["vote", matchId],
		queryFn: () => getVoteByMatchId(matchId as any),
		enabled: !!matchId,
	});
	const vote = voteData?.data?.result;

	const handleVote = async (matchId: string, voteType: string) => {
		try {
			if (!user) {
				toast.error("Bạn cần đăng nhập để thực hiện tính năng này");
			} else {
				const res = await voteMatch({matchId, voteType});
				if (res.data?.status === 1) {
					toast.success("Bình chọn thành công");
					queryClient.invalidateQueries(["vote", matchId]);
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
				queryClient.invalidateQueries(["vote", matchId]);
			} else {
				toast.error("Bỏ bình chọn thất bại");
			}
		} catch (error) {
			toast.error("Bỏ bình chọn thất bại");
		}
	};
	//
	useEffect(() => {
		if (socket && matchId) {
			socket.emit("join_room", {
				matchId,
			});

			socket.on("receive_message", (data: any) => {
				setMessages((prevState) => {
					return [data, ...prevState];
				});
			});
		}
		return () => {
			socket?.emit("leave_room", {
				matchId,
			});
		};
	}, [matchId, socket]);

	useEffect(() => {
		setMessages(room?.messages);
	}, [room, matchId]);

	const renderTab = (tab: matchType) => {
		switch (tab) {
			case "main":
				return (
					<MatchLive
						match={matchData}
						matchId={matchId}
						room={room?.room || {}}
						messages={messages}
					/>
				);
			case "h2h":
				return <H2H matchId={matchId} match={matchData} />;
			case "lineup":
				return <LineUp matchId={matchId} />;
			case "rank":
				return (
					<RankTable
						leagueId={matchData?.leagueId || ""}
						leagueType={matchData?.leagueType}
					/>
				);
			case "commentary":
				return <Commentary matchId={matchId} match={matchData} />;
		}
	};

	return (
		<div className="match-list-detail pt-2 xl:container mx-auto md:px-4 xl:px-2">
			<div className="match-list-detail-header hidden lg:block ">
				<Breadcrumb
					backLink="/truc-tiep"
					breadCrumb={[
						{title: "Bóng đá trực tiếp", url: "/truc-tiep"},
						{title: `Giải bóng đá ${matchData?.leagueName}`, url: "/truc-tiep"},
					]}
				/>
			</div>
			<div className="bg-[#F1F1F1] w-full  flex flex-col gap-5 mt-4  h-fit">
				<div className="flex items-center justify-center">
					<div className="clip-custom text-white relative">
						<div className="absolute -top-[25px] left-[50%] -translate-x-[50%] text-xs  text-white font-semibold uppercase w-full text-center">
							{matchData?.leagueName}
						</div>
					</div>
				</div>
				{matchData?.status === -1 ? (
					<div className="px-2">
						<div className="flex items-center justify-center">
							<div className="flex items-center justify-end gap-2 lg:gap-4 w-[40%] lg:w-[45%]">
								<span className="text-xs lg:text-lg font-bold text-black capitalize">
									{matchData?.homeName}
								</span>
								<div className="w-8 h-8 lg:w-12 lg:h-12 bg-white shadow relative flex-shrink-0 rounded-full">
									<Image
										src={`${matchData?.homeIcon}` || LOGO_DEFAULT}
										className="object-cover rounded-full p-1"
										fill
										alt=""
									/>
								</div>
							</div>
							<div className="w-[20%] lg:w-[10%] flex items-center justify-center flex-col gap-1 font-bold text-red-500 text-base lg:text-xl">
								{matchData?.homeScore} - {matchData?.awayScore}
							</div>
							<div className="flex items-center gap-2 lg:gap-4 w-[40%] lg:w-[45%]">
								<div className="w-8 h-8 lg:w-12 lg:h-12 bg-white shadow relative flex-shrink-0 rounded-full">
									<Image
										src={`${matchData?.awayIcon}` || LOGO_DEFAULT}
										className="object-cover rounded-full p-1"
										fill
										alt=""
									/>
								</div>
								<span className="text-xs lg:text-lg font-bold text-black capitalize">
									{matchData?.awayName}
								</span>
							</div>
						</div>

						<div className="flex items-center justify-center gap-2">
							<div className="flex items-center justify-end w-[40%]  lg:w-[35%] gap-2 lg:gap-4">
								<div className="w-6 h-4 lg:w-8 lg:h-[22px] relative flex-shrink-0 ">
									<Image
										src={"/images/stadium.png"}
										className="object-cover "
										fill
										alt=""
									/>
								</div>
								<span className="text-xs lg:text-base">
									{" "}
									{matchData?.location}
								</span>
							</div>
							<div className="flex flex-col gap-1 items-center justify-center w-[20%] lg:w-[30%] ">
								<div className="px-3 py-1 rounded-md bg-[#FF9B00] text-white text-xs font-semibold flex items-center justify-center">
									{matchData?.matchTime &&
										moment.unix(matchData?.matchTime).format("HH:mm")}
								</div>
								<div className="text-xs lg:text-sm text-[#2C3882] font-medium">
									{matchData?.matchTime &&
										moment.unix(matchData?.matchTime).format("DD/MM/YYYY")}
								</div>
							</div>

							<div className="flex items-center   w-[40%]  lg:w-[35%] gap-2 lg:gap-4">
								<div className="w-6 h-6 lg:w-8 lg:h-8 relative flex-shrink-0 ">
									<Image
										src={"/images/cloud.png"}
										className="object-cover "
										fill
										alt=""
									/>
								</div>
								<span className="text-xs lg:text-base">
									{matchData?.weather}, {matchData?.temperature}
								</span>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className="flex items-center justify-center">
							<div className="flex items-center justify-end gap-4 w-[45%]">
								<span className="text-sm font-bold text-black capitalize">
									{matchData?.homeName}
								</span>
								<div className="w-12 h-12 bg-white shadow relative flex-shrink-0 rounded-full">
									<Image
										src={`${matchData?.homeIcon}` || LOGO_DEFAULT}
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
									{matchData?.matchTime &&
										moment.unix(matchData?.matchTime).format("HH:mm")}
								</div>
								<div className="text-sm text-[#2C3882] font-medium">
									{matchData?.matchTime &&
										moment.unix(matchData?.matchTime).format("DD/MM/YYYY")}
								</div>
							</div>
							<div className="flex items-center gap-4 w-[45%]">
								<div className="w-12 h-12 bg-white shadow relative flex-shrink-0 rounded-full">
									<Image
										src={`${matchData?.awayIcon}` || LOGO_DEFAULT}
										className="object-cover rounded-full p-1"
										fill
										alt=""
									/>
								</div>
								<span className="text-sm font-bold text-black capitalize">
									{matchData?.awayName}
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
								<span className=""> {matchData?.location}</span>
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
									{matchData?.weather}, {matchData?.temperature}
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
										onClick={() => handleUnVote(matchData?.matchId)}
										className="py-2 px-10 lg:px-20 bg-slate-200 rounded-full shadow-lg text-[#15C071]  ml-3 border font-bold"
									>
										Chủ
									</button>
								) : (
									<button
										onClick={() => handleVote(matchData?.matchId, "home")}
										className="py-2 px-10 lg:px-20 rounded-full shadow-lg text-[#15C071]  border font-bold"
									>
										Chủ
									</button>
								)}
								{vote?.draw.includes(user?._id) ? (
									<button
										onClick={() => handleUnVote(matchData?.matchId)}
										className="py-2 px-10 lg:px-20 bg-slate-200 rounded-full shadow-lg text-[#FEAD02]  ml-3 border font-bold"
									>
										Hòa
									</button>
								) : (
									<button
										onClick={() => handleVote(matchData?.matchId, "draw")}
										className="py-2 px-10 lg:px-20 rounded-full shadow-lg text-[#FEAD02]   border font-bold"
									>
										Hòa
									</button>
								)}
								{vote?.away.includes(user?._id) ? (
									<button
										onClick={() => handleUnVote(matchData?.matchId)}
										className="py-2 px-10 lg:px-20 bg-slate-200 rounded-full shadow-lg text-[#BB222F]  ml-3 border font-bold"
									>
										Khách
									</button>
								) : (
									<button
										onClick={() => handleVote(matchData?.matchId, "away")}
										className="py-2 px-10 lg:px-20 rounded-full shadow-lg text-[#BB222F]  border font-bold"
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
