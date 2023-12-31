import {likeLeague, likeMatch, unLikeMatch, unlikeLeague} from "@/apis/user";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconCornerKick from "@/components/icons/CornerKick";
import IconStar from "@/components/icons/Star";
import LiveMatchTime from "@/components/renderLiveMatchTime";
import {AuthContext} from "@/context/AuthContext";
import {IMatch, IMatchGroupLeague} from "@/interfaces";
import {converToTheSportId, isPlayingMatches} from "@/utils";
import moment from "moment";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useContext, useState} from "react";
import {AiFillStar} from "react-icons/ai";
import {toast} from "react-toastify";
import Image from "next/image";
import slugify from "slugify";
import {useQueryClient} from "@tanstack/react-query";
import {getEvent, getMatchById} from "@/apis/match";
import StatsApi from "@/apis/statistic.api";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

interface IMatchWithOdds extends IMatch {
	handicap: string;
	overUnder: string;
}
const listStatus = [-1, 1, 2, 3, 4, 5];
const MatchHomeItem = ({
	match,
	matchThesport,
}: {
	match: IMatchWithOdds;
	matchThesport: any[];
}) => {
	const {user, updateAuthUser} = useContext(AuthContext);
	const router = useRouter();
	const queryClient = useQueryClient();
	const prefetchingData = async (matchId: any) => {
		await queryClient.prefetchQuery({
			queryKey: ["match", matchId],
			queryFn: () => getMatchById(matchId as any),
		});
		await queryClient.prefetchQuery({
			queryKey: ["events", matchId],
			queryFn: () => getEvent(matchId.toString()),
		});
		await queryClient.prefetchQuery({
			queryKey: ["stats", matchId],
			queryFn: () => StatsApi.getMatchStats(matchId),
		});
	};

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

	return (
		<div
			className="bg-white   px-4 py-2 w-full flex items-center justify-between border-t"
			onMouseMove={() => prefetchingData(match?.matchId)}
		>
			<div
				className="flex items-center justify-between gap-x-2"
				style={{width: "calc(100% - 100px)"}}
			>
				{user?.matchs?.includes(match?.matchId) ? (
					<ButtonOnlyIcon onClick={() => handleUnLikeMatch(match?.matchId)}>
						<AiFillStar color={"#ffad01"} size={24} />
					</ButtonOnlyIcon>
				) : (
					<ButtonOnlyIcon onClick={() => handleLikeMatch(match?.matchId)}>
						<IconStar color="#C2C2C2" />
					</ButtonOnlyIcon>
				)}
				<div className="text-xs w-[40px]">
					{moment(match?.matchTime * 1000).format("HH:mm")}
				</div>
				<div className="text-xs w-[40px] text-center">
					{match?.status == -1 ? (
						<div>Hết</div>
					) : isPlayingMatches(match?.status) ? (
						<LiveMatchTime match={match} />
					) : (
						<div>-</div>
					)}
				</div>
				<div className="w-[400px]">
					<Link href={`/truc-tiep/${match?.matchId}`}>
						{/* home team */}
						<div className="flex items-center justify-between">
							<div className="w-full flex-1 flex gap-x-2 items-center">
								<div className="bg-light p-1.5 rounded-full">
									<Image
										width={22}
										height={22}
										src={match?.homeIcon || "/images/no-image-logo-team.png"}
										alt=""
									/>
								</div>
								<div className="font-semibold text-sm">{match?.homeName}</div>
							</div>

							<div className="flex items-center gap-2 justify-between w-[90px]">
								<div className="text-black font-medium">
									{listStatus.includes(match?.status) ? match?.homeScore : "-"}
								</div>
								<div className="text-black text-sm">
									HT{" "}
									{listStatus.includes(match?.status) && (
										<span>
											{match?.homeHalfScore}-{match?.awayHalfScore}
										</span>
									)}
								</div>
							</div>
						</div>
						{/* away team */}
						<div className="flex items-center justify-between mt-2">
							<div className="w-full flex-1 flex gap-x-2 items-center">
								<div className="bg-light p-1.5 rounded-full">
									<Image
										width={22}
										height={22}
										src={match?.awayIcon || "/images/no-image-logo-team.png"}
										alt=""
									/>
								</div>
								<Link href={`/truc-tiep/${match?.matchId}`}>
									<div className="font-semibold text-sm">{match?.awayName}</div>
								</Link>
							</div>
							<div className="flex items-center justify-between w-[90px] gap-2">
								<div className="text-black font-medium">
									{listStatus.includes(match?.status) ? match?.awayScore : "-"}
								</div>
								<div className="flex items-center justify-between text-sm text-black mt-1">
									<IconCornerKick />
									{listStatus.includes(match?.status) && (
										<div className="ml-1">
											{match?.homeCorner}-{match?.awayCorner}
										</div>
									)}
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>

			{/* Live */}
			<div>
				<Link href={`/truc-tiep/${match?.matchId}`}>
					<ButtonOnlyIcon>
						{matchThesport?.find(
							(item) => item?.match_id == converToTheSportId(match?.matchId)
						)?.thesports_uuid ? (
							<Image
								alt="okchoi"
								width={45}
								height={45}
								src={"/icons/live-icon.png"}
							/>
						) : (
							<Image
								alt="okchoi"
								width={30}
								height={30}
								src={"/icons/play.svg"}
							/>
						)}
					</ButtonOnlyIcon>
				</Link>
			</div>
		</div>
	);
};

type Props = {
	matchThesport: any[];
	matchGroupLeague: IMatchGroupLeague;
	isGroup?: boolean;
};

function ListMatchHomeItem({
	matchGroupLeague,
	matchThesport,
	isGroup = true,
}: Props) {
	const [showMore, setShowMore] = useState(true);

	const {user, updateAuthUser} = useContext(AuthContext);
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

	return (
		<div className="hidden lg:block">
			<div className="bg-secondary px-4 py-2 border-b-2 border-primary text-white text-sm flex items-center justify-between rounded-t-[8px]">
				<div
					style={{width: "calc(100% - 100px)"}}
					className="flex items-center gap-x-2"
				>
					{user?.leagues?.includes(matchGroupLeague?._id) ? (
						<ButtonOnlyIcon
							onClick={() => handleUnLikeLeague(matchGroupLeague?._id)}
						>
							<AiFillStar color={"#ffad01"} size={24} />
						</ButtonOnlyIcon>
					) : (
						<ButtonOnlyIcon
							onClick={() => handleLikeLeague(matchGroupLeague?._id)}
						>
							<IconStar color="#ffffff" />
						</ButtonOnlyIcon>
					)}
					<Link
						href={`/xem-giai-dau/${slugify(
							matchGroupLeague?.leagueName
						).toLowerCase()}?leagueId=${matchGroupLeague?._id}&tab=${1}`}
					>
						<span className="text-sm" style={{fontWeight: 200}}>
							{(matchGroupLeague as any)?.profile?.country}:{" "}
						</span>
						<span className="font-bold">
							{matchGroupLeague?.leagueName}{" "}
							{isGroup
								? `(${matchGroupLeague?.listMatches?.length || 0})`
								: null}
						</span>
					</Link>
					<span
						className="inline-block pl-2 cursor-pointer"
						onClick={() => setShowMore(!showMore)}
					>
						{showMore ? (
							<IoIosArrowDown size={20} />
						) : (
							<IoIosArrowUp size={20} />
						)}
					</span>
				</div>
				<div style={{width: "100px"}} className="text-right">
					Live
				</div>
			</div>

			{showMore &&
				(isGroup ? matchGroupLeague?.listMatches : [matchGroupLeague])?.map(
					(item) => (
						<MatchHomeItem
							matchThesport={matchThesport}
							match={item}
							key={item?._id}
						/>
					)
				)}
		</div>
	);
}

export default React.memo(ListMatchHomeItem);
