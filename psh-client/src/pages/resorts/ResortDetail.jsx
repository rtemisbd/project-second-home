import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import VillaMedia from "../../components/Villa/VillaMedia";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { anchorClickHandler } from "../../utilities/anchorClickHandler";
import { AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import Map from "../Details/Map";

const ResortDetail = () => {
  const { id } = useParams();
  const [resort, setResort] = useState(null);
  const [allVilla, setAllVilla] = useState([]);
  const [addedWishList, setAddedWishlist] = useState(false);
  const [keyValue, setKeyValue] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [facilities, setFacilities] = useState([]);

  const navItems = [
    { name: "Key Details", id: "keyDetails" },
    { name: "Services & Amenities", id: "amenities" },
    { name: "Price Details", id: "price" },
    { name: "Policies", id: "policies" },
  ];

  const anchorClick = (e) => {
    anchorClickHandler(e);
  };

  useEffect(() => {
    const fetchResort = async () => {
      try {
        const { data } = await axios.get(`${serverBaseUrl}/resort/${id}`);
        setResort(data?.data);
        setFacilities(
          showAll ? data?.data?.facilities : data?.data?.facilities.slice(0, 8)
        );
      } catch (error) {
        console.error("Failed to fetch resort:", error);
      }
    };
    fetchResort();
  }, [id, showAll]);

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const { data: villaData } = await axios.get(
          `${serverBaseUrl}/villa?resortId=${id}`
        );
        setAllVilla(villaData?.data);
      } catch (error) {
        console.error("Failed to fetch villas:", error);
      }
    };
    fetchVillas();
  }, [id]);

  console.log({ resort, allVilla });

  return (
    <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0">
      {resort?.photos.length > 0 ? (
        <div className="flex items-center gap-x-3 md:mt-3 sm:mt-0">
          <Link to="/" className="hover:text-[#00bbb4] md:block sm:hidden">
            <p>Home</p>
          </Link>
          <p className="sm:hidden md:block">
            <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
          </p>

          <p className="sm:hidden md:block">Resort</p>

          <p className="sm:hidden md:block">
            <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
          </p>
          <Link to="/" className="md:hidden sm:block">
            <p>
              <MdKeyboardArrowLeft className="w-[20px] h-[20px]" />
            </p>
          </Link>
          <p>Resort Details</p>
        </div>
      ) : (
        ""
      )}
      {/* media, info */}
      <div className="mt-2">
        <VillaMedia video={resort?.video} photos={resort?.photos} />

        {/* name location contact */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 px-1 ">
              {resort?.name} - {resort?.district} , {resort?.division}
            </h1>
 
            <div className="flex text-[#9A9A9A] items-center mt-2">
              <img
                src="/public/images/icon/marker-02.png"
                className="md:w-[25px] sm:w-[35px]"
                alt=""
              />

              <p className="ms-1"> {resort?.address} </p>
            </div>
            <div className="flex text-[#9A9A9A] items-center mt-2">
              <IoCallOutline className="md:w-[25px] h-[25px] sm:w-[35px]" />
              {resort?.contactNumbers?.map((contact, ind) => (
                <span key={ind} className="ms-1">
                  {contact?.number}
                  {ind + 1 < resort?.contactNumbers?.length && (
                    <span className="text-2xl"> ,</span>
                  )}
                </span>
              ))}
            </div>
            <div className="flex text-[#9A9A9A] items-center mt-2">
              <HiOutlineMail className="md:w-[25px] h-[25px] sm:w-[35px]" />

              <p className="ms-1"> {resort?.resortEmail} </p>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 flex md:ml-[50px] justify-end md:justify-between pr-4">
            <div>
              <AiFillHeart
                className={`w-[24px] h-[30px] cursor-pointer ${
                  addedWishList && "text-red-600"
                }`}
                // onClick={handleWishlist}
              />
            </div>
            <div>
              <AiOutlineShareAlt className="w-[24px] h-[30px] cursor-pointer ml-5 hover:text-[#35B0A7]" />
            </div>
          </div>
        </div>
      </div>
      {/* welcome note */}
      <div className="w-full py-5">
        <h2 className="text-xl font-bold text-gray-900">Welcome Note</h2>
        <div className="bg-gray-900 pt-1 w-1/6 "></div>
        <p className="mt-5 text-justify w-4/5">{resort?.welcomeNote}</p>
      </div>

      {/* common facilities */}

      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-900 facility_h1 p-2 mt-5">
          Common Facilities
        </h2>
        <ul className=" grid md:grid-cols-2 px-5 py-5 ">
          <>
            {facilities?.map((facility, ind) => (
              <li key={ind} className="list-disc">
                {facility?.title}
              </li>
            ))}
          </>
        </ul>
        {resort?.facilities.length > 8 && (
          <div
            className=" flex justify-end cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
              {showAll ? "See Less" : "See More"}
            </p>
          </div>
        )}
      </div>

      {/* villas */}
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-900 facility_h1 p-2 mt-5">
          List Of Villa
        </h2>
        <div className=" grid md:grid-cols-2 px-5 py-5 "></div>
        {resort?.facilities.length > 8 && (
          <div
            className=" flex justify-end cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
              {showAll ? "See Less" : "See More"}
            </p>
          </div>
        )}
      </div>

      {/* location */}
      <div className="w-full">
        {resort?.locationLink !== "." ? (
          <>
            <div className="facility_h1 p-2">
              <h2 className="text-xl font-bold text-gray-900">Location</h2>
            </div>

            <div className="hidden md:block mt-5">
              <Map branch={resort}></Map>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* review will include later */}

      <div className="flex items-center gap-x-3 request-visit">
        <button
          className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch   px-4 py-1 rounded-lg"
          style={{ width: 220 }}
          // onClick={() => handleOpen2("sm")}
        >
          Request for a visit to our PSH
        </button>

        {/* end */}
      </div>
    </div>
  );
};

export default ResortDetail;
