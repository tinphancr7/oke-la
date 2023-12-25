import {getMatchesByDateGroupLeague} from "@/apis/match";
import {useInfiniteQuery} from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import ListMatchesHomeMobile from "./ListMatchesHomeMobile";
import ListMatchHomeItem from "./ListMatchHomeItem";
import LoadingSmall from "@/components/loading/LoadingSmall";

const ListAllMatchHome = ({
	date,
	handleLikeLeague,
	handleUnLikeLeague,
	handleLikeMatch,
	handleUnLikeMatch,
	handleNavigate,
	Loading,
	search,
}: any) => {
	const {
		status,
		data,
		error,
		isLoading,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ["listMatches", moment(date).format("YYYY-MM-DD"), search],
		queryFn: async ({pageParam}) => {
			const res = await getMatchesByDateGroupLeague(
				pageParam,
				5,
				moment(date).format("YYYY-MM-DD"),
				search.trim("")
			);

			return res?.data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			return lastPage?.pageIndex ? lastPage?.pageIndex + 1 : undefined;
		},
	});

	const listMatches = data?.pages?.reduce(
		(acc, page) => [...acc, ...page?.result],
		[]
	);

	return (
		<div>
			<div className="mt-4">
				{listMatches?.map((item) => (
					<>
						<div className="hidden lg:block">
							<ListMatchHomeItem
								isGroup={true}
								matchThesport={[]}
								matchGroupLeague={item}
								key={item?._id}
							/>
						</div>
						<div className="block lg:hidden">
							<ListMatchesHomeMobile
								isGroup={true}
								key={item?._id}
								item={item}
								handleLikeLeague={handleLikeLeague}
								handleUnLikeLeague={handleUnLikeLeague}
								handleLikeMatch={handleLikeMatch}
								handleUnLikeMatch={handleUnLikeMatch}
								handleNavigate={handleNavigate}
							/>
						</div>
					</>
				))}
			</div>

			{isLoading && <Loading />}

			{listMatches?.length > 0 && (
				<div className="flex items-center justify-center mt-5">
					<div className="w-[45%]"></div>
					<button
						onClick={() => fetchNextPage()}
						disabled={!hasNextPage || isFetchingNextPage}
						type="button"
						className={`w-[150px] text-white bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary dark:focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
							hasNextPage ? "" : "opacity-50 cursor-not-allowed"
						}}`}
					>
						{isFetchingNextPage ? <LoadingSmall /> : <span>Xem Thêm</span>}
					</button>
					<div className="w-[35%]"></div>
				</div>
			)}
		</div>
	);
};

export default ListAllMatchHome;
