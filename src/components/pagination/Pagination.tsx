import ReactPaginate from "react-paginate";

const Pagination = ({
	setRound,

	totalRound,
	round,
}: {
	setRound: any;

	totalRound: number;
	round: number;
}) => {
	const handlePageClick = (event: any) => {
		setRound(event.selected + 1);
	};
	return (
		<ReactPaginate
			breakLabel="..."
			nextLabel=">"
			onPageChange={handlePageClick}
			pageRangeDisplayed={4}
			pageCount={totalRound}
			previousLabel="<"
			renderOnZeroPageCount={null}
			className="pagination"
			initialPage={round}
		/>
	);
};

export default Pagination;
