import {getTipByUserOrGroup} from "@/apis/tip";
import {getFavouriteLeagueByUser, getRankTable, getUserInfo} from "@/apis/user";
import AnalyticMember from "@/containers/Member/AnalyticMember";
import AnalyticsIncoming from "@/containers/Member/AnalyticsIncoming";
import InformationMember from "@/containers/Member/InformationMember";
import LeagueMember from "@/containers/Member/LeagueMember";
import NewestTip from "@/containers/Member/NewestTip";
import Refund from "@/containers/Member/Refund";
import SharpChart from "@/containers/Member/SharpChart";
import TopTipter from "@/containers/Member/TopTipter";
import {IUser} from "@/interfaces";
import {GetServerSidePropsContext} from "next";
import React from "react";

function MemberPage({
	user,
	rank,
	tips,
	favouriteLeague,
}: {
	user: IUser;
	rank: any;
	tips: any;
	favouriteLeague: any[];
}) {
	console.log("tips", tips);
	return (
		<div className="container m-auto mt-6 md:px-4 xl:px-2">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
				<InformationMember user={user} />
				<AnalyticMember user={user} />
				<AnalyticsIncoming user={user} tips={tips} />
				{/* <SharpChart /> */}
				<LeagueMember favouriteLeague={favouriteLeague} />
				<NewestTip tips={tips} />
				<TopTipter rank={rank} />
			</div>
		</div>
	);
}

export default MemberPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const username = ctx.params?.name || "";
	try {
		const result = await getUserInfo(username.toString());
		const [rank, tips, favouriteLeague] = await Promise.all([
			getRankTable(),
			getTipByUserOrGroup(result?.data?.result?._id),
			getFavouriteLeagueByUser(result?.data?.result?._id),
		]);
		return {
			props: {
				user: result.data?.result || {},
				rank: rank.data?.result?.data || [],
				tips: tips?.data?.result?.result || [],
				favouriteLeague: favouriteLeague?.data?.result || [],
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				user: {},
				rank: [],
				tips: [],
				favouriteLeague: [],
			},
		};
	}
}
