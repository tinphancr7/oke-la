import {getMatchTheSport} from "@/apis/match";
import {getMessagesHome} from "@/apis/message";
import {getSeoByLink} from "@/apis/seo";
import {getRankTable, getRankUsers} from "@/apis/user";
import UserRankTableV2 from "@/components/UserRankTableV2";
import ChatRankHome from "@/containers/Home/ChatRankHome";
import GetPromotion from "@/containers/Home/GetPromotion";
import HotLeagueHome from "@/containers/Home/HotLeagueHome";
import HotLeagueHomeMobile from "@/containers/Home/HotLeagueHomeMobile";
import LeagueOtherHome from "@/containers/Home/LeagueOtherHome";
import ListMatchesHome from "@/containers/Home/ListMatchesHome";
import MyFavouriteLeagues from "@/containers/Home/MyFavouriteLeagues";
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

function HomePage() {
	return (
		<>
			<div className="bg-[#EEE] py-7">
				<div className="container mx-auto md:px-4 xl:px-2">
					<div className="grid grid-cols-12 gap-x-5">
						<div className="col-span-12 lg:col-span-3 bg-danger order-last lg:order-first">
							<div className="sticky top-24">
								<MyFavouriteLeagues />
								<HotLeagueHome />
								<LeagueOtherHome />
							</div>
						</div>
						<div className="col-span-12 lg:col-span-6">
							{/* <GetPromotion isMobile />

							<HotLeagueHomeMobile /> */}

							{/* <ListMatchesHome
                search={searchMatch}
                matchThesport={matchThesport}
                league={league}
              /> */}
						</div>
						<div className="hidden lg:block col-span-12 lg:col-span-3 ">
							<div className="sticky top-24">
								<GetPromotion />
								{/* <ChatRankHome /> */}
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
