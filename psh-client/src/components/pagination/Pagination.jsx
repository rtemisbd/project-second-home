import { useDispatch, useSelector } from "react-redux";
import { setPage, setPageSize } from "../../redux/reducers/paginationSlice";

const Pagination = ({ totalCount }) => {
  const dispatch = useDispatch();
  const { page, size } = useSelector((state) => state.pagination);
  // dynamic page size
  const pageCount = Math.ceil(totalCount / size);

  const dynamicPageSizes = [];
  if (totalCount) {
    for (let i = 4; i <= totalCount; i += 10) {
      dynamicPageSizes.push(i);
    }
    if (!dynamicPageSizes.includes(totalCount)) {
      dynamicPageSizes.push(totalCount);
    }
  }

  const MAX_PAGE_BUTTONS = 4;

  // Ensure pageCount is at least 1 to avoid issues
  const safePageCount = Math.max(1, pageCount);

  // Adjust startPage and endPage correctly
  const startPage = Math.max(
    1,
    Math.min(page, safePageCount) - Math.floor(MAX_PAGE_BUTTONS / 2)
  );
  const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, safePageCount);

  // Ensure `visiblePageNumbers` doesn't break due to invalid array length
  const visiblePageNumbers =
    startPage <= endPage
      ? [...Array(endPage - startPage + 1)].map((_, i) => startPage + i)
      : [];

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
    <div className="flex justify-end items-center gap-2 text-sm ">
      <span>Show rows</span>

      <select
        id="size"
        value={size}
        onChange={handlePageSizeChange}
        className="
         border mr-2"
      >
        {dynamicPageSizes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button onClick={() => handlePageChange(1)} disabled={page === 1}>
        First
      </button>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="border  px-2 py-0"
      >
        {"<"}
      </button>

      {visiblePageNumbers?.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`border px-2 rounded ${
            page === number ? "bg-[#2eb49e] text-white" : ""
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pageCount || pageCount === 0}
        className="border  px-2 py-0"
      >
        {">"}
      </button>
      <button
        onClick={() => handlePageChange(pageCount)}
        disabled={page === pageCount || pageCount === 0}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
