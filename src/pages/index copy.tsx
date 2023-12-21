import {
	getCentralPointMatches,
	getHotMatch,
	getMatchTheSport,
	getMatchesByDateWithOdds,
	getMatchesByDateWithOddsSlide,
} from "@/apis/match";
import {getMessagesHome} from "@/apis/message";
import {getSeoByLink} from "@/apis/seo";
import {getPagingTips} from "@/apis/tip";
import {getRankTable, getRankUsers} from "@/apis/user";
import UserRankTableV2 from "@/components/UserRankTableV2";
import ChatRankHome from "@/containers/Home/ChatRankHome";
import GetPromotion from "@/containers/Home/GetPromotion";
import HotLeagueHome from "@/containers/Home/HotLeagueHome";
import HotLeagueHomeMobile from "@/containers/Home/HotLeagueHomeMobile";
import LeagueOtherHome from "@/containers/Home/LeagueOtherHome";
import ListBannersHome from "@/containers/Home/ListBannersHome";
import ListMatchesHome from "@/containers/Home/ListMatchesHome";
import MyFavouriteLeagues from "@/containers/Home/MyFavouriteLeagues";
import SlideListMatchesHome from "@/containers/Home/SlideListMatchesHome";
import TipsHome from "@/containers/Home/TipsHome";
import {IRank, ITip} from "@/interfaces";
import {useAppDispatch} from "@/redux";
import {initMessageHome} from "@/redux/slice/messageSlice";
import parse from "html-react-parser";
import moment from "moment";
import {GetServerSidePropsContext} from "next";
import Head from "next/head";
import React, {useEffect, useState} from "react";

type Props = {
	message: any;
	playingMatches: any[];
	todayMatches: any[];
	hotMatches: any[];
	finishedMatches: any[];
	sliderMatches: any[];
	tips: ITip[];
	matchThesport: any[];
	tags: string[];
	ranks: IRank[];
	rankUsers: any[];
};

function HomePage({
	message,
	sliderMatches,
	tips,
	matchThesport,
	tags,
	ranks,
	rankUsers,
}: Props) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (message) dispatch(initMessageHome(message));
	}, [message, dispatch]);

	const [searchMatch, setSearch] = useState("");
	const [league, setLeague] = useState("");
	return (
		<>
			<Head>
				{tags?.map((tag, index) => (
					<React.Fragment key={index}>{parse(tag)}</React.Fragment>
				))}
			</Head>
			<div className="bg-[#EEE] py-7">
				<div className="container mx-auto md:px-4 xl:px-2">
					<div className="grid grid-cols-12 gap-x-5">
						<div className="col-span-12 lg:col-span-3 bg-danger order-last lg:order-first">
							<div className="sticky top-20">
								<MyFavouriteLeagues />
								<HotLeagueHome />
								<LeagueOtherHome />
							</div>
						</div>
						<div className="col-span-12 lg:col-span-6">
							{/* <SlideListMatchesHome
              setSearchMatch={setSearch}
              sliderMatches={sliderMatches}
              setleague={setLeague}
            /> */}
							<GetPromotion isMobile />

							<HotLeagueHomeMobile />

							<ListMatchesHome
								search={searchMatch}
								matchThesport={matchThesport}
								league={league}
							/>
						</div>
						<div className="hidden lg:block col-span-12 lg:col-span-3 ">
							<div className="sticky">
								<GetPromotion />
								<ChatRankHome ranks={ranks} home />
								<UserRankTableV2 />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default HomePage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	try {
		const [messageRes, sliderMatchesRes, tipsRes, matchThesport, seo, rank] =
			await Promise.all([
				getMessagesHome(1, 100),
				getCentralPointMatches(1, 400, "1"),
				getPagingTips(1, 3),
				getMatchTheSport(),
				getSeoByLink("/"),
				getRankTable(),
			]);

		return {
			props: {
				message: messageRes.data?.result,
				sliderMatches: sliderMatchesRes.data?.result || [],
				tips: tipsRes?.data?.result?.result || [],
				matchThesport: matchThesport.data?.matchThesport || [],
				tags: seo?.data?.result?.tags || [],
				ranks: rank?.data?.result?.data || [],
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {},
		};
	}
}
