import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Slider from "react-slider";
import { useEffect } from "react";

import UseFetch from "../../hooks/useFetch";
import "./ListFilter.css";

const ListFilter = ({
  handleFacilityFilterChange,
  handleCommonFacilityFilterChange,
  commonFacilityFilters,
  facilityFilters,
  sort,
  min,
  max,
  handleSortChange = { handleSortChange },
  handlePriceFilterChange = { handlePriceFilterChange },
}) => {
  const { data } = UseFetch(`facility`);
  const { data: facality } = UseFetch(`commonfacility`);
  const [isPrice, setIsPrice] = useState(false);
  const [isProvider, setIsProvider] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [isFacility, setIsFacility] = useState(false);
  const [isRoomMate, setIsRoomMate] = useState(false);
  const MIN = 0;
  const MAX = 200000;
  const [values, setValues] = useState([min || MIN, max || MAX]);

  const handleSliderChange = (newValues) => {
    setValues(newValues);
  };

  const applyPriceFilter = () => {
    handlePriceFilterChange(values[0], values[1]);
  };
  const [showAllFacility, setShowAllFacility] = useState(false);
  const initialShowAllFacility = 5;
  const facilityToDisplay = showAllFacility
    ? data
    : data.slice(0, initialShowAllFacility);

  const [showAllRoommates, setShowAllRoommates] = useState(false);
  const initialItemsToShow = 5;
  const roommatesToDisplay = showAllRoommates ? data : data.slice(0);

  useEffect(() => {
    setValues([min || MIN, max || MAX]);
  }, [min, max]);
  // console.log("min", MIN, MAX);
  return (
    <div className="left-filter md:pb-20">
      <div
        onClick={() => setIsPrice(!isPrice)}
        className="text-xl font-medium flex justify-between cursor-pointer"
      >
        <p className="text-black text-base">Price</p>
        <div>
          <IoIosArrowDown className="text-black" />
        </div>
      </div>

      {isPrice ? null : (
        <div className="mt-5">
          <div className="flex justify-evenly">
            <div>
              <input
                className="pl-3 text-black text-sm price-input"
                type="text"
                value={`BDT ${values[0]}`}
                style={{
                  width: "80%",
                  height: "30px",
                }}
              />
            </div>
            <p className="mr-5 font-bold text-2xl">-</p>
            <div>
              <input
                className="pl-3 text-black text-sm price-input"
                value={`BDT ${values[1]}`}
                type="text"
                style={{ width: "80%", height: "30px" }}
              />
            </div>
          </div>
          <div className="mt-5">
            <Slider
              className={"Slider "}
              value={values}
              min={MIN}
              max={MAX}
              onChange={handleSliderChange}
              onAfterChange={applyPriceFilter}
            />
          </div>
        </div>
      )}

      {/* Provider */}
      <hr className="mt-5" style={{ color: "#DFD6D6" }} />
      <div className="mt-5">
        <div
          onClick={() => setIsProvider(!isProvider)}
          className="text-xl font-medium flex justify-between cursor-pointer"
        >
          <p className="text-black text-base">Provider</p>
          <div>
            <IoIosArrowDown className="text-black" />
          </div>
        </div>

        {isProvider ? null : (
          <div className="mt-5">
            <div className="flex">
              <div>
                <input
                  type="radio"
                  name="provider"
                  className="radio-button"
                  id=""
                  multiple
                />
              </div>
              <p className="ml-3 text-black text-base">Show All</p>
            </div>
            <div className="flex mt-3">
              <div>
                <input
                  type="radio"
                  name="provider"
                  className="radio-button"
                  id=""
                  multiple
                />
              </div>
              <p className="ml-3 text-black text-base">Rtemis</p>
            </div>
            <div className="flex mt-3">
              <div>
                <input
                  type="radio"
                  name="provider"
                  className="radio-button"
                  id=""
                  multiple
                />
              </div>
              <p className="ml-3 text-black text-base">Partner</p>
            </div>
          </div>
        )}
      </div>
      {/* Sort By */}
      <hr className="mt-5" style={{ color: "#DFD6D6" }} />
      <div className="mt-5">
        <div
          onClick={() => setIsSort(!isSort)}
          className="text-xl font-medium flex justify-between cursor-pointer"
        >
          <p className="text-black text-base">Sort By</p>
          <div>
            <IoIosArrowDown className="text-black" />
          </div>
        </div>
        {isSort ? null : (
          <div className="mt-5">
            <div className="flex">
              <div>
                <input
                  type="radio"
                  name="sort"
                  className="radio-button"
                  value="asc"
                  onChange={handleSortChange}
                  checked={sort === "asc"}
                />
              </div>
              <p className="ml-3 text-black text-base ">
                Cheapest - Most Expensive
              </p>
            </div>
            <div className="flex mt-3">
              <div>
                <input
                  type="radio"
                  name="sort"
                  className="radio-button"
                  value="desc"
                  onChange={handleSortChange}
                  checked={sort === "desc"}
                />
              </div>
              <p className="ml-3 text-black text-base">
                {" "}
                Most Expensive - Cheapest
              </p>
            </div>
            {/* <div className="flex mt-3">
              <div>
                <input
                  type="radio"
                  name="provider"
                  className="radio-button"
                  id=""
                  multiple
                />
              </div>
              <p className="ml-3 text-black text-base">
                {" "}
                Highest rating - Lowest rating
              </p>
            </div> */}
          </div>
        )}
      </div>

      {/* Facility */}
      <hr className="mt-5" style={{ color: "#DFD6D6" }} />
      <div className="mt-5">
        <div
          onClick={() => setIsFacility(!isFacility)}
          className="text-xl font-medium flex justify-between cursor-pointer"
        >
          <p className="text-black text-base">Facility</p>
          <div>
            <IoIosArrowDown className="text-black" />
          </div>
        </div>
        {isFacility ? null : (
          <div className="mt-5">
            {facilityToDisplay.map((facility) => (
              <>
                {facility?.photos[0] && (
                  <div key={facility._id} className="flex items-center mt-3">
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox-button"
                        onChange={() =>
                          handleFacilityFilterChange(facility.name)
                        }
                        checked={facilityFilters?.includes(facility.name)}
                      />
                    </div>
                    <img
                      src={facility?.photos[0]}
                      alt=""
                      className="ml-2"
                      style={{ width: 20 }}
                    />
                    <p className="ml-3 text-black text-base" htmlFor={facility}>
                      {facility.name}
                    </p>
                  </div>
                )}
              </>
            ))}
            {data.length > initialShowAllFacility && (
              <button
                className="text-blue-500 cursor-pointer mt-3"
                onClick={() => setShowAllFacility(!showAllFacility)}
              >
                {showAllFacility ? "View Less" : "View More"}
              </button>
            )}
          </div>
        )}
      </div>
      {/* Roommate */}
      {/* <hr className="mt-5" style={{ color: "#DFD6D6" }} /> */}
      {/* <div className="mt-5">
        <div
          onClick={() => setIsRoomMate(!isRoomMate)}
          className="text-xl font-medium flex justify-between cursor-pointer"
        >
          <p className="text-black text-base">Roommate Preference</p>
          <div>
            <IoIosArrowDown className="text-black" />
          </div>
        </div>
        {isRoomMate ? null : (
          <div className="mt-5">
            {roommatesToDisplay.map((facility) => (
              <>
                {!facility?.photos[0] && (
                  <div key={facility._id} className="flex items-center mt-3">
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox-button"
                        onChange={() =>
                          handleFacilityFilterChange(facility.name)
                        }
                        checked={facilityFilters?.includes(facility.name)}
                      />
                    </div>

                    <p className="ml-3 text-black text-base" htmlFor={facility}>
                      {facility.name}
                    </p>
                  </div>
                )}
              </>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ListFilter;
