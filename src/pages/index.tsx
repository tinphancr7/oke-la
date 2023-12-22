import UserRankTableV2 from "@/components/UserRankTableV2";
import ChatRankHome from "@/containers/Home/ChatRankHome";
import GetPromotion from "@/containers/Home/GetPromotion";
import HotLeagueHome from "@/containers/Home/HotLeagueHome";
import LeagueOtherHome from "@/containers/Home/LeagueOtherHome";
import ListMatchesHome from "@/containers/Home/ListMatchesHome";
import MyFavouriteLeagues from "@/containers/Home/MyFavouriteLeagues";

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
								{/* <LeagueOtherHome /> */}
							</div>
						</div>
						<div className="col-span-12 lg:col-span-6">
							{/* <GetPromotion isMobile />

							<HotLeagueHomeMobile /> */}

							<ListMatchesHome />
						</div>
						<div className="hidden lg:block col-span-12 lg:col-span-3 ">
							<div className="sticky top-24">
								<GetPromotion />
								<ChatRankHome />
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
