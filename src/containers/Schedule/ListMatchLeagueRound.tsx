import {getMatchesByLeagueAndRound} from "@/apis/match";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconStar from "@/components/icons/Star";
import LiveMatchTime from "@/components/renderLiveMatchTime";
import {AuthContext} from "@/context/AuthContext";
import {IMatch} from "@/interfaces";
import {
	converToTheSportId,
	convertStringOddToArray,
	convertToOdd,
	isPlayingMatches,
} from "@/utils";
import moment from "moment";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from "react";
import {AiFillStar} from "react-icons/ai";
import BoxOddMatchHome from "../Home/BoxOddMatchHome";
import IconCornerKick from "@/components/icons/CornerKick";
import {Tooltip} from "antd";
import IconFlag from "@/components/icons/Flag";
import IconChartLine from "@/components/icons/ChartLine";
import IconTShirt from "@/components/icons/TShirt";
import BoxAnimation from "@/components/boxAnimation";
import IconCaretDown from "@/components/icons/CaretDown";
import Image from "next/image";
import LoadingSmall from "@/components/loading/LoadingSmall";
import IconLive from "@/components/icons/Live";

interface IMatchWithOdds extends IMatch {
	handicap: string;
	overUnder: string;
}

const MatchHomeItem = ({
	match,
	matchThesport,
}: {
	match: IMatchWithOdds;
	matchThesport: any[];
}) => {
	const [showOdd1, setShowOdd1] = useState(false);
	const [showOdd2, setShowOdd2] = useState(false);
	const [modalDetail, setModalDetail] = useState(false);
	const router = useRouter();

	const handleNavigate = (link: string, matchId: string) => {
		router.push(`/chi-tiet-tran/${matchId}?${link}`);
	};

	return (
		<>
			<div className="bg-white px-4 py-2 w-full hidden lg:flex items-center justify-between border-t">
				<div className="flex items-center gap-x-4" style={{width: "400px"}}>
					<div className="text-xs w-[40px]">
						<div>
							{" "}
							{match?.status == 2
								? "HT"
								: match?.status == -1
								? "FT"
								: moment(match?.matchTime * 1000)?.format("HH:mm")}
						</div>
						<div>
							{isPlayingMatches(match?.status) && (
								<LiveMatchTime match={match} />
							)}
						</div>
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
									{match?.status === 0 ? "-" : match?.homeScore}
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
										<div className="font-semibold text-sm">
											{match?.awayName}
										</div>
									</Link>
								</div>
								<div className="bg-secondary w-6 h-6 text-sm flex items-center justify-center text-white">
									{match?.status === 0 ? "-" : match?.awayScore}
								</div>
							</div>
						</Link>
					</div>
				</div>

				{/* cược chấp */}
				<div
					style={{width: "100px"}}
					className="relative"
					onMouseEnter={() => setShowOdd1(true)}
					onMouseLeave={() => setShowOdd1(false)}
				>
					{showOdd1 && (
						<BoxOddMatchHome
							match={match as any}
							show={showOdd1}
							onClose={() => setShowOdd1(false)}
						/>
					)}
					<div className="flex items-center justify-between text-sm bg-light p-1">
						<div>
							{" "}
							{match?.handicap?.[5]
								? convertToOdd(convertStringOddToArray(match?.handicap)?.[5])
								: "-"}
						</div>
						<div className="flex items-center gap-x-1 font-semibold">
							<span>
								{" "}
								{convertStringOddToArray(match?.handicap)?.[3]
									? convertStringOddToArray(match?.handicap)?.[3]
									: "-"}
							</span>
							{/* <IconDown /> */}
						</div>
					</div>
					<div className="flex items-center justify-between text-sm bg-light p-1 mt-1">
						<div></div>
						<div className="flex items-center gap-x-1 font-semibold">
							<span>
								{" "}
								{convertStringOddToArray(match?.handicap)?.[4]
									? convertStringOddToArray(match?.handicap)?.[4]
									: "-"}
							</span>
							{/* <IconUp /> */}
						</div>
					</div>
				</div>

				{/* tài xỉu */}
				<div
					style={{width: "100px"}}
					className="relative"
					onMouseEnter={() => setShowOdd2(true)}
					onMouseLeave={() => setShowOdd2(false)}
				>
					{showOdd2 && (
						<BoxOddMatchHome
							match={match as any}
							show={showOdd2}
							onClose={() => setShowOdd2(false)}
						/>
					)}
					<div className="flex items-center justify-between text-sm bg-light p-1">
						<div>
							{match?.overUnder?.[5]
								? convertToOdd(convertStringOddToArray(match?.overUnder)?.[5])
								: "-"}
						</div>
						<div className="flex items-center gap-x-1 font-semibold">
							<span>
								{" "}
								{convertStringOddToArray(match?.overUnder)?.[3]
									? convertStringOddToArray(match?.overUnder)?.[3]
									: "-"}
							</span>
							{/* <IconDown /> */}
						</div>
					</div>
					<div className="flex items-center justify-between text-sm bg-light p-1 mt-1">
						<div></div>
						<div className="flex items-center gap-x-1 font-semibold">
							<span>
								{convertStringOddToArray(match?.overUnder)?.[4]
									? convertStringOddToArray(match?.overUnder)?.[4]
									: "-"}
							</span>
							{/* <IconUp />
              
              
              */}
						</div>
					</div>
				</div>

				{/* tài xỉu */}
				<div style={{width: "50px"}}>
					<div className="flex items-center justify-between text-sm text-secondary-light">
						<div>HT</div>
						<div>
							{match?.homeHalfScore}-{match?.awayHalfScore}
						</div>
					</div>
					<div className="flex items-center justify-between text-sm text-secondary-light mt-1">
						<IconCornerKick />
						<div>
							{match?.homeCorner}-{match?.awayCorner}
						</div>
					</div>
				</div>

				{/* Data */}
				<div
					style={{width: "100px"}}
					className="flex items-center justify-between "
				>
					<Tooltip placement="top" title="Phân tích">
						<ButtonOnlyIcon
							onClick={() => handleNavigate("phan-tich", match?.matchId)}
						>
							<IconFlag />
						</ButtonOnlyIcon>
					</Tooltip>
					<Tooltip placement="top" title="Chi tiết">
						<ButtonOnlyIcon
							onClick={() => handleNavigate("chi-tiet", match?.matchId)}
						>
							<IconChartLine />
						</ButtonOnlyIcon>
					</Tooltip>
					<Tooltip placement="top" title="So sánh tỉ lệ">
						<ButtonOnlyIcon
							onClick={() => handleNavigate("so-sanh-tl", match?.matchId)}
						>
							<IconTShirt />
						</ButtonOnlyIcon>
					</Tooltip>
					<div className="bg-secondary relative">
						{modalDetail && <BoxAnimation match={match} matchAnalysis={{}} />}
						<IconCaretDown
							color={"#ffffff"}
							onClick={() => setModalDetail(!modalDetail)}
						/>
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
									src={"/icons/football-stadium1.png"}
								/>
							)}
						</ButtonOnlyIcon>
					</Link>
				</div>
			</div>

			{/* mobile */}
			<div className="block lg:hidden p-4 bg-[#F4F5F6] border-b-2 border-[#DFDFDF]">
				<div className="flex items-center justify-between gap-x-4">
					<div className="flex items-center gap-x-4 w-full sm:w-1/2">
						<div className="text-sm">
							<div>
								{match?.status == 2
									? "HT"
									: match?.status == -1
									? "FT"
									: moment(match?.matchTime * 1000)?.format("HH:mm A")}
							</div>
							<div>
								{isPlayingMatches(match?.status) && (
									<LiveMatchTime match={match} />
								)}
							</div>
						</div>
						<div className="flex items-center justify-between gap-x-2 w-full">
							<div className="flex items-center gap-x-2 w-full">
								<div>
									<img
										width={24}
										height={24}
										src={match?.homeIcon || "/images/no-image-logo-team.png"}
										alt=""
									/>
									<img
										className="mt-1"
										width={24}
										height={24}
										src={match?.awayIcon || "/images/no-image-logo-team.png"}
										alt=""
									/>
								</div>

								<div className="text-xs font-semibold">
									<div>{match?.homeName}</div>
									<div className="mt-2">{match?.awayName}</div>
								</div>
							</div>

							<div>
								<div className="bg-secondary text-sm w-6 h-6 flex items-center justify-center text-white">
									{match?.homeScore}
								</div>
								<div className="bg-secondary text-sm w-6 h-6 flex items-center justify-center text-white mt-2">
									{match?.awayScore}
								</div>
							</div>
						</div>
					</div>

					<div className="w-[60px] flex items-center justify-between">
						<Link
							href={`/truc-tiep/${match?.matchId}`}
							className="leading-none p-0 mt-0"
						>
							<IconLive />
						</Link>

						{/* {user?.matchs?.includes(match?.matchId) ? (
              <ButtonOnlyIcon onClick={() => handleUnLikeMatch(match?.matchId)}>
                <AiFillStar color={"#ffad01"} size={24} />
              </ButtonOnlyIcon>
            ) : (
              <ButtonOnlyIcon onClick={() => handleLikeMatch(match?.matchId)}>
                <IconStar color="#C2C2C2" />
              </ButtonOnlyIcon>
            )} */}
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
								{match?.handicap?.[5]
									? convertToOdd(convertStringOddToArray(match?.handicap)?.[5])
									: "-"}
							</div>
							<div className="flex items-center gap-x-1 font-bold">
								<span>
									{convertStringOddToArray(match?.handicap)?.[3]
										? convertStringOddToArray(match?.handicap)?.[3]
										: "-"}
								</span>
							</div>
						</div>
						<div className="flex items-center justify-between text-sm bg-light p-1 mt-1">
							<div></div>
							<div className="flex items-center gap-x-1 font-bold">
								<span>
									{" "}
									{convertStringOddToArray(match?.handicap)?.[4]
										? convertStringOddToArray(match?.handicap)?.[4]
										: "-"}
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
								{match?.overUnder?.[5]
									? convertToOdd(convertStringOddToArray(match?.overUnder)?.[5])
									: "-"}
							</div>
							<div className="flex items-center gap-x-1 font-bold">
								<span>
									{convertStringOddToArray(match?.overUnder)?.[3]
										? convertStringOddToArray(match?.overUnder)?.[3]
										: "-"}
								</span>
							</div>
						</div>
						<div className="flex items-center justify-between text-sm bg-light p-1 mt-1">
							<div></div>
							<div className="flex items-center gap-x-1 font-bold">
								<span>
									{convertStringOddToArray(match?.overUnder)?.[4]
										? convertStringOddToArray(match?.overUnder)?.[4]
										: "-"}
								</span>
							</div>
						</div>
					</div>

					{/* HT */}
					<div className="flex flex-col justify-end min-h-full gap-y-2">
						<div className="gap-x-2 items-center justify-between flex text-xs text-secondary-light">
							<span>HT</span>
							<span>
								{match?.homeHalfScore}-{match?.awayHalfScore}
							</span>
						</div>
						<div className="gap-x-2 flex items-center justify-between text-xs text-secondary-light">
							<IconCornerKick />
							<span>
								{match?.homeCorner}-{match?.awayCorner}
							</span>
						</div>
					</div>

					{/*  Data */}
					<div className="text-center flex flex-col relative">
						<div className="text-secondary text-sm font-semibold mb-1.5">
							Data
						</div>
						<div className="flex items-center justify-between gap-x-1 h-full">
							<ButtonOnlyIcon
								onClick={() => handleNavigate("phan-tich", match?.matchId)}
							>
								<IconFlag />
							</ButtonOnlyIcon>
							<ButtonOnlyIcon
								onClick={() => handleNavigate("chi-tiet", match?.matchId)}
							>
								<IconChartLine />
							</ButtonOnlyIcon>
							<ButtonOnlyIcon
								onClick={() => handleNavigate("so-sanh-tl", match?.matchId)}
							>
								<IconTShirt />
							</ButtonOnlyIcon>
							<div className="bg-secondary">
								<IconCaretDown color={"#ffffff"} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

type Props = {
	league: string;
	round: any;
	leagueProfile: any;
	matchThesport: any[];
};

function ListMatchLeagueRound({
	league,
	leagueProfile,
	round,
	matchThesport,
}: Props) {
	const [matches, setMatches] = useState<IMatch[]>();
	const {user} = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize, setPageSize] = useState(20);
	const [totalDoc, setTotalDoc] = useState(0);

	const getMatches = async () => {
		try {
			setIsLoading(true);

			const result = await getMatchesByLeagueAndRound(
				1,
				pageSize,
				league,
				round
			);

			setPageIndex(1);

			setMatches(result.data?.result || []);
			setTotalDoc(result.data?.totalDoc || 0);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (league && round) getMatches();
	}, [league, round]);

	return (
		<div className="mt-8">
			<div className="bg-secondary px-4 py-2 border-b-2 border-primary text-white text-sm hidden lg:flex items-center justify-between">
				<div style={{width: "400px"}} className="flex items-center gap-x-4">
					{user?.leagues?.includes(leagueProfile?._id) ? (
						<ButtonOnlyIcon>
							<AiFillStar color={"#ffad01"} size={24} />
						</ButtonOnlyIcon>
					) : (
						<ButtonOnlyIcon>
							<IconStar color="#ffffff" />
						</ButtonOnlyIcon>
					)}
					<div>
						{leagueProfile?.name} ({totalDoc || 0})
					</div>
				</div>

				<div style={{width: "100px"}}>Cược chấp</div>
				<div style={{width: "100px"}}>Tài xỉu</div>
				<div style={{minWidth: "50px"}}></div>
				<div style={{width: "100px"}}>Data</div>
				<div>Live</div>
			</div>

			{/* mobile */}
			<div className="bg-secondary px-4 py-2 border-b-2 border-primary text-white text-sm flex lg:hidden items-center justify-between">
				<div>
					{leagueProfile?.name} ({totalDoc || 0})
				</div>
				{user?.leagues?.includes(leagueProfile?._id) ? (
					<ButtonOnlyIcon>
						<AiFillStar color={"#ffad01"} size={24} />
					</ButtonOnlyIcon>
				) : (
					<ButtonOnlyIcon>
						<IconStar color="#ffffff" />
					</ButtonOnlyIcon>
				)}
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center py-8 border">
					<LoadingSmall />
				</div>
			) : matches?.length === 0 ? (
				<div className="p-4 border text-center font-semibold">
					Hiện tại không có trận đấu
				</div>
			) : (
				<>
					{matches?.map((item) => (
						<MatchHomeItem
							matchThesport={matchThesport}
							match={item as any}
							key={item?._id}
						/>
					))}
				</>
			)}
		</div>
	);
}

export default ListMatchLeagueRound;
