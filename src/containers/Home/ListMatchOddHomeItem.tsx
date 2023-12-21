import {likeLeague, likeMatch, unLikeMatch, unlikeLeague} from "@/apis/user";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconStar from "@/components/icons/Star";
import LiveMatchTime from "@/components/renderLiveMatchTime";
import {AuthContext} from "@/context/AuthContext";
import {IMatch, IMatchGroupLeague} from "@/interfaces";
import {
	converToTheSportId,
	convertStringOddToArray,
	convertToOdd,
	isPlayingMatches,
} from "@/utils";
import moment from "moment";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useContext, useState} from "react";
import {AiFillStar} from "react-icons/ai";
import {toast} from "react-toastify";
import Image from "next/image";
import slugify from "slugify";

const compareStringFloatOdds = (initial: any, instant: any) => {
	if (initial !== undefined) {
		let a = parseFloat(initial).toFixed(2);
		let b = parseFloat(instant).toFixed(2);
		if (a > b) {
			return (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: 3,
					}}
				>
					<div className="oddDowns">{instant} </div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="8"
						height="6"
						viewBox="0 0 8 6"
						fill="none"
					>
						<path
							d="M4 6L0.535899 -6.52533e-07L7.4641 -4.68497e-08L4 6Z"
							fill="#D41115"
						/>
					</svg>
				</div>
			);
		} else if (a == b) {
			return (
				<div style={{display: "flex", justifyContent: "center"}}>
					<div style={{display: "flex", justifyContent: "center"}}>
						{instant}{" "}
					</div>
				</div>
			);
		} else {
			return (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: 3,
					}}
				>
					<div style={{display: "flex", justifyContent: "center"}}>
						{instant}{" "}
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="8"
						height="6"
						viewBox="0 0 8 6"
						fill="none"
					>
						<path d="M4 0L7.4641 6L0.535898 6L4 0Z" fill="#31823F" />
					</svg>
				</div>
			);
		}
	}
};

interface IMatchWithOdds extends IMatch {
	handicap: string;
	overUnder: string;
	europeOdds: string;
}

const MatchHomeOddItem = ({
	match,
	matchThesport,
}: {
	match: IMatchWithOdds;
	matchThesport: any[];
}) => {
	const {user, updateAuthUser} = useContext(AuthContext);
	const [showOdd1, setShowOdd1] = useState(false);
	const [showOdd2, setShowOdd2] = useState(false);
	const [modalDetail, setModalDetail] = useState(false);
	const router = useRouter();

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
		<div className="bg-white px-4 py-2 w-full flex items-stretch justify-between border-t gap-4">
			<div
				className="flex items-center justify-between gap-x-4"
				style={{width: "50%"}}
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
				<div className="text-xs w-[40px] text-center">
					{match?.status == -1 ? (
						<div>Hết</div>
					) : isPlayingMatches(match?.status) ? (
						<LiveMatchTime match={match} />
					) : (
						<div>{moment(match?.matchTime * 1000).format("HH:mm")}</div>
					)}
				</div>
				<div className="w-full">
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
							<div className="bg-secondary w-6 h-6 text-sm flex items-center justify-center text-white">
								{match?.homeScore}
							</div>{" "}
						</div>
						{/* away team */}
						<div className="flex items-center justify-between mt-2">
							<div className="w-full flex-1 flex gap-x-2 items-center">
								<div className="bg-light p-1.5 rounded-full">
									<img
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
							<div className="bg-secondary w-6 h-6 text-sm flex items-center justify-center text-white">
								{match?.awayScore}
							</div>
						</div>
						<div className="mt-1 font-semibold text-sm min-h-[34px]">Hòa</div>
					</Link>
				</div>
			</div>

			{/* cược chấp */}
			<div className="w-[15%] text-xs font-semibold">
				<div className="bg-[#EDEDED] p-1 flex items-center justify-between w-full mt-[7px]">
					<div>
						{Number(convertStringOddToArray(match?.handicap)?.[5]) >= 0
							? convertToOdd(convertStringOddToArray(match?.handicap)?.[5])
							: ""}
					</div>

					<div className="font-bold">
						{convertStringOddToArray(match?.handicap)?.[6]
							? compareStringFloatOdds(
									convertStringOddToArray(match?.handicap)?.[3],
									convertStringOddToArray(match?.handicap)?.[6]
							  )
							: "-"}
					</div>
				</div>

				<div className="bg-[#EDEDED] p-1 flex items-center justify-between w-full mt-[18px]">
					<div>
						{Number(convertStringOddToArray(match?.handicap)?.[5]) < 0
							? convertToOdd(convertStringOddToArray(match?.handicap)?.[5])
							: ""}
					</div>

					<div className="font-bold">
						{convertStringOddToArray(match?.handicap)?.[7]
							? compareStringFloatOdds(
									convertStringOddToArray(match?.handicap)?.[4],
									convertStringOddToArray(match?.handicap)?.[7]
							  )
							: "-"}
					</div>
				</div>
			</div>

			{/* tài xỉu */}
			<div className="w-[15%] text-xs font-semibold">
				<div className="bg-[#EDEDED] p-1 flex items-center justify-between w-full mt-[7px]">
					<div>
						{Number(convertStringOddToArray(match?.overUnder)?.[5]) >= 0
							? convertToOdd(convertStringOddToArray(match?.overUnder)?.[5])
							: ""}
					</div>

					<div className="font-bold">
						{convertStringOddToArray(match?.overUnder)?.[6]
							? compareStringFloatOdds(
									convertStringOddToArray(match?.overUnder)?.[3],
									convertStringOddToArray(match?.overUnder)?.[6]
							  )
							: "-"}
					</div>
				</div>

				<div className="bg-[#EDEDED] p-1 flex items-center justify-between w-full mt-[18px]">
					<div>u</div>

					<div className="font-bold">
						{convertStringOddToArray(match?.overUnder)?.[7]
							? compareStringFloatOdds(
									convertStringOddToArray(match?.overUnder)?.[4],
									convertStringOddToArray(match?.overUnder)?.[7]
							  )
							: "-"}
					</div>
				</div>
			</div>

			{/* tài xỉu */}
			<div className="w-[10%] text-xs font-semibold">
				<div className="bg-[#EDEDED] p-1 text-right w-full mt-[7px]">
					{convertStringOddToArray(match?.europeOdds)?.[5]
						? compareStringFloatOdds(
								convertStringOddToArray(match?.europeOdds)?.[2],
								convertStringOddToArray(match?.europeOdds)?.[5]
						  )
						: "-"}
				</div>

				<div className="bg-[#EDEDED] p-1 text-right w-full mt-[18px]">
					{convertStringOddToArray(match?.europeOdds)?.[6]
						? compareStringFloatOdds(
								convertStringOddToArray(match?.europeOdds)?.[3],
								convertStringOddToArray(match?.europeOdds)?.[6]
						  )
						: "-"}
				</div>

				<div className="bg-[#EDEDED] p-1 text-right w-full mt-[16px]">
					{convertStringOddToArray(match?.europeOdds)?.[7]
						? compareStringFloatOdds(
								convertStringOddToArray(match?.europeOdds)?.[4],
								convertStringOddToArray(match?.europeOdds)?.[7]
						  )
						: "-"}
				</div>
			</div>

			{/* Live */}
			<div className="w-[10%] min-h-full flex items-center justify-end">
				<Link href={`/ty-le-keo/${match?.matchId}`}>
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

function ListMatchOddHomeItem({
	matchGroupLeague,
	matchThesport,
	isGroup = true,
}: Props) {
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
			<div className="bg-secondary px-4 py-2 border-b-2 border-primary text-white text-sm flex items-center justify-between rounded-t-[8px] gap-4">
				<div style={{width: "50%"}} className="flex items-center gap-x-2">
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
						).toLowerCase()}-${matchGroupLeague?._id}`}
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
				</div>
				<div style={{width: "15%"}} className="text-center">
					Cược chấp
				</div>
				<div style={{width: "15%"}} className="text-center">
					Tài xỉu
				</div>
				<div style={{width: "10%"}} className="text-center">
					1X2
				</div>
				<div style={{width: "10%"}} className="text-right">
					Live
				</div>
			</div>

			{(isGroup ? matchGroupLeague?.listMatches : [matchGroupLeague])?.map(
				(item) => (
					<MatchHomeOddItem
						matchThesport={matchThesport}
						match={item}
						key={item?._id}
					/>
				)
			)}
		</div>
	);
}

export default React.memo(ListMatchOddHomeItem);
