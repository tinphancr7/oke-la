import ReactPaginate from "react-paginate";

const Pagination = ({
	totalPage,
	setPageIndex,
}: {
	totalPage: number;
	setPageIndex: any;
}) => {
	const handlePageClick = (event: any) => {
		setPageIndex(event.selected + 1);
	};
	return (
		<ReactPaginate
			breakLabel="..."
			nextLabel=">"
			onPageChange={handlePageClick}
			pageRangeDisplayed={4}
			pageCount={totalPage}
			previousLabel="<"
			renderOnZeroPageCount={null}
			className="pagination"
			// initialPage={1}
		/>
	);
};

export default Pagination;
