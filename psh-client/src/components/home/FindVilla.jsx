import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { SyncLoader } from "react-spinners";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const FindVilla = () => {
  const inputRef = useRef(null);
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
      console.log(data);
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

  return (
    <form className="">
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
                    className="hover:bg-gray-300 cursor-pointer px-2 rounded flex items-center gap-x-2 w-[212px]"
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
            {/* <img
              src="https://i.ibb.co/z8kf0jf/location.png"
              className="mx-auto w-5 h-5 "
              alt="location"
            /> */}
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
                    className="hover:bg-gray-300 cursor-pointer px-2 rounded flex items-center gap-x-2 w-[206px]"
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
      </div>
    </form>
  );
};

export default FindVilla;
