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
import { addDays, addMonths, addYears, subDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";
import { SearchContext } from "../../contexts/SearchContext";
import UseFetch from "../../hooks/useFetch";
import { BsArrowRight } from "react-icons/bs";
import durationImg from "../../assets/img/clock-01.png";
import SearchBoxWithNav from "./SearchBoxWithNav";
import { placeSearchBoxShow } from "../../redux/reducers/smProfileMenuSlice";

const SearchBoxSm = () => {
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
    navigate("/list", { state: payload });
  };

  return (
    <div className="searchBoxSm mt-5">
      <div
        className="searchButton flex justify-between items-center "
        onClick={() => reduxDispatch(placeSearchBoxShow(true))}
      >
        <h5 className="text-black text-[1rem] ps-3">
          {" "}
          Find Your Accommodation
        </h5>

        <div className="pr-3">
          {" "}
          <i className="fa fa-search mt-2" />
        </div>
      </div>
      <SearchBoxWithNav />
    </div>
  );
};

export default SearchBoxSm;
