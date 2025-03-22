import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { SyncLoader } from "react-spinners";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import villa from "../../assets/img/villa.png";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { subDays } from "date-fns";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";

const FindVilla = () => {
  const inputRef = useRef(null);
  const reduxDispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);
  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);
  const [districts, setAllDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [resorts, setResorts] = useState([]);
  const [filterResorts, setFilterResorts] = useState([]);
  const [selectedResort, setSelectedResort] = useState(null);
  const [inputActive, setInputActive] = useState(false);
  const [inputActive2, setInputActive2] = useState(false);

  // Corrected handleItemClick
  const handleItemClick = (item) => {
    setSelectedDistrict(item.name);
    setInputActive(false);
    const filteredResort = resorts.filter(
      (resort) => resort.district === item.name
    );
    setFilterResorts(filteredResort);
  };
  const handleItemClick2 = (item) => {
    setSelectedResort(item.name);
    setInputActive2(false);
  };

  useEffect(() => {
    const fetchDistrict = async () => {
      const { data } = await axios.get(`${serverBaseUrl}/district`);
      setAllDistricts(data?.data);
    };
    const fetchResort = async () => {
      const { data } = await axios.get(`${serverBaseUrl}/resort`);
      setResorts(data?.data);
      setFilterResorts(data?.data);
    };

    fetchDistrict();
    fetchResort();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        (event.target.childElementCount > 1 ||
          event.target.childElementCount == 0)
      ) {
        setInputActive(false);
        setInputActive2(false);
      }
    };
    if (inputActive || inputActive2) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [inputActive, inputActive2]);

  useEffect(() => {
    reduxDispatch(toTalRent());

    if (customerRent.remainingDays < 1) {
      reduxDispatch(rightDate(addDays(new Date(startDate), 1)));
    }
  }, [startDate, endDate, customerRent?.remainingDays]);

  return (
    <form className="">
      {/* district and area */}
      <div className="flex gap-3">
        <div
          className="flex border  rounded-l-lg rounded-r-lg mt-1 relative w-1/2"
          ref={inputRef}
        >
          <div className="w-[17%] py-[7px] rounded-l-lg bg-[#eafffd] text-[#00bbb4]">
            <img
              src="https://i.ibb.co/z8kf0jf/location.png"
              className="mx-auto w-5 h-5 "
              alt="location"
            />
          </div>
          <input
            type="text"
            placeholder="Choose the district "
            className="w-full rounded-r-lg focus: outline-none  bg-white pl-2"
            ref={inputRef}
            value={selectedDistrict}
            onClick={() => setInputActive(true)}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            required
          />
          {inputActive && (
            <ul className="absolute top-[34px] left-7 bg-white z-50 border border-l-[#eafffd] border-b-[#eafffd] rounded rounded-t-none">
              {districts.length > 0 ? (
                districts.map((item, index) => (
                  <li
                    key={item._id}
                    onClick={() => handleItemClick(item)}
                    className="hover:bg-gray-300 cursor-pointer px-2 rounded flex items-center gap-x-2 w-[178px]"
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
                  <SyncLoader color="#6B7280" size={8} speedMultiplier={0.7} />
                </li>
              )}
            </ul>
          )}
        </div>
        <div
          className="flex border  rounded-l-lg rounded-r-lg mt-1 relative w-1/2"
          ref={inputRef}
        >
          <div className="w-[17%] py-[7px] rounded-l-lg bg-[#eafffd] text-[#00bbb4]">
            <img src={villa} className="mx-auto w-5 h-5 " alt="villa" />
          </div>
          <input
            type="text"
            placeholder="Best place to live"
            className="w-full rounded-r-lg focus: outline-none  bg-white pl-2"
            ref={inputRef}
            value={selectedResort}
            onClick={() => setInputActive2(true)}
            onChange={(e) => setSelectedResort(e.target.value)}
            required
          />
          {inputActive2 && (
            <ul className="absolute top-[34px] left-7 bg-white z-50 border border-l-[#eafffd] border-b-[#eafffd] rounded rounded-t-none">
              {filterResorts.length > 0 ? (
                filterResorts.map((item, index) => (
                  <li
                    key={item._id}
                    onClick={() => handleItemClick2(item)}
                    className="hover:bg-gray-300 cursor-pointer px-2   w-[178px] border border-t-0 border-y-0 border-b"
                  >
                    {/* <GrLocation /> */}
                    {item.name}
                  </li>
                ))
              ) : (
                <li
                  className="text-center py-5"
                  style={{ height: "100px", width: "385px" }}
                >
                  <SyncLoader color="#6B7280" size={8} speedMultiplier={0.7} />
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
              className="bg-white outline-none pl-2 py-[7px] w-[75%]"
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

      <div className="flex gap-1 pt-2 w-full ">
        {/* <p>Duration</p> */}
        <div className="w-1/2">
          <div className="flex border rounded-l-lg rounded-r-lg mt-1 w-full">
            <div className="w-[24%] py-1 rounded-l-lg bg-[#eafffd] flex justify-center items-center">
              <i className="fa-solid fa-clock text-[#00bbb4] h-5 w-5" />
            </div>
            <div className="bg-white w-[71%] outline-none pl-2 py-[7px]">
              <span>
                {`${
                  customerRent?.remainingDays >= 0
                    ? `${customerRent?.remainingDays} ${
                        customerRent?.remainingDays === 1 ? "Night" : " Nights"
                      } `
                    : ""
                }`}
              </span>
            </div>
          </div>
        </div>
        {/* occupancy */}
        <div className="mt-1 border rounded-lg w-1/2 flex">
          <div className="w-1/2 rounded-l-lg border-r  flex justify-start items-center  h-full">
            <p className="bg-[#eafffd] w-2/3 h-full text-center px-3 pt-2">
              Adult
            </p>
            <div className="w-1/3">
              <input
                type="number"
                min={1}
                defaultValue={2}
                className="w-full outline-none pl-2"
              />
            </div>
          </div>
          <div className="w-1/2 rounded-l-lg   flex justify-start items-center  h-full">
            <p className="bg-[#eafffd] w-2/3 h-full text-center px-3 pt-2">
              Children
            </p>
            <div className="w-1/3">
              <input
                type="number"
                min={0}
                defaultValue={0}
                className="w-full outline-none pl-2"
              />
            </div>
          </div>
        </div>
      </div>

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
    </form>
  );
};

export default FindVilla;
