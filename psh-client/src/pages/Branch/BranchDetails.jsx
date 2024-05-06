import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import UseFetch from "../../hooks/useFetch";
import BranchProperty from "./BranchProperty";

// import BranchDetails from "./BrachList";

const BranchDetails = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Number.MAX_VALUE);
  const [totalPages, setTotalPages] = useState(1);
  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(
      selectedItemsPerPage === -1 ? Number.MAX_VALUE : selectedItemsPerPage
    );
    setPage(1);
  };
  const handlePageChange = (event) => {
    const selectedPage = parseInt(event.target.value);
    setPage(selectedPage);
  };
  const { data: branchData, loading } = UseFetch(
    `branch/${id}?page=${page}&pageSize=${itemsPerPage}`
  );
  const propertyData = branchData?.property;
  console.log("branchData", propertyData);
  // find Published Recommended Property

  useEffect(() => {
    if (propertyData && propertyData.length > 0) {
      setTotalPages(Math.ceil(propertyData.length / itemsPerPage));
    } else {
      setTotalPages(1);
    }
  }, [propertyData, itemsPerPage]);
  const paginatedData = propertyData?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (
    <div className="custom-container sm:px-5 md:px-0">
      <div className="flex items-center gap-x-3 md:mt-5 sm:mt-5">
        <Link to="/" className="hover:text-[#00bbb4] md:block sm:hidden">
          <p>Home</p>
        </Link>
        <p className="sm:hidden md:block">
          <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
        </p>
        <Link to="/" className="md:hidden sm:block">
          <p>
            <MdKeyboardArrowLeft className="w-[20px] h-[20px]" />
          </p>
        </Link>
        <p>Property</p>
      </div>
      <div className=" mt-3 flex justify-between items-center sm:px-5 sm:pt-1 md:px-0 md:pt-0 custom-container">
        <p className="ms-0">{paginatedData?.length} Results Found</p>
        <p className="">
          Search Number{" "}
          <select
            className="border border-black rounded ml-2"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={{ width: 50, height: 32 }}
          >
            <option value={-1}>All</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </p>
      </div>

      {loading ? (
        <p className="my-48 text-center">Loading...</p>
      ) : paginatedData?.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 lg:gap-x-5 md:gap-x-7 sm:grid-cols-1 mt-2 sm:gap-x-0 z-0 sm:mx-auto md:mx-0">
            {paginatedData?.map((item) => (
              <div className="">
                <BranchProperty
                  key={item._id}
                  item={item}
                  branchData={branchData}
                />
              </div>
            ))}
          </div>
          <div className=" mt-10 flex justify-center items-center mb-10">
            <div className="bg-[#399] text-white rounded px-2 py-2">
              <div>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="text-sm"
                >
                  Previous
                </button>
              </div>
            </div>
            <div className="flex ml-2 mx-2 text-sm">
              <p className="mt-1">Page</p>
              <select
                className="border border-black rounded ml-2 px-2"
                value={page}
                onChange={handlePageChange}
                style={{ width: 50, height: 26 }}
              >
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNum) => (
                  <option key={pageNum} value={pageNum}>
                    {pageNum}
                  </option>
                ))}
              </select>
              <p className="ml-2 mt-1"> of {totalPages}</p>
            </div>
            <div className="flex justify-center bg-[#399] text-white rounded px-5 py-2">
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center text-bg-danger not_found h-[800px]">
            <div>
              <h1 className="sorry_text_h1">
                Sorry!
                <br />
                <span>No Results Found</span>
              </h1>
              <p className="sorry_text_p">
                It looks like we couldn't find any available rooms or seats
                matching your criteria.
              </p>
              <div className="mt-12">
                <Link to={"/"}>
                  <button className="ml-1 rounded bg-[#00bbb4] font-bold px-8 py-3 uppercase text-white text-sm">
                    GO TO HOME
                  </button>
                </Link>
              </div>
            </div>
            <div>
              <img
                className="img-fluid"
                src="/assets/img2/Sorry 2.png"
                alt="sorry psh"
                style={{ width: "100%", height: 600 }}
              />
            </div>
          </div>
        </>
      )}

      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-900">
          <h1 className="my-5 text-center">
            Welcome to <span style={{ color: "#00bbb4" }}>{data.name}</span>
          </h1>
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
            {data.property ? (
              data?.property?.map((item, i) => <BranchList item={item} />)
            ) : (
              <div className="d-flex justify-content-center text-bg-danger not_found">
                <img
                  className="img-fluid"
                  src="https://i.ibb.co/Jr6dcW7/Figma.png"
                  alt=""
                />
              </div>
            )}
          </div>
        </div> */}
    </div>
  );
};

export default BranchDetails;
