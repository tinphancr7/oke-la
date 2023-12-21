import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconSend from "@/components/icons/Send";
import IconSmile from "@/components/icons/Smile";
import React, {useState, useEffect, useMemo, useContext} from "react";
import ChatHomeItem from "./ChatHomeItem";
import RankHomeItem from "./RankHomeItem";
import {SocketContext} from "@/context/SocketContext";
import {useAppDispatch, useAppSelector} from "@/redux";

import {IMessage, IRank} from "@/interfaces";
import {AuthContext} from "@/context/AuthContext";
import EmojiPicker from "emoji-picker-react";
import Auth from "@/layouts/Auth";
import {getRankUsers} from "@/apis/user";

type Props = {
	home?: boolean;
};
const rankListUser = [
	{
		id: 1,
		name: "Ngày",
		type: "day",
	},
	{
		id: 2,
		name: "Tuần",
		type: "week",
	},
	{
		id: 3,
		name: "Tháng",
		type: "month",
	},
	{
		id: 4,
		name: "Năm",
		type: "year",
	},
];
function ChatRankHome({home = false}: Props) {
	const {user, setIsOpen} = useContext(AuthContext);
	const [rankUsers, setRankUsers] = useState<any>([]);

	const {messagesHome, totalDocHome} = useAppSelector((state) => state.message);

	const [tab, setTab] = useState<"chat" | "rank">("chat");
	const [tabRank, setTabRank] = useState<number>(1);
	const [content, setContent] = useState("");
	const [typeRankUser, setTypeRankUser] = useState<string>("day");
	const socket: any = useContext(SocketContext);
	const [showEmoji, setShowEmoji] = useState(false);

	const tabs = useMemo(() => {
		return [
			{
				id: 1,
				title: `Nơi tán gẫu (${totalDocHome})`,
				value: "chat",
			},
			// {
			//   id: 2,
			//   title: "Bảng xếp hạng",
			//   value: "rank",
			// },
		];
	}, [totalDocHome]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getRankUsers(typeRankUser);
				setRankUsers(data?.data?.result);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData(); // Call the async function immediately
	}, [typeRankUser]);
	const handleSendMessage = async () => {
		try {
			if (!content?.trim()) return;

			const data = {
				user: {
					_id: user?._id,
				},
				content,
				isHome: true,
			};

			socket.emit("send_message_home", data);

			setContent("");
		} catch (error) {
			console.log(error);
		}
	};

	const render = {
		chat: (
			<div className="chat-tab">
				<div
					className={`message-list px-4 py-2 custom-scroll ${
						home ? "bg-[#fff]" : ""
					}`}
				>
					{messagesHome?.map((item: IMessage) => (
						<ChatHomeItem message={item} key={item?._id} />
					))}
				</div>

				<div className="message-input bg-secondary px-4 py-2">
					{!user && <Auth type={"text"} />}
					{user && (
						<>
							<div
								className={`w-full emoji-home-wrapper ${
									showEmoji ? "show" : ""
								}`}
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

							<div className="flex items-center justify-between">
								<ButtonOnlyIcon onClick={() => setShowEmoji(!showEmoji)}>
									<IconSmile />
								</ButtonOnlyIcon>

								<div className="text-white font-semi">
									{content?.length || 0}/200
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
					)}
				</div>
			</div>
		),
		rank: (
			<div className="rank-tab">
				<div
					className={`rank-list px-4 py-2 custom-scroll ${
						home ? "bg-[#fff]" : ""
					}`}
				>
					{rankListUser?.map((item, index) => (
						<button
							key={index}
							type="button"
							onClick={() => setTypeRankUser(item?.type)}
							className={` bg-gradient-to-r ${
								typeRankUser === item?.type
									? "from-[#a95e01] via-[#a95e01] to-[#a95e01] text-white"
									: "border text-black"
							} hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 my-2 shadow-lg`}
						>
							{item?.name}
						</button>
					))}

					{rankUsers[0]?.data?.map((item: any, index: number) => (
						<RankHomeItem
							index={index + 1}
							user={item as any}
							key={item?._id}
						/>
					))}
				</div>
			</div>
		),
	};

	return (
		<div className="chat-rank-home w-full mt-4 lg:mt-0">
			<div className="chat-rank-home-tabs ">
				{tabs?.map((item) => (
					<div
						key={item?.id}
						className="bg-secondary text-white font-medium w-full rounded-t-lg flex items-center justify-center py-2 "
						onClick={() => setTab(item?.value as "chat" | "rank")}
					>
						{item?.title}
					</div>
				))}
			</div>
			{render[tab]}
		</div>
	);
}

export default ChatRankHome;
