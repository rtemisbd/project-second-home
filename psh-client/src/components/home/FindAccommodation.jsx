import { useEffect, useRef, useContext } from "react";

import { useState } from "react";
import { FaBed } from "react-icons/fa";
import { BiBody } from "react-icons/bi";
import { addDays, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrLocation } from "react-icons/gr";
import { SearchContext } from "../../contexts/SearchContext";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";
import UseFetch from "../../hooks/useFetch";
import "./styles/SearchBox.css";
import { SyncLoader } from "react-spinners";
import FindVilla from "./FindVilla";
import { Range } from "react-range";

const FindAccommodation = ({ highestPrice }) => {
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

  const [categoryQuery, setCategoryQuery] = useState("All");
  const [categoryValue, setCategoryValue] = useState(0);
  const category = ["All", ...data.map((item) => item?.name)];
  const beds = ["All", "Bunk Bed", "Single Bed", "King Size Bed"];
  const [bedValue, setBedValue] = useState(0);
  const [showVillaForm, setShowVillaForm] = useState(false);

  const [adultCount, setAdultCount] = useState(2);
  const [kidCount, setKidCount] = useState(0);

  const [priceRange, setPriceRange] = useState([0, highestPrice]);

  const [inputActive, setInputActive] = useState(false);

  // Corrected handleItemClick
  const handleItemClick = (item) => {
    setQuery(item.name);
    setDestination(item?.name);
    setInputActive(false);
  };

  useEffect(() => {
    setPriceRange((prev) => {
      let min = Math.max(0, prev[0]); // clamp min >= 0
      let max = Math.min(highestPrice, prev[1]); // clamp max <= highestPrice

      // If somehow min > max, reset to full range
      if (min > max) {
        return [0, highestPrice];
      }
      return [min, max];
    });
  }, [highestPrice]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        (event.target.childElementCount > 1 ||
          event.target.childElementCount == 0)
      ) {
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

  const filteredData = branch.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

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
    const month = today.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();
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
    if (selectedCategory === "All") {
      setCategoryQuery("All");
    } else {
      setCategoryQuery(selectedCategory);
    }

    if (selectedCategory === "Private Room") {
      setShowVillaForm(false);
    } else if (selectedCategory === "Shared Room") {
      setShowVillaForm(false);
    } else if (selectedCategory === "Villa") {
      setShowVillaForm(true);
    } else {
      setShowVillaForm(false);
      setBedValue(0);
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
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };

    dispatch({ type: "NEW_SEARCH", payload });
    navigate(`/branch/${destination}`, { state: payload });
  };
  return (
    <>
      <h2 className="text-base font-bold">Where Do You Want To Stay ...? </h2>
      <form className="" onSubmit={handleSearch}>
        <div className="pt-2 space-y-1 ">
          {/* room category */}
          <ul className="flex text-[18px] ">
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
          {!showVillaForm ? (
            <div>
              {/* location */}
              <div className="">
                <div
                  className="flex border  rounded-l-lg rounded-r-lg mt-1 relative w-full"
                  ref={inputRef}
                >
                  <div className="w-[15%] py-[7px] rounded-l-lg bg-[#eafffd] text-[#00bbb4]">
                    <img
                      src="https://i.ibb.co/z8kf0jf/location.png"
                      className="mx-auto w-5 h-5 "
                      alt="location"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Looking for best place to live"
                    value={query}
                    className="w-full rounded-r-lg focus: outline-none  bg-white pl-2"
                    ref={inputRef}
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={() => setInputActive(true)}
                    required
                  />
                  {inputActive && (
                    <ul className="absolute top-9 left-16 bg-white z-50 border border-l-[#00bbb4] border-b-[#00bbb4] rounded rounded-t-none">
                      {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                          <li
                            key={item._id}
                            onClick={() => handleItemClick(item)}
                            className="hover:bg-gray-300 cursor-pointer px-2 rounded flex items-center gap-x-2 w-[346px]"
                          >
                            <GrLocation />
                            {item.name}
                          </li>
                        ))
                      ) : (
                        <li
                          className="text-center py-5"
                          style={{ height: "100px", width: "385px" }}
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
              </div>
              {/* rent dates */}

              <div className="flex gap-1 pt-2 w-full" ref={inputRef}>
                <div className="w-1/2 ">
                  {/* <p>Check In</p> */}
                  <div className="flex border rounded-l-lg rounded-r-lg mt-1  w-full">
                    <div className="w-[35%] py-[7px] rounded-l-lg bg-[#eafffd] flex justify-center items-center">
                      <i className="fa-solid fa-calendar-days  text-[#00bbb4] h-5 w-5" />
                    </div>
                    <DatePicker
                      className="bg-white outline-none pl-2 py-[7px] w-[75%] relative z-40"
                      selected={new Date(startDate)}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => reduxDispatch(leftDate(date))}
                      minDate={subDays(new Date(), 0)}
                    />
                  </div>
                </div>
                <div className="w-1/2 ">
                  {/* <p>Check Out</p> */}
                  <div className="flex border rounded-l-lg rounded-r-lg mt-1  w-full">
                    <div className="w-[35%] py-[7px] rounded-l-lg bg-[#eafffd] flex justify-center items-center">
                      <i className="fa-solid fa-calendar-days  text-[#00bbb4]" />
                    </div>
                    <DatePicker
                      className="bg-white outline-none pl-2 py-[7px] w-[75%]"
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
              </div>

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
                            ? `${customerRent?.daysDifference} Night`
                            : ""
                        }`}
                        {`${
                          customerRent?.months &&
                          customerRent?.days >= 0 &&
                          !customerRent?.years
                            ? `${customerRent?.months} month, ${customerRent?.days} Night`
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
                {categoryQuery !== "Homestay" && (
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
                )}
                {categoryQuery === "Homestay" && (
                  <div className="mt-1 border rounded-lg w-1/2 flex">
                    <div className="w-1/2 rounded-l-lg border-r  flex justify-start items-center  h-full">
                      <p className="bg-[#eafffd] w-2/3 h-full text-center px-2 md:px-3 pt-2">
                        Adult
                      </p>
                      <div className="w-1/3">
                        <input
                          type="number"
                          min={1}
                          value={adultCount}
                          onChange={(e) =>
                            setAdultCount(Number(e.target.value))
                          }
                          className="w-full outline-none pl-2"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 rounded-l-lg   flex justify-start items-center  h-full">
                      <p className="bg-[#eafffd] w-2/3 h-full text-center px-2 md:px-3 pt-2">
                        Child
                      </p>
                      <div className="w-1/3">
                        <input
                          type="number"
                          min={0}
                          value={kidCount}
                          onChange={(e) => setKidCount(Number(e.target.value))}
                          className="w-full outline-none pl-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* bed */}
              {categoryQuery !== "Homestay" && (
                <div className="flex items-center pt-2 w-full">
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
                    className={`flex  gap-2  w-full mt-3  ${
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
                        <li key={index} className="font-semibold">
                          <span
                            onClick={() => handleBedSelection(index)}
                            className={`px-[10px]  py-[8px] rounded-md cursor-pointer hover:opacity-70  ${
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
              )}
              {/* Price Range Filter */}
              {categoryQuery === "Homestay" && (
                <div className="flex items-center pt-2 w-full">
                  <div className="flex border rounded-l-lg rounded-r-lg mt-1 w-full">
                    {/* Left icon box */}
                    <div className="w-[15%] py-2 rounded-l-lg bg-[#eafffd] flex justify-center items-center text-[#00bbb4] font-bold">
                      BDT
                    </div>

                    {/* Slider box */}
                    <div className="flex flex-col justify-center w-[85%] px-3 py-2 bg-white">
                      <p className="text-sm text-gray-700 mb-1">
                        Price Range: {priceRange[0]} - {priceRange[1]}
                      </p>

                      <Range
                        step={100}
                        min={0}
                        max={highestPrice}
                        values={priceRange}
                        onChange={(values) => setPriceRange(values)}
                        renderTrack={({ props, children }) => {
                          const { key, ...restProps } = props;
                          return (
                            <div
                              {...restProps}
                              className="h-2 rounded"
                              style={{
                                background: `linear-gradient(to right, 
                                #d1d5db 0%, 
                                #d1d5db ${
                                  (priceRange[0] / highestPrice) * 100
                                }%, 
                                #00bbb4 ${
                                  (priceRange[0] / highestPrice) * 100
                                }%, 
                                #00bbb4 ${
                                  (priceRange[1] / highestPrice) * 100
                                }%, 
                                #d1d5db ${
                                  (priceRange[1] / highestPrice) * 100
                                }%, 
                                #d1d5db 100%)`,
                              }}
                            >
                              {children}
                            </div>
                          );
                        }}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            className="w-4 h-4 bg-white border border-[#00bbb4] rounded-full shadow"
                          />
                        )}
                      />
                      {/* <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>0</span>
                        <span>100000</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              )}

              <div className="py-2">
                <input
                  type="submit"
                  className="bg-[#00bbb4] hover:bg-[#2dc3c0]"
                  value="Find Accommodation"
                  style={{
                    border: "none",
                    color: "white",
                    padding: "7px 10px",
                    borderRadius: "5px",
                    marginTop: "5px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          ) : (
            <FindVilla />
          )}
        </div>
      </form>
    </>
  );
};

export default FindAccommodation;
