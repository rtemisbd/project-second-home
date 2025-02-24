import React, { useEffect, useRef, useContext } from "react";

import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { BiBody } from "react-icons/bi";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import { GiSofa } from "react-icons/gi";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrLocation } from "react-icons/gr";
import { SearchContext } from "../../contexts/SearchContext";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";
import UseFetch from "../../hooks/useFetch";
import "./styles/SearchBox.css";
import { SyncLoader } from "react-spinners";
import BannerSlider from "./BannerSlider";

const NewBanner = () => {
  const reduxDispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);

  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);
  const { data } = UseFetch(`category`);

  const { data: branch } = UseFetch(`branch`);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [destination, setDestination] = useState("");
  const [bedrooms, setBedrooms] = useState([]);

  const [genderQuery, setGenderQuery] = useState("female");
  const [genderValue, setGenderValue] = useState(0);
  const gender = ["Female", "Male"];

  const [categoryQuery, setCategoryQuery] = useState("");
  const [categoryValue, setCategoryValue] = useState(0);
  const category = ["All", ...data.map((item) => item?.name)];
  const beds = ["All", "Bunk Bed", "Single Bed", "King Size Bed"];
  const [bedValue, setBedValue] = useState(0);

  const [inputActive, setInputActive] = useState(false);

  const filteredData = branch.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputActive(false);
      }
    };

    if (inputActive) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [inputActive]);

  const handleItemClick = (item) => {
    // setSelectedItem(item);
    setQuery(item.name);
    setInputActive(false);
    setDestination(item?.name);
  };

  useEffect(() => {
    reduxDispatch(toTalRent());

    if (customerRent.remainingDays < 1) {
      reduxDispatch(rightDate(addDays(new Date(startDate), 1)));
    }
  }, [startDate, endDate, customerRent?.remainingDays]);

  // get month Last Day
  function getLastDayOfMonth() {
    const today = new Date(startDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
    const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
    return lastDay;
  }

  const handleGenderSelection = (index) => {
    setGenderValue(index);
    const selectedGender = gender[index];
    // Map gender values to query values
    if (selectedGender === "Female") {
      setGenderQuery("female");
    } else if (selectedGender === "Male") {
      setGenderQuery("male");
    }
  };

  const handleCategorySelection = (index) => {
    setCategoryValue(index);
    const selectedCategory = category[index];
    if (selectedCategory === "All") {
      setCategoryQuery("");
    } else {
      setCategoryQuery(selectedCategory);
    }

    // Handle bed selection based on category
    if (selectedCategory === "Private Room") {
    } else if (selectedCategory === "Shared Room") {
    } else {
      setBedValue(0); // Reset bed selection to "All" for other categories
      setBedrooms([]);
    }
  };

  const handleBedSelection = (index) => {
    if (index === 0) {
      setBedrooms([]);
    } else {
      setBedrooms(beds[index]);
    }
    setBedValue(index);
  };

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    const payload = {
      destination,
      bedrooms,

      gender: genderQuery,
      category: categoryQuery,
      startDate: new Date(startDate).toISOString().split("T")[0],
      endDate: new Date(endDate).toISOString().split("T")[0],
    };

    dispatch({ type: "NEW_SEARCH", payload });
    navigate(`/branch/${destination}`, { state: payload });
  };
  return (
    <div className="flex justify-between w-full my-6 py-5">
      <div className="w-[492px] shadow-md rounded-md p-5">
        <h2 className="text-base font-bold">Find Your Accommodation </h2>
        <form className="searchBox" onSubmit={handleSearch}>
          <div className="py-3 space-y-3 ">
            {/* room category */}
            <ul className="flex title-search" style={{ marginTop: "10px" }}>
              {category.map((categoryItem, index) => (
                <li>
                  <span
                    className={`tab  ${
                      categoryValue === index ? "selected" : ""
                    }`}
                    onClick={() => handleCategorySelection(index)}
                  >
                    {categoryItem}
                  </span>
                </li>
              ))}
            </ul>
            {/* location */}
            <div className="">
              <p>Location</p>
              <div className="input-filed-area" ref={inputRef}>
                <input
                  type="text"
                  placeholder="Looking for best place to live"
                  value={query}
                  className="input_main"
                  ref={inputRef}
                  style={{
                    background: "none",
                    outline: "none",
                    width: "100%",
                    height: "40px",
                    paddingLeft: "40px",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => setQuery(e.target.value)}
                  onClick={() => setInputActive(true)}
                  required
                />
                {inputActive && (
                  <ul className=" absolute bg-white border border-[#00bbb4] rounded">
                    {filteredData?.length > 0 ? (
                      filteredData.map((item, index) => (
                        <li
                          key={item._id}
                          onClick={() => handleItemClick(item)}
                          className="hover:bg-gray-320  cursor-pointer px-2 rounded flex items-center gap-x-2"
                          style={{ width: "420px" }}
                        >
                          <GrLocation />

                          {item.name}
                        </li>
                      ))
                    ) : (
                      <li
                        className="text-center py-5"
                        style={{ height: "100px", width: "420px" }}
                      >
                        <SyncLoader
                          color="#6B7280"
                          size={8}
                          speedMultiplier={0.7}
                        />
                      </li>
                    )}
                  </ul>
                )}
                <div className="location-icon ">
                  <img
                    src="https://i.ibb.co/z8kf0jf/location.png"
                    style={{ color: "#00bbb4", width: "20px", height: "20px" }}
                    alt="location"
                  />
                </div>
              </div>
            </div>
            {/* rent dates */}

            <div className="flex justify-between " ref={inputRef}>
              <div className="w-[30%]">
                <p>Check In</p>
                <div className="border pl-3 py-2 border-[#00bbb4] rounded-[5px] mt-1 flex items-center w-full">
                  <i
                    className="fa-solid fa-calendar-days me-2"
                    style={{ color: "#00bbb4" }}
                  ></i>
                  <DatePicker
                    className="bg-transparent outline-none"
                    selected={new Date(startDate)}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => reduxDispatch(leftDate(date))}
                    minDate={subDays(new Date(), 0)}
                  />
                </div>
              </div>
              <div className="w-[30%]">
                <p>Check Out</p>
                <div className="border pl-3 py-2 border-[#00bbb4]  rounded-[5px] mt-1 flex items-center">
                  <i
                    className="fa-solid fa-calendar-days me-2"
                    style={{ color: "#00bbb4" }}
                  ></i>
                  <DatePicker
                    className="bg-transparent outline-none"
                    selected={
                      customerRent?.remainingDays < 1
                        ? addDays(new Date(startDate), 1)
                        : new Date(endDate)
                    }
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => reduxDispatch(rightDate(date))}
                    minDate={subDays(new Date(startDate), -1)}
                  />
                </div>
              </div>
              <div className="w-[30%]">
                <p>Duration</p>
                <div className="border pl-3 py-2 border-[#00bbb4]  rounded-[5px] mt-1 w-full">
                  <div className="w-full">
                    <span>
                      {`${
                        customerRent?.daysDifference >= 0
                          ? `${customerRent?.daysDifference} days`
                          : ""
                      }`}
                      {`${
                        customerRent?.months &&
                        customerRent?.days >= 0 &&
                        !customerRent?.years
                          ? `${customerRent?.months} months, ${customerRent?.days} days`
                          : ""
                      }`}
                      {`${
                        customerRent?.years &&
                        customerRent?.months >= 0 &&
                        customerRent?.days >= 0
                          ? `${customerRent?.years} year`
                          : ""
                      }`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* bed */}
            <div className="flex items-center ">
              <div>
                <FaBed
                  style={{
                    color: "#339999",
                    height: "24px",
                    width: "24px",
                    marginTop: "25px",
                    marginRight: "12px",
                  }}
                />
              </div>

              <div style={{ marginTop: "19px" }}>
                <ul
                  className={`flex styled-search-1 mt-3 ${
                    categoryValue === 2 ? "hide-search-options" : ""
                  }`}
                >
                  {beds.map((bed, index) => {
                    if (
                      (categoryValue === 1 &&
                        bed !== "Single Bed" &&
                        bed !== "Single Bed" &&
                        bed !== "King Size Bed") ||
                      (categoryValue === 2 &&
                        bed !== "Bunk Bed" &&
                        bed !== "Single Bed")
                    ) {
                      return null; // Skip rendering
                    }

                    return (
                      <li key={index} className="search_md_bed">
                        <span
                          onClick={() => handleBedSelection(index)}
                          className={`${
                            bedValue === index ? "bedActive" : "bedNonActive"
                          }`}
                        >
                          {bed}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div
              className="flex justify-between items-center "
              style={{ marginTop: "7px" }}
            >
              <ul className="flex styled-search-1 mt-3">
                <li>
                  <BiBody
                    style={{
                      color: "#339999",
                      height: "24px",
                      width: "24px",
                      marginTop: "2px",
                      marginRight: "12px",
                    }}
                  />
                </li>
                {gender.map((gender, index) => (
                  <li key={index} className="search_md_bed">
                    <button
                      onClick={() => handleGenderSelection(index)}
                      disabled={gender === "Male"}
                      className={`${
                        genderValue === index ? "bedActive" : "bedNonActive"
                      } px-[25px] py-[6px] ml-1 rounded disabled:cursor-not-allowed`}
                    >
                      {gender}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <input
                type="submit"
                className="bg-[#00bbb4] hover:bg-[#2dc3c0]"
                value="Find Accommodation"
                style={{
                  border: "none",
                  color: "white",
                  padding: "7px 10px",
                  borderRadius: "5px",
                  marginTop: "12px",
                  width: "100%",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </form>
      </div>
      <div className=" p-5 ">
        <BannerSlider />
      </div>
    </div>
  );
};

export default NewBanner;
