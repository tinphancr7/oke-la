import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconCornerKick from "@/components/icons/CornerKick";
import IconLive from "@/components/icons/Live";
import IconStar from "@/components/icons/Star";

import LiveMatchTime from "@/components/renderLiveMatchTime";
import {AuthContext} from "@/context/AuthContext";
import {isPlayingMatches} from "@/utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, {useContext} from "react";
import {AiFillStar} from "react-icons/ai";

type Props = {
	item: any;
	isGroup?: boolean;
	handleLikeLeague: (e: any) => void;
	handleUnLikeLeague: (e: any) => void;
	handleLikeMatch: (e: any) => void;
	handleUnLikeMatch: (e: any) => void;
	handleNavigate: (url: string, e: any) => void;
};

function ListMatchesHomeMobile({
	item,
	handleLikeLeague,
	handleUnLikeLeague,
	handleLikeMatch,
	handleUnLikeMatch,
	handleNavigate,
	isGroup = true,
}: Props) {
	const {user} = useContext(AuthContext);

	return (
		<div className="lg:hidden">
			<div className="bg-secondary px-4 py-2 border-b-2 border-primary text-white text-xs flex items-center justify-between">
				<div className="flex items-center gap-2 w-[90%]">
					{user?.leagues?.includes(item?._id) ? (
						<ButtonOnlyIcon onClick={() => handleUnLikeLeague(item?._id)}>
							<AiFillStar color={"#FF3849"} size={18} />
						</ButtonOnlyIcon>
					) : (
						<ButtonOnlyIcon onClick={() => handleLikeLeague(item?._id)}>
							<IconStar color="#ffffff" size="18" />
						</ButtonOnlyIcon>
					)}
					{item?.leagueName}{" "}
					{isGroup ? `(${item?.listMatches?.length || 0})` : null}
				</div>
				<div className="w-[10%] text-right font-semibold text-xs">Live</div>
			</div>

			{(isGroup ? item?.listMatches : [item])?.map((match: any) => (
				<div
					className="p-4 bg-[#F4F5F6] border-b-2 border-[#DFDFDF]"
					key={item?._id}
				>
					<div className="flex items-center justify-between gap-x-2">
						<div className="flex items-center gap-x-4 w-full sm:w-1/2">
							<div className="text-xs text-center">
								<div className="text-xs">
									{moment(match?.matchTime * 1000).format("HH:mm")}
								</div>
								{match?.status == -1 ? (
									<div>Hết</div>
								) : isPlayingMatches(match?.status) ? (
									<div className="mt-1">
										<LiveMatchTime match={match} />
									</div>
								) : null}
							</div>
							<div className="flex items-center justify-between gap-x-2 w-full">
								<div className="flex items-center gap-x-2 flex-1">
									<div>
										<Image
											width={16}
											height={16}
											src={match?.homeIcon || "/images/no-image-logo-team.png"}
											alt=""
										/>
										<Image
											className="mt-3"
											width={16}
											height={16}
											src={match?.awayIcon || "/images/no-image-logo-team.png"}
											alt=""
										/>
									</div>

									<div className="text-xs font-semibold">
										<div>{match?.homeName}</div>
										<div className="mt-3">{match?.awayName}</div>
									</div>
								</div>

								<div>
									<div className="text-xs flex items-center justify-center text-[#FF3849] font-semibold">
										{match?.status === 0 ? "-" : match?.homeScore}
									</div>
									<div className="text-xs flex items-center justify-center text-[#FF3849] mt-3 font-semibold">
										{match?.status === 0 ? "-" : match?.awayScore}
									</div>
								</div>

								<div>
									<div className="text-[#9DA5AC] text-xs">
										HT {match?.homeHalfScore}-{match?.awayHalfScore}
									</div>
									<div className="text-[#9DA5AC] text-xs flex items-center mt-3 gap-1">
										<IconCornerKick />
										{match?.homeHalfScore}-{match?.awayHalfScore}
									</div>
								</div>
							</div>
						</div>

						<div className="w-[10%] flex items-center justify-end">
							<Link
								href={`/truc-tiep/${match?.matchId}`}
								className="leading-none p-0 mt-0"
							>
								<IconLive />
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ListMatchesHomeMobile;
