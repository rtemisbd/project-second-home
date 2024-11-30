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
