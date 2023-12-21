import IconStar from "@/components/icons/Star";
import React, {Fragment, useContext} from "react";
import RateMatch from "./RateMatch";
import RateMatchMobile from "./RateMatchMobile";
import Link from "next/link";
import {AuthContext} from "@/context/AuthContext";
import {likeLeague, unlikeLeague} from "@/apis/user";
import {toast} from "react-toastify";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import {isFavouriteLeague} from "@/utils";

function RateLeague({league, leagueName}: {league: any; leagueName: string}) {
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
		<>
			<div className="w-full flex items-center justify-between bg-secondary lg:bg-[#FFE9CF] px-4 py-2 text-sm font-bold text-white lg:text-secondary">
				<div className="flex items-center gap-x-6">
					<div className="hidden lg:inline h-[24px]">
						{isFavouriteLeague(user?.leagues, league?.[0]?.leagueId) ? (
							<ButtonOnlyIcon
								onClick={() => handleUnLikeLeague(league?.[0]?.leagueId)}
								wrapperClassName="p-0 m-0 h-fit"
							>
								<IconStar color="#ffad01" />
							</ButtonOnlyIcon>
						) : (
							<ButtonOnlyIcon
								onClick={() => handleLikeLeague(league?.[0]?.leagueId)}
								wrapperClassName="p-0 m-0 h-fit"
							>
								<IconStar color="#A95E01" />
							</ButtonOnlyIcon>
						)}
					</div>

					<div>{leagueName}</div>
				</div>
				<div className="hidden lg:inline">Xem bảng xếp hạng</div>
				<div className="inline lg:hidden">
					{isFavouriteLeague(user?.leagues, league?.[0]?.leagueId) ? (
						<ButtonOnlyIcon
							onClick={() => handleUnLikeLeague(league?.[0]?.leagueId)}
							wrapperClassName="p-0 m-0 h-fit"
						>
							<IconStar color="#ffad01" />
						</ButtonOnlyIcon>
					) : (
						<ButtonOnlyIcon
							onClick={() => handleLikeLeague(league?.[0]?.leagueId)}
							wrapperClassName="p-0 m-0 h-fit"
						>
							<IconStar color="#ffad01" />
						</ButtonOnlyIcon>
					)}
				</div>
			</div>
			{league.map((item: any) => (
				<Fragment key={item?.matchId}>
					<Link href={`/ty-le-keo/${item?.matchId}`}>
						<RateMatch league={item} />
					</Link>
					<Link href={`/ty-le-keo/${item?.matchId}`}>
						<RateMatchMobile league={item} />
					</Link>
				</Fragment>
			))}
		</>
	);
}

export default RateLeague;
