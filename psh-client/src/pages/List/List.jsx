import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SingleCard from "../../components/home/SingleCard";
import "./List.css";
import { PropagateLoader } from "react-spinners";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";

function List() {
  const location = useLocation();
  const { name } = useParams();

  const [data, setData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [destination, setDestination] = useState(name);
  const [furnitured, setFurnitured] = useState(
    location?.state?.furnitured || ""
  );
  const [gender, setGender] = useState(location?.state?.gender || "");
  const [category, setCategory] = useState(location?.state?.category || "");
  const [bedrooms, setBedrooms] = useState(location?.state?.bedrooms || "");
  const [withSharedRoom, setWithSharedRoom] = useState(true);
  const [startDate, setStartDate] = useState(location?.state?.startDate || "");
  const [endDate, setEndDate] = useState(location?.state?.endDate || "");
  const [facilityFilters, setFacilityFilters] = useState([]);
  const [commonFacilityFilters, setCommonFacilityFilters] = useState([]);
  const [sort, setSort] = useState("asc");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        withSharedRoom,
        furnitured,
        category,
        isPublished: "Published",
        max,
        gender,
        destination,
        bedType: bedrooms,
        min,
        facilities: facilityFilters.join(","),
        commonfacilities: commonFacilityFilters.join(","),
        itemsPerPage,
        fromClient: true,
        page,
        sort,
      });

      const response = await axios.get(
        `${serverBaseUrl}/property?${queryParams.toString()}`
      );
      setData(response?.data?.properties || []);
      setTotalDataCount(response?.data?.totalCount || 0);
      setTotalPages(Math.ceil(response?.data?.totalCount / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({ startDate, endDate });
      const { data } = await axios.get(
        `${serverBaseUrl}/rent-rooms?${queryParams.toString()}`
      );
      setAvailableRooms(data?.availableRooms || []);
      setAvailableSeats(data?.availableSeats || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRooms();
  }, [page, sort, min, max, facilityFilters, commonFacilityFilters]);

  const handleFacilityFilterChange = (facility) => {
    setFacilityFilters((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const handleCommonFacilityFilterChange = (commonfacility) => {
    setCommonFacilityFilters((prev) =>
      prev.includes(commonfacility)
        ? prev.filter((f) => f !== commonfacility)
        : [...prev, commonfacility]
    );
  };

  return (
    <div className="custom-container">
      <div className="mt-3 ml-2 flex justify-between items-center">
        <p>{data?.length} Results Found</p>
        <p>
          <span className="hidden md:inline"> Search Number </span>
          <select
            className="border border-black rounded ml-2"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            style={{ width: 50, height: 32 }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </p>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-12">
          <div className="flex flex-col col-span-12">
            {loading ? (
              <p className="flex justify-center py-96">
                <PropagateLoader
                  size={13}
                  speedMultiplier={0.8}
                  color="#36d7b7"
                />
              </p>
            ) : data.length > 0 ? (
              <div className="px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-7 lg:gap-x-5">
                {data.map((item) => (
                  <div key={item._id}>
                    <SingleCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center text-bg-danger not_found h-[800px]">
                <h1 className="sorry_text_h1">
                  Sorry! <br />
                  <span>No Results Found</span>
                </h1>
                <p className="sorry_text_p">
                  It looks like we couldn't find any available rooms or seats
                  matching your criteria.
                </p>
                <Link to="/">
                  <button className="ml-1 rounded bg-[#00bbb4] font-bold px-8 py-3 uppercase text-white text-sm">
                    GO TO HOME
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center items-center mb-10">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-[#399] text-white rounded px-2 py-2"
        >
          Previous
        </button>
        <p className="ml-2">
          Page {page} of {totalPages}
        </p>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-[#399] text-white rounded px-2 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default List;
