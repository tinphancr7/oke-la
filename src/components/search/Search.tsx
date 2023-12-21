import React from "react";

const Search = ({
	setSearch,
}: {
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
	return (
		<div className="relative ">
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<svg
					className="w-4 h-4 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			</div>
			<input
				type="search"
				id="default-search"
				className="block w-[200px] lg:w-[400px] p-2.5 pl-10 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
				placeholder="Tìm kiếm giải đấu..."
				onChange={(e) => setSearch(e?.target?.value || "")}
			/>
		</div>
	);
};

export default Search;
