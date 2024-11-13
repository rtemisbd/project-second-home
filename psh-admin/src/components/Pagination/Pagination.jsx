// src/components/Pagination.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setPageSize } from "./../../redux/reducers/paginationSlice";

const Pagination = ({ totalDataCount }) => {
  const dispatch = useDispatch();
  const { page, size } = useSelector((state) => state.pagination);
  // dynamic page size
  const pageCount = Math.ceil(totalDataCount / size);
  const totalCount = totalDataCount;
  const dynamicPageSizes = [];
  if (totalCount) {
    for (let i = 10; i <= totalCount; i += 10) {
      dynamicPageSizes.push(i);
    }
    if (!dynamicPageSizes.includes(totalCount)) {
      dynamicPageSizes.push(totalCount);
    }
  }

  const MAX_PAGE_BUTTONS = 5;
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, pageCount);

  const visiblePageNumbers = [...Array(endPage - startPage + 1).keys()]?.map(
    (i) => startPage + i
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      dispatch(setPage(newPage));
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    dispatch(setPageSize(newSize));
    dispatch(setPage(1)); // Reset to first page if size changes
  };

  return (
    <div className="pagination d-flex justify-content-end align-items-center gap-0">
      <label htmlFor="size" className="mt-2">
        Show rows
      </label>
      <select
        id="size"
        value={size}
        onChange={handlePageSizeChange}
        className="btn border mx-2"
      >
        {dynamicPageSizes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
        className="pagination-button"
      >
        First
      </button>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="pagination-button"
      >
        Previous
      </button>

      {visiblePageNumbers?.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={
            page === number
              ? "page-selected pagination-button"
              : "pagination-button"
          }
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pageCount || pageCount === 0}
        className="pagination-button"
      >
        Next
      </button>
      <button
        onClick={() => handlePageChange(pageCount)}
        disabled={page === pageCount || pageCount === 0}
        className="pagination-button"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
