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
import "./SearchBox.css";
import { SyncLoader } from "react-spinners";

const SearchBox = () => {
  const reduxDispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);

  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);
  const { data } = UseFetch(`category`);

  const { data: branch } = UseFetch(`branch`);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);
  const [destination, setDestination] = useState("");

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
    setSelectedItem(item);
    setQuery(item.name);
    setInputActive(false);
    setDestination(item.name);
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

  const [bedrooms, setBedrooms] = useState([]);

  const [FurnishedDisplay, setFurnishedDisplay] = useState("");
  const [FurnishedQuery, setFurnishedQuery] = useState("");
  const [FurnishedValue, setFurnishedValue] = useState(0);
  const furnitures = ["All", "Furnished", "Unfurnished"];

  const [genderDisplay, setGenderDisplay] = useState("");
  const [genderQuery, setGenderQuery] = useState("female");
  const [genderValue, setGenderValue] = useState(0);
  const gender = ["Female", "Male"];
  // const gender = ["All", "Male", "Female", "Others"];

  const [categoryDisplay, setCategoryDisplay] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [categoryValue, setCategoryValue] = useState(0);
  const category = ["All", ...data.map((item) => item?.name)];
  const beds = [
    "All",
    "Bunk Bed",
    "Single Bed",
    "Queen Bed",
    "Semi-Double Bed",
    // "1 BR",
    // "2 BR",
    // "3 BR",
  ];
  const [bedValue, setBedValue] = useState(0);

  const handleFurnitureSelection = (index) => {
    setFurnishedValue(index);
    const selectedFurniture = furnitures[index];
    setFurnishedDisplay(selectedFurniture);

    // Map furnitures values to query values
    if (selectedFurniture === "Furnished") {
      setFurnishedQuery("yes");
    } else if (selectedFurniture === "Unfurnished") {
      setFurnishedQuery("no");
    }
  };

  const handleGenderSelection = (index) => {
    setGenderValue(index);
    const selectedGender = gender[index];
    setGenderDisplay(selectedGender);

    // Map gender values to query values
    if (selectedGender === "Female") {
      setGenderQuery("female");
    } else if (selectedGender === "Male") {
      setGenderQuery("male");
    }
    // } else if (selectedGender === "Others") {
    //   setGenderQuery("both");
    // }
  };

  const handleCategorySelection = (index) => {
    setCategoryValue(index);
    const selectedCategory = category[index];
    setCategoryDisplay(selectedCategory);

    // Map category values to query values
    if (selectedCategory === "All") {
      setCategoryQuery(""); // Empty string means no specific category filter
    } else {
      setCategoryQuery(selectedCategory);
    }

    // Handle bed selection based on category
    if (selectedCategory === "Private Room") {
    } else if (selectedCategory === "Shared Room") {
    } else if (selectedCategory === "Apartment") {
    } else {
      setBedValue(0); // Reset bed selection to "All" for other categories
      setBedrooms([]);
    }
  };

  const handleBedSelection = (index) => {
    if (index === 0) {
      setBedrooms([]);
    } else {
      setBedrooms([beds[index]]);
    }
    setBedValue(index);
  };

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const payload = {
      destination,
      bedrooms: bedrooms.length > 0 ? bedrooms : "Any",
      furnitured: FurnishedQuery,
      gender: genderQuery,
      category: categoryQuery,
    };

    dispatch({ type: "NEW_SEARCH", payload });
    navigate("/list", { state: payload });
  };

  return (
    <form className="searchBox" onSubmit={handleSearch}>
      <div className="flex justify-center mt-3 ">
        <div className="search-filed">
          <ul className="flex main-search mt-5">
            <li className="list-none py-1">
              <span
                onClick={() =>
                  reduxDispatch(rightDate(addDays(new Date(startDate), 1)))
                }
                className={` px-11 cursor-pointer py-2 ${
                  customerRent.remainingDays < getLastDayOfMonth() &&
                  customerRent.years === undefined
                    ? "dmyActive "
                    : "dmyNonActive"
                }`}
              >
                Day
              </span>
            </li>
            <li className="list-none py-1">
              <span
                onClick={() =>
                  reduxDispatch(rightDate(addMonths(new Date(startDate), 1)))
                }
                className={` px-11 cursor-pointer py-2 ${
                  customerRent.remainingDays >= getLastDayOfMonth() &&
                  customerRent.years === undefined
                    ? "dmyActive "
                    : "dmyNonActive"
                }`}
              >
                Month
              </span>
            </li>
            <li className="list-none py-1">
              <span
                onClick={() =>
                  reduxDispatch(rightDate(addYears(new Date(endDate), 1)))
                }
                className={` px-11 cursor-pointer py-2 ${
                  customerRent.years >= 1 ? "dmyActive " : "dmyNonActive"
                }`}
              >
                Year
              </span>
            </li>
          </ul>
          <ul className="flex title-search" style={{ marginTop: "10px" }}>
            <li>
              <span
                className={`tab ${categoryValue === 0 ? "selected" : ""}`}
                onClick={() => handleCategorySelection(0)}
              >
                All
              </span>
            </li>
            {data.map((rent, index) => (
              <li key={index + 1}>
                <span
                  className={`tab  ${
                    categoryValue === index + 1 ? "selected" : ""
                  }`}
                  onClick={() => handleCategorySelection(index + 1)}
                >
                  {rent?.property?.length > 0 ? rent?.name : ""}
                </span>
              </li>
            ))}
          </ul>
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
                      className="hover:bg-gray-300  cursor-pointer px-2 rounded flex items-center gap-x-2"
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

            <div className="left-date">
              <i
                className="fa-solid fa-calendar-days me-2"
                style={{ color: "#00bbb4" }}
              ></i>
              <DatePicker
                selected={new Date(startDate)}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => reduxDispatch(leftDate(date))}
                minDate={subDays(new Date(), 0)}
              />
            </div>
            <div className="right-date" style={{ backgroundColor: "unset" }}>
              <i
                className="fa-solid fa-calendar-days me-2"
                style={{ color: "#00bbb4" }}
              ></i>
              <DatePicker
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

            <div className="vl"></div>
            <div className="vl2"></div>

            <div className="arrow-icon">
              <BsArrowRight />
            </div>
            <div className="arrow-icon2">
              <BsArrowRight />
            </div>
            <div className="final-rent">
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
          {/* Rent Styled Searching */}
          <div className="flex items-center">
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
                      bed !== "Bunk Bed" &&
                      bed !== "Single Bed") ||
                    (categoryValue === 2 &&
                      bed !== "Single Bed" &&
                      bed !== "Semi-Double Bed" &&
                      bed !== "Queen Bed") ||
                    (categoryValue === 3 &&
                      bed !== "All" &&
                      bed !== "1 BR" &&
                      bed !== "2 BR" &&
                      bed !== "3 BR")
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
            <ul className="flex styled-search-1 mt-3 ">
              <li>
                <GiSofa
                  style={{
                    color: "#339999",
                    height: "24px",
                    width: "24px",
                    marginTop: "2px",
                    marginRight: "12px",
                  }}
                />
              </li>
              {furnitures.map((furniture, index) => (
                <li key={index} className="search_md_bed">
                  <span
                    onClick={() => handleFurnitureSelection(index)}
                    className={`${
                      FurnishedValue === index ? "bedActive" : "bedNonActive"
                    }`}
                  >
                    {furniture}
                  </span>
                </li>
              ))}
            </ul>
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
                  <span
                    onClick={() => handleGenderSelection(index)}
                    className={`${
                      genderValue === index ? "bedActive" : "bedNonActive"
                    }`}
                  >
                    {gender}
                  </span>
                </li>
              ))}
            </ul>

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
                  width: 260,
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;
