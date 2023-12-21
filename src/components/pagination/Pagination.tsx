import ReactPaginate from "react-paginate";

const Pagination = ({
  setPageIndex,
  pageSize,
  totalPage,
}: {
  setPageIndex: any;
  pageSize: number;
  totalPage: number;
}) => {
  const handlePageClick = (event: any) => {
    // setPageIndex(event.selected + 1);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={totalPage}
      previousLabel="<"
      renderOnZeroPageCount={null}
      className="pagination"
    />
  );
};

export default Pagination;
