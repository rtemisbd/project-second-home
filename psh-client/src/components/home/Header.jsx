import React, { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import SearchBox from "./SearchBox";
import "./Header.css";

function Header({ type }) {
  const handleFurnitureSelection = (index) => {
    setFurnitureValue(index);
    const selectedFurniture = furnitures[index];
    setFurnituredDisplay(selectedFurniture);

    // Map furnitures values to query values
    if (selectedFurniture === "Furnished") {
      setFurnituredQuery("yes");
    } else if (selectedFurniture === "No Furnitured") {
      setFurnituredQuery("no");
    }
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
  };

  const beds = ["All", "1 BR", "2 BR", "3 BR"];
  const [bedValue, setBedValue] = useState(0); // Initially selecting "All" bed
  const handleBedSelection = (index) => {
    setBedValue(index);
    if (index === 0) {
      // If "All" is selected, set bedrooms to an empty array
      setBedrooms([]);
    } else {
      setBedrooms([`${index}`]); // Assuming "bedrooms" is an array of strings
    }
  };
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleSearch = () => {
    const payload = {
      destination,
      bedrooms: bedrooms.length > 0 ? bedrooms : "Any",
      furnitured: furnituredQuery,
      category: categoryQuery,
    };

    dispatch({ type: "NEW_SEARCH", payload });
    navigate("/list", { state: payload });
  };

  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [value, setValue] = useState("");

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setDestination(newValue);
  };
  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      const response = await fetch(
        `https://api.psh.com.bd/api/property?query=${value}`
      );
      const data = await response.json();

      const suggestions = data.map((item) => item.city);
      const unique = Array.from(new Set(suggestions));
      const filteredSuggestions = unique.filter(
        (city) => city.toLowerCase().indexOf(value.toLowerCase()) > -1
      );

      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  return (
    <>
      <SearchBox />
    </>
  );
}

export default Header;
