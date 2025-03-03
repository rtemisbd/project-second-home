import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-tailwind/react";
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
import ReactModal from "react-modal";
import { placeSearchBoxShow } from "../../redux/reducers/smProfileMenuSlice";
import { GrLocation } from "react-icons/gr";
import { SyncLoader } from "react-spinners";
import { BiBody } from "react-icons/bi";
import { FaBed } from "react-icons/fa";

const SearchBoxWithNav = () => {
  const isSearchBoxShow = useSelector(
    (state) => state?.profileMenu?.isSearchBoxShow
  );

  const reduxDispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);
  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);
  const { data, loading, error, reFetch } = UseFetch(`category`);
  const { data: branch } = UseFetch(`branch`);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [destination, setDestination] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [genderQuery, setGenderQuery] = useState("female");
  const [genderValue, setGenderValue] = useState(0);
  const gender = ["Female", "Male"];

  const [categoryQuery, setCategoryQuery] = useState("All");
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

  const handleGenderSelection = (index) => {
    setGenderValue(index);
    const selectedGender = gender[index];
    if (selectedGender === "Female") {
      setGenderQuery("female");
    } else if (selectedGender === "Male") {
      setGenderQuery("male");
    }
  };

  const handleCategorySelection = (index) => {
    setCategoryValue(index);
    const selectedCategory = category[index];

    // Map category values to query values
    if (selectedCategory === "All") {
      setCategoryQuery("All"); // Empty string means no specific category filter
    } else {
      setCategoryQuery(selectedCategory);
    }

    // Handle bed selection based on category
    if (selectedCategory === "Private Room") {
    } else if (selectedCategory === "Shared Room") {
    } else {
      setBedValue(0); // Reset bed selection to "All" for other categories
      setBedrooms("");
    }
  };

  const handleBedSelection = (index) => {
    console.log(index);
    if (beds[index] === "All") {
      setBedrooms("");
    } else {
      setBedrooms(beds[index]);
    }
    setBedValue(index);
  };

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const payload = {
      destination,
      bedrooms,
      gender: genderQuery,
      category: categoryQuery,
    };

    dispatch({ type: "NEW_SEARCH", payload });
    reduxDispatch(placeSearchBoxShow(false));
    navigate(`/branch/${destination}`, { state: payload });
  };

  return (
    <>
      <ReactModal
        style={{
          content: {
            top: "0%",
            left: "0%",
            right: "auto",
            bottom: "auto",
            padding: 0,
            border: 0,
            width: "100%",
          },
        }}
        ariaHideApp={false}
        isOpen={isSearchBoxShow}
      >
        <div className="searchBoxSm mt-5">
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
                <ul className="flex mt-6">
                  {category.map((categoryItem, index) => (
                    <li key={index}>
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
                {/* Search filed */}
                <div className="input-filed-area mb-6" ref={inputRef}>
                  <div className="location-icon">
                    <img
                      src="https://i.ibb.co/z8kf0jf/location.png"
                      style={{
                        color: "#00bbb4",
                        width: "20px",
                        height: "20px",
                        marginTop: "-4px",
                      }}
                      alt="location"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Looking for best place to live"
                    required
                    value={query}
                    className="input_main rounded outline-none w-full h-10 pl-10"
                    ref={inputRef}
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
                <div className="flex mt-5 px-2 py-1 border border-[#00bbb4] rounded w-full justify-around">
                  <div className="flex sm-date ">
                    <i
                      className="fa-solid fa-calendar-days me-2 mt-1"
                      style={{ color: "#00bbb4" }}
                    ></i>
                    <DatePicker
                      selected={new Date(startDate)}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => reduxDispatch(leftDate(date))}
                      minDate={subDays(new Date(), 0)}
                      className="w-32"
                    />
                  </div>
                  <div className="arrow-icon-sm mt-1">
                    <BsArrowRight />
                  </div>
                  <div className="flex sm-date ml-[-28px] ">
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
                      className="w-32"
                    />
                  </div>
                </div>
                {/* Date Count and Gender */}
                {/* <p>Duration</p> */}
                <div className="flex gap-1 pt-2 w-full ">
                  <div className="w-1/2">
                    <div className="flex border rounded-l-lg rounded-r-lg mt-1 w-full">
                      <div className="w-[24%] py-1 rounded-l-lg bg-[#eafffd] flex justify-center items-center">
                        <i className="fa-solid fa-clock text-[#00bbb4] h-5 w-5" />
                      </div>
                      <div className="bg-white w-[71%] outline-none pl-2 py-[7px]">
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
                              ? `${customerRent?.months} m, ${customerRent?.days} days`
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
                  <div className="mt-1 border rounded-lg w-1/2">
                    <ul className="flex   rounded-lg w-full  ">
                      <li className="w-[30%] rounded-l-lg bg-[#eafffd] flex justify-center items-center">
                        <BiBody
                          className=""
                          style={{
                            color: "#339999",
                            height: "24px",
                            width: "100%",
                          }}
                        />
                      </li>
                      {gender.map((gender, index) => (
                        <li key={index} className="search_md_bed w-[35%] ">
                          <button
                            onClick={() => handleGenderSelection(index)}
                            disabled={gender === "Male"}
                            className={`${
                              genderValue === index
                                ? "bedActive"
                                : "bedNonActive"
                            } py-[7px] w-full  disabled:cursor-not-allowed`}
                          >
                            {gender}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* <div className="flex items-center mt-2 w-full gap-x-5">
                  <div className="flex items-center rounded gap-x-1 border border-[#00bbb4] py-0.5 w-[45%] pl-1">
                    <div>
                      <img loading="lazy" src={durationImg} alt="" />
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
                  <div className="w-[45%] border border-[#00bbb4] rounded">
                    <select
                      className="pl-5 py-1 gender-sm text-[14px]"
                      value={genderValue}
                      onChange={(e) => handleGenderSelection(e.target.value)}
                    >
                      {gender.map((gender, index) => (
                        <option
                          key={index}
                          value={index}
                          disabled={gender === "Male"}
                          className="disabled:cursor-not-allowed"
                        >
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}
                {/* Bed type and furnished or Unfurnished */}
                {/* <div className="flex items-center mt-2 w-full gap-x-5">
                  <div className="flex items-center rounded gap-x-1 border border-[#00bbb4] py-0.5 w-[50%] pl-1">
                    <select
                      className=" pl-5 py-1 gender-sm text-[14px]"
                      name=""
                      id=""
                      onChange={(e) => handleBedSelection(e.target.value)}
                    >
                      <option selected disabled>
                        Bed Type
                      </option>
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
                </div> */}

                <div className="flex items-center pt-2 w-full ">
                  <div>
                    <FaBed
                      style={{
                        color: "#339999",
                        height: "24px",
                        width: "24px",
                        marginTop: "20px",
                        marginRight: "12px",
                      }}
                    />
                  </div>

                  <ul
                    className={`flex justify-start gap-2  w-full mt-3  ${
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
                        <li key={index} className="text-[14px] font-semibold">
                          <span
                            onClick={() => handleBedSelection(index)}
                            className={`px-[6px]  py-[8px] rounded-md cursor-pointer hover:opacity-70  ${
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

                <div className="mt-7 w-full">
                  <div className="w-full flex justify-center">
                    <input
                      type="submit"
                      value="Find Accommodation"
                      className="bg-[#00bbb4] w-full text-white 4 py-3 rounded-md"
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
