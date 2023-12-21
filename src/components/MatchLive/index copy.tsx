import {
	LOGO_DEFAULT,
	URL_AMINATION,
	URL_IFRAME_THESPORTS,
	matchStatus,
	notes,
} from "@/constant";
import {useContext, useEffect, useRef, useState} from "react";
import ButtonOnlyIcon from "../button/ButtonOnlyIcon";
import IconSmile from "../icons/Smile";
import IconSend from "../icons/Send";
import ChatHomeItem from "@/containers/Home/ChatHomeItem";
import dynamic from "next/dynamic";
import Image from "next/image";
import {IHotMatch, IMessage, IVote} from "@/interfaces";
import {isPlayingMatches} from "@/utils";
import moment from "moment";
import {axiosInstanceISport} from "@/apis";
import {SocketContext} from "@/context/SocketContext";
import {AuthContext} from "@/context/AuthContext";

import ImageWithFallback from "../imageWithFallback";
import {getVoteByMatchId, unVote, vote as voteMatch} from "@/apis/vote";
import {toast} from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import Auth from "@/layouts/Auth";
import {BsChatFill} from "react-icons/bs";
const ReactHlsPlayer = dynamic(import("react-hls-player"), {ssr: false});
import {IoIosArrowForward} from "react-icons/io";
import {MdKeyboardDoubleArrowRight, MdOutlinePercent} from "react-icons/md";
import Statistic from "../statistic/Statistic";
const NoteItem = ({item}: {item: any}) => {
	return (
		<div className="flex items-center gap-2">
			<Image
				src={item?.image}
				className="lg:w-[24px] lg:h-[24px]"
				width={20}
				height={20}
				alt=""
			/>
			<p>{item?.name}</p>
		</div>
	);
};

const MatchLive = ({
	matchIdLive,
	match,
	event,
	matchAnalysis,
	room,
	messages,
	matchDetail,
}: {
	matchIdLive: string;
	match: IHotMatch;
	event: any[];
	matchAnalysis: any;
	room: any;
	messages: IMessage[];
	matchDetail: any;
}) => {
	const renderEvent = (
		type: number,
		player: string,
		time: number,
		position: string
	) => {
		let image = "/football-note/goal.svg";

		switch (type) {
			case 2:
				image = "/football-note/red-card.svg";
				break;
			case 3:
				image = "/football-note/yellow-card.svg";
				break;
			case 7:
				image = "/football-note/penalty.svg";
				break;
			case 8:
				image = "/football-note/owner-goal.svg";
				break;
			case 9:
				image = "/football-note/second-yellow-card.svg";
				break;
			case 11:
				image = "/football-note/subtitute.png";
				break;
			case 13:
				image = "/football-note/fail-penalty.png";
				break;
		}
		return position == "home" ? (
			<div className="flex items-center gap-2 lg:gap-8 mt-4">
				<div className=" w-[40%] flex justify-end">
					{/* <div className="flex  bg-white shadow-lg rounded-lg p-2 items-center">
						<div className="relative w-5 h-5 lg:w-10 lg:h-10 flex-shrink-0">
							<Image className="object-contain" src={image} fill alt="" />
						</div>
						<p className="ml-1 text-sm">{player}</p>
					</div> */}
				</div>
				<div className="w-[20%]">
					<p className="p-2 rounded-full  flex items-center justify-center event-time text-xs lg:text-md">
						{time}
					</p>
				</div>
				<div className=" w-[40%]"></div>
			</div>
		) : (
			<div className="flex items-center gap-8 mt-4">
				<div className="flex-1"></div>
				<p className="p-2 rounded-full event-time text-xs lg:text-md">{time}</p>
				<div className="flex-1 flex justify-start">
					<div className="flex relative event-item p-2 items-center">
						<Image
							className="lg:w-[24px] lg:h-[24px]"
							src={image}
							width={16}
							height={16}
							alt=""
						/>
						<p className="ml-1">{player}</p>
					</div>
				</div>
			</div>
		);
	};
	const playRef = useRef(null);
	const [isLiveStreamErr, setIsLiveStreamErr] = useState(false);
	const [content, setContent] = useState("");
	const {user, setIsOpen} = useContext(AuthContext);
	const socket: any = useContext(SocketContext);
	const [showEmoji, setShowEmoji] = useState(false);
	const [vote, setVote] = useState<IVote>();
	const [hiddenChat, setHiddenChat] = useState(false);

	const handleSendMessage = async () => {
		try {
			if (!content?.trim()) return;
			const data = {
				user: {
					_id: user?._id,
				},
				content,
				room: room?._id,
			};

			socket.emit("send_message", data);

			setContent("");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div
				className={`match-live-layout grid lg:grid-cols-4 w-full mb-4 gap-4`}
			>
				{/* Livestream */}
				<div
					className={`match-live-video-wrapper ${
						hiddenChat ? "lg:col-span-4" : "lg:col-span-3"
					} h-[300px] sm:h-[500px] md:h-[600px] lg:h-[700px]`}
				>
					{isLiveStreamErr ? (
						<iframe
							src={`${URL_AMINATION}?matchId=${match?.matchId}&accessKey=tEFL6ClbFnfkvmEn0xspIVQyPV9jAz9u&lang=vi&statsPanel=hide`}
							width="100%"
							height="100%"
						></iframe>
					) : (
						<>
							<ReactHlsPlayer
								playerRef={playRef}
								src={`${matchDetail?.linkLive || matchDetail?.linkLiveFlv}`}
								width="100%"
								height="100%"
								autoPlay={true}
								controls={true}
								className="w-full h-full"
							/>
						</>
					)}

					{hiddenChat && (
						<button
							onClick={() => setHiddenChat(false)}
							className="w-[40px] h-[40px] fixed bottom-[20px] lg:bottom-[40px] right-[20px] lg:right-[40px] bg-secondary text-white rounded-full flex items-center justify-center cursor-pointer"
						>
							<BsChatFill className="w-[20px] h-[20px]" />
						</button>
					)}
				</div>

				{/* Chat */}
				<div
					className={`${
						hiddenChat ? "hidden" : ""
					} chat-tab chat-tab-live-match lg:col-span-1 h-fit`}
				>
					<div className="chat-tab-header p-2 text-white bg-secondary rounded-t-xl flex justify-between items-center">
						<p>Nơi tán gẫu ({messages?.length})</p>
						<div
							onClick={() => setHiddenChat(true)}
							className="bg-black p-1 rounded cursor-pointer"
						>
							Ẩn chat
						</div>
					</div>
					<div className="message-list px-4 py-2 h-[400px] overflow-auto flex flex-col-reverse">
						{messages?.map((item) => (
							<ChatHomeItem key={item?._id} message={item} />
						))}
					</div>
					<div className="message-input bg-secondary px-4 py-2 rounded-b-xl">
						<div
							className={`w-full emoji-home-wrapper ${showEmoji ? "show" : ""}`}
						>
							<EmojiPicker
								searchDisabled
								skinTonesDisabled
								width={"100%"}
								height={300}
								previewConfig={{
									showPreview: false,
								}}
								lazyLoadEmojis
								onEmojiClick={(e) => {
									setContent(content + e?.emoji);
								}}
							/>
						</div>
						{user ? (
							<>
								<div className="flex items-center justify-between">
									<ButtonOnlyIcon onClick={() => setShowEmoji(!showEmoji)}>
										<IconSmile />
									</ButtonOnlyIcon>

									<div className="text-white font-semi">
										{content?.length}/200
									</div>
								</div>
								<div className="flex items-center bg-white justify-between rounded-lg px-4 py-2 gap-x-2 w-full mt-1">
									<input
										value={content}
										onChange={(e) => {
											if (
												e?.target?.value?.length &&
												e?.target?.value?.length > 200
											)
												return;
											setContent(e.target.value);
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.keyCode === 13) {
												handleSendMessage();
											}
										}}
										className="focus:border-0 focus:outline-0 w-full"
										placeholder="Chia sẻ quan điểm của bạn..."
									/>
									<ButtonOnlyIcon onClick={handleSendMessage}>
										<IconSend />
									</ButtonOnlyIcon>
								</div>
							</>
						) : (
							<Auth type={"text"} />
						)}
					</div>
				</div>
				{/* Tổng quan */}
				<div className="flex flex-col gap-4 lg:col-span-3">
					<div className="match-live-video-event min-h-[450px] w-full ">
						<div className="match-live-video-event-header p-2 px-4 text-white bg-secondary rounded-t-xl">
							Tổng quan
						</div>
						<div className="match-live-video-event-team flex py-2 px-4 justify-between bg-[#FFAD01]">
							<div className="match-live-video-event-team-home flex items-center gap-4">
								<Image
									src={match.homeIcon || LOGO_DEFAULT}
									alt="logo-home"
									width={32}
									height={32}
									className="lg:w-[56px] lg:h-[56px]"
								/>
								<p className="font-bold text-md lg:text-[18px]">
									{match.homeName}
								</p>
							</div>
							<div className="match-live-video-event-team-away flex items-center gap-4">
								<p className="text-md lg:text-[18px] font-bold">
									{match.awayName}
								</p>
								<Image
									src={match.awayIcon || LOGO_DEFAULT}
									alt="logo-home"
									width={32}
									height={32}
									className="lg:w-[56px] lg:h-[56px]"
								/>
							</div>
						</div>
						<div className="flex-1">
							<div className="flex mt-8 justify-center">
								<div className="match-live-video-event-status py-2 px-8">
									<p className="text-[18px] font-bold text-center">
										{matchStatus[match.status?.toString()]}
									</p>
									<p className="text-[18px] font-bold text-center text-time-red">
										{isPlayingMatches(match.status) || match.status == -1
											? `${match.homeScore} - ${match.awayScore}`
											: "? - ?"}
									</p>
								</div>
							</div>
							<div className="relative mb-4">
								<div className="">
									{event?.map((item: any) => {
										return renderEvent(
											item?.type,
											item?.playerName,
											item?.minute,
											item?.homeEvent ? "home" : "away"
										);
									})}
								</div>
								<div className="match-live-video-event-tree absolute">
									<div className="match-live-video-event-tree-list h-full"></div>
								</div>
							</div>
						</div>
						<div className="p-2">
							{match?.status === -1 && <Statistic matchId={match?.matchId} />}
						</div>
						<div className="match-live-video-note-wrapper p-2">
							<div className="match-live-video-note p-2">
								<p className="text-secondary font-bold">Ghi chú: </p>
								<div className="mt-2 flex flex-wrap gap-4 text-sm lg:text-md">
									{notes?.map((item) => (
										<NoteItem item={item} key={item?.name} />
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Thống kê */}
				<div className="p-4 match-live-introduce-content lg:col-span-1">
					<p className="text-secondary text-[18px] font-bold">Thống kê</p>
					<p className="text-[16px] font-bold mt-2">Giới thiệu trận đấu: </p>
					<p className="text-[16px] mt-2">
						Tý số trực tiếp {match.homeName} vs {match.awayName} (và phát trực
						tiếp video trực tiếp) bắt đầu vào{" "}
						{moment(match.matchTime * 1000).format("DD/MM/YYYY HH:mm A")} ở Giải{" "}
						{match?.leagueName}. Tại đây trên livescore
						{match.homeName} vs {match.awayName}, bạn có thể tìm thấy tất cả các
						kết quả {match.homeName} vs {match.awayName} trước đó được sắp xếp
						theo các trận đấu H2H của họ
					</p>
					<p className="text-[16px] font-bold mt-2">Chi tiết trận đấu: </p>
					<p className="text-[16px]  mt-2">
						Sự kiện: Giải {match?.leagueName}.
					</p>
					<p className="text-[16px]  mt-1">
						Tên: {match.homeName} vs {match.awayName}
					</p>
					<p className="text-[16px]  mt-1">
						Thời gian:{" "}
						{moment(match.matchTime * 1000).format("DD/MM/YYYY HH:mm A")}
					</p>
					Sân vận động: {match?.location}
				</div>
			</div>
		</>
	);
};

export default MatchLive;
