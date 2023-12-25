import {getMessagesHome} from "@/apis/message";
import UserRankTableV2 from "@/components/UserRankTableV2";
import ChatRankHome from "@/containers/Home/ChatRankHome";
import GetPromotion from "@/containers/Home/GetPromotion";
import HotLeagueHome from "@/containers/Home/HotLeagueHome";
import LeagueOtherHome from "@/containers/Home/LeagueOtherHome";
import ListMatchesHome from "@/containers/Home/ListMatchesHome";
import MyFavouriteLeagues from "@/containers/Home/MyFavouriteLeagues";
import {useAppDispatch} from "@/redux";
import {initMessageHome} from "@/redux/slice/messageSlice";
import {useDebounce} from "@/utils/useDebounce";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {IoIosSearch} from "react-icons/io";

function HomePage() {
	const {data} = useQuery({
		queryKey: ["messagesHome"],
		queryFn: () => getMessagesHome(1, 100),
	});
	const message = data?.data?.result;
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (message) dispatch(initMessageHome(message));
	}, [message, dispatch]);
	const [search, setSearch] = useState("");

	const searchMatch = useDebounce(search, 500);

	return (
		<>
			<div className="bg-[#EEE] py-7">
				<div className="container mx-auto md:px-4 xl:px-2">
					<div className="grid grid-cols-12 gap-x-5">
						<div className="col-span-12 lg:col-span-3 bg-danger order-last lg:order-first">
							<div className="sticky top-24">
								<div className="bg-white rounded-full flex text-sm gap-2 items-center p-2 mb-4">
									<IoIosSearch size={20} />
									<input
										type="text"
										placeholder="Tìm kiếm"
										className="flex-1 py-1 outline-none"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
									/>
								</div>
								<MyFavouriteLeagues />
								<HotLeagueHome />
								<LeagueOtherHome />
							</div>
						</div>
						<div className="col-span-12 lg:col-span-6">
							{/* <GetPromotion isMobile />

							<HotLeagueHomeMobile /> */}

							<ListMatchesHome searchMatch={searchMatch} />
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
