import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import { BsArrowRight } from "react-icons/bs";

import { SearchContext } from "../../contexts/SearchContext";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";
import UseFetch from "../../hooks/useFetch";
import durationImg from "../../assets/img/clock-01.png";
import { AuthContext } from "../../contexts/UserProvider";

import ReactModal from "react-modal";
import { placeSearchBoxShow } from "../../redux/reducers/smProfileMenuSlice";
import { GrLocation } from "react-icons/gr";
import { SyncLoader } from "react-spinners";
const SearchBoxWithNav = () => {
  const isSearchBoxShow = useSelector(
    (state) => state?.profileMenu?.isSearchBoxShow
  );
  const { user } = useContext(AuthContext);
  const reduxDispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);
  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);
  const { data, loading, error, reFetch } = UseFetch(`category`);
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
  const furnitures = ["Furnished", "Unfurnished"];

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
    reduxDispatch(placeSearchBoxShow(false));
    navigate("/list", { state: payload });
  };

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  const [isScrolled, setIsScrolled] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > 230) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [scrollY]);

  return (
    <>
      <ReactModal
        style={{
          content: {
            top: "0%",
            left: "0%",
            right: "auto",
            bottom: "auto",

            // transform: "translate(-50%, -45%)",
            padding: 0,
            border: 0,

            width: "100%",
          },
        }}
        // className=" mt-48"
        ariaHideApp={false}
        isOpen={isSearchBoxShow}
      >
        <div className="searchBoxSm mt-5">
          {/* <div
            className={` searchButtonTop items-center ms-5 ${
              user ? "w-[110px]" : "w-[150px]"
            }`}
            onClick={() => dispatch(placeSearchBoxShow(true))}
          >
            <h5 className={"text-black text-[12px] mt-1"}> Search</h5>

            <div>
              <i className="fa fa-search mt-3" />
            </div>
          </div> */}

          <div onClick={() => reduxDispatch(placeSearchBoxShow(false))}>
            <Button variant="text" className="mr-1">
              <i
                className="fa-solid fa-arrow-left text-2xl"
                style={{ color: "#00bbb4" }}
              ></i>
            </Button>
          </div>

          <form onSubmit={handleSearch}>
            <div>
              <div className="search-filed2">
                <ul className="flex justify-center main-search text-[12px]">
                  <li className="list-none py-1">
                    <span
                      onClick={() =>
                        reduxDispatch(
                          rightDate(addDays(new Date(startDate), 1))
                        )
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
                        reduxDispatch(
                          rightDate(addMonths(new Date(startDate), 1))
                        )
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

                <hr style={{ margin: "5px 0" }} />
                <ul className="flex " style={{ marginTop: "23px" }}>
                  <li className="sm:text-[12px] ">
                    <span
                      className={`tab ${categoryValue === 0 ? "selected" : ""}`}
                      onClick={() => handleCategorySelection(0)}
                    >
                      All
                    </span>
                  </li>
                  {data.map((rent, index) => (
                    <li key={index + 1} className="sm:text-[12px]">
                      <span
                        className={`tab ${
                          categoryValue === index + 1 ? "selected" : ""
                        }`}
                        onClick={() => handleCategorySelection(index + 1)}
                      >
                        {rent?.property?.length > 0 ? rent?.name : ""}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* Search filed */}
                <div className="input-filed-area mb-6" ref={inputRef}>
                  <div className="location-icon">
                    <img
                      src="https://i.ibb.co/z8kf0jf/location.png"
                      style={{
                        color: "#00bbb4",
                        width: "20px",
                        height: "20px",
                        marginTop: "2px",
                      }}
                      alt="location"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Looking for best place to live"
                    required
                    value={query}
                    className="input_main rounded"
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
                  />
                  {inputActive && (
                    <ul className="p-2 absolute bg-white border border-[#00bbb4] rounded w-full z-10">
                      {filteredData?.length > 0 ? (
                        filteredData.map((item, index) => (
                          <li
                            key={item._id}
                            onClick={() => handleItemClick(item)}
                            className="hover:bg-gray-300 cursor-pointer px-2 flex items-center gap-x-2 rounded w-full"
                          >
                            <GrLocation /> {item.name}
                          </li>
                        ))
                      ) : (
                        <li
                          className="text-center py-5 w-full"
                          style={{ height: "100px" }}
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
                </div>
                {/* Date Picker */}
                <div className="flex mt-5 px-2 py-1 border border-[#00bbb4] rounded ">
                  <div className="flex sm-date">
                    <i
                      className="fa-solid fa-calendar-days me-2 mt-1"
                      style={{ color: "#00bbb4" }}
                    ></i>
                    <DatePicker
                      selected={new Date(startDate)}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => reduxDispatch(leftDate(date))}
                      minDate={subDays(new Date(), 0)}
                    />
                  </div>
                  <div className="arrow-icon-sm">
                    <BsArrowRight />
                  </div>
                  <div className="flex sm-date ml-[-28px]">
                    <i
                      className="fa-solid fa-calendar-days me-2 mt-1"
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
                </div>
                {/* Date Count and Gender */}
                <div className="flex items-center mt-2 w-full gap-x-5">
                  <div className="flex items-center rounded gap-x-1 border border-[#00bbb4] py-0.5 w-[50%] pl-1">
                    <div>
                      <img src={durationImg} alt="" />
                    </div>
                    <div className="text-[12px]">
                      <span className="">
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
                  <div className="w-[50%] border border-[#00bbb4] rounded">
                    <select
                      className="pl-5 py-1 gender-sm text-[14px]"
                      value={genderValue}
                      onChange={(e) => handleGenderSelection(e.target.value)}
                    >
                      {gender.map((gender, index) => (
                        <option key={index} value={index}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Bed type and furnished or Unfurnished */}
                <div className="flex items-center mt-2 w-full gap-x-5">
                  <div className="flex items-center rounded gap-x-1 border border-[#00bbb4] py-0.5 w-[50%] pl-1">
                    <select
                      className=" pl-5 py-1 gender-sm text-[14px]"
                      name=""
                      id=""
                      onChange={(e) => handleBedSelection(e.target.value)}
                    >
                      <option value={0} disabled>
                        Bed Type
                      </option>
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
                          return null;
                        }

                        return (
                          <option key={index} className="my-4" value={index}>
                            <span
                              className={`${
                                bedValue === index
                                  ? "bedActive"
                                  : "bedNonActive"
                              } `}
                            >
                              {bed}
                            </span>
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="w-[50%] border border-[#00bbb4] rounded">
                    <select
                      className="pl-5 py-1 gender-sm text-[14px]"
                      value={FurnishedValue}
                      onChange={(e) => handleFurnitureSelection(e.target.value)}
                    >
                      {furnitures.map((furniture, index) => (
                        <option key={index} value={index}>
                          {furniture}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rent Styled Searching */}
                {/* <div className="flex justify-between">
                  <div>
                    <div>
                      <ul className={` styled-search-2 mt-3 `}>
                        {beds.map((bed, index) => {
                          if (
                            (categoryValue === 1 && bed !== "Bunk Bed") ||
                            (categoryValue === 2 &&
                              bed !== "1 BR" &&
                              bed !== "2 BR") ||
                            (categoryValue === 3 &&
                              bed !== "All" &&
                              bed !== "1 BR" &&
                              bed !== "2 BR" &&
                              bed !== "3 BR")
                          ) {
                            return null; // Skip rendering
                          }

                          return (
                            <li key={index} className="my-4">
                              <span
                                onClick={() => handleBedSelection(index)}
                                className={`${
                                  bedValue === index
                                    ? "bedActive"
                                    : "bedNonActive"
                                } `}
                              >
                                {bed}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <ul className=" styled-search-2 mt-6">
                      {furnitures.map((furniture, index) => (
                        <li key={index} className="my-4">
                          <span
                            onClick={() => handleFurnitureSelection(index)}
                            className={`${
                              FurnishedValue === index
                                ? "bedActive"
                                : "bedNonActive"
                            }`}
                          >
                            {furniture}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="styled-search-2 mt-6">
                      {gender.map((gender, index) => (
                        <li key={index} className="my-4">
                          <span
                            onClick={() => handleGenderSelection(index)}
                            className={`${
                              genderValue === index
                                ? "bedActive"
                                : "bedNonActive"
                            }`}
                          >
                            {gender}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}
                <div className="mt-7 w-full">
                  <div
                    className="w-full"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="submit"
                      value="Find Accomodation"
                      style={{
                        backgroundColor: "#00bbb4",
                        border: "none",
                        width: "100%",
                        color: "white",
                        padding: "15px 10px",
                        borderRadius: "5px",
                        // marginTop: "12px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </ReactModal>
    </>
  );
};

export default SearchBoxWithNav;
