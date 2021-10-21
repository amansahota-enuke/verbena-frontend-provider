import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({ pageCount, handlePageChange }) {
    return (
        <div className="flex justify-center">
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default Pagination;
