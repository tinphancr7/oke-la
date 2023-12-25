import {getMatchesByDateGroupRateLeague} from "@/apis/match";
import {useInfiniteQuery} from "@tanstack/react-query";
import moment from "moment";
import React from "react";

import LoadingSmall from "@/components/loading/LoadingSmall";
import ListMatchOddHomeItem from "./ListMatchOddHomeItem";
import ListMatchesOddHomeMobile from "./ListMatchesOddHomeMobile";

const ListMatchOddHome = ({
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
		queryKey: ["listMatchesOdd", moment(date).format("YYYY-MM-DD"), search],
		queryFn: async ({pageParam}) => {
			const res = await getMatchesByDateGroupRateLeague(
				pageParam,
				5,
				moment(date).format("YYYY-MM-DD"),
				search
			);

			return res?.data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			return lastPage?.pageIndex ? lastPage?.pageIndex + 1 : undefined;
		},
	});

	const listMatchesOdd = data?.pages?.reduce(
		(acc, page) => [...acc, ...page?.result],
		[]
	);

	return (
		<div>
			<div className="mt-4">
				{listMatchesOdd?.length > 0 &&
					listMatchesOdd?.map((item) => (
						<>
							<ListMatchOddHomeItem
								isGroup={true}
								matchThesport={[]}
								matchGroupLeague={item}
								key={item?._id}
							/>
							<ListMatchesOddHomeMobile
								isGroup={true}
								key={item?._id}
								item={item}
								handleLikeLeague={handleLikeLeague}
								handleUnLikeLeague={handleUnLikeLeague}
								handleLikeMatch={handleLikeMatch}
								handleUnLikeMatch={handleUnLikeMatch}
								handleNavigate={handleNavigate}
							/>
						</>
					))}
			</div>

			{isLoading && <Loading />}

			{listMatchesOdd?.length > 0 && (
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

export default ListMatchOddHome;
