import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import VillaMedia from "../../components/Villa/VillaMedia";
import ExpandableText from "../../helpers/utils/ExpandableText";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import Map from "../Details/Map";
import "../../pages/Details/Room.css";
import { IoCallOutline } from "react-icons/io5";
import { convertHtml } from "../../helpers/utils/convertHtml";
import VillaBookingBox from "../Booking/VillaBookingBox";
import { FaEye } from "react-icons/fa";
import { MdClose, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import YouTube from "react-youtube";
import getYouTubeVideoId from "../../helpers/utils/getYouTubeVideoId";
import { playerOptions } from "../../helpers/utils/playerOptions";
import { anchorClickHandler } from "../../utilities/anchorClickHandler";
import VillaRecommended from "../../components/Villa/VillaRecommended";
import { AuthContext } from "../../contexts/UserProvider";
import toast from "react-hot-toast";

const VillaDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [villa, setVilla] = useState(null);
  const [bookedDates, setBookDates] = useState(null);
  const [addedWishList, setAddedWishlist] = useState(false);
  const [wishId, setWishId] = useState(null);
  const videoId = getYouTubeVideoId(villa?.resortId.video);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyValue, setKeyValue] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [features, setFeatures] = useState([]);
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);

  const navItems = [
    { name: "Key Details", id: "keyDetails" },
    { name: "Services & Amenities", id: "amenities" },
    { name: "Price Details", id: "price" },
    { name: "Policies", id: "policies" },
  ];

  const anchorClick = (e) => {
    anchorClickHandler(e);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
    if (playerRef.current) {
      if (!isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
    }
  };

  const openVideoInYouTube = (e) => {
    e.stopPropagation();
    if (villa?.resortId?.video) window.open(villa?.resortId?.video, "_blank");
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
    if (isMuted) {
      event.target.mute();
    } else {
      event.target.unMute();
    }
  };

  const convertToAMPM = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12; // 0 becomes 12
    return `${adjustedHour}:${minutes} ${ampm}`;
  };
  useEffect(() => {
    const fetchWishList = async () => {
      const { data } = await axios.get(
        `${serverBaseUrl}/wishlist/${user?.phone}/${id}`
      );

      if (data?.data) {
        setAddedWishlist(true);
        setWishId(data?.data?._id);
      }
    };
    fetchWishList();
  }, [addedWishList]);
  const handleWishlist = async () => {
    if (!user?.phone) {
      toast.error("Please login first.");
      return;
    }
    if (!addedWishList) {
      try {
        const newWishlist = {
          userName: user?.firstName,
          userPhone: user?.phone,
          propertyId: id,
          roomType: "Villa",
        };
        const response = await axios.post(
          `${serverBaseUrl}/wishlist`,
          newWishlist
        );
        toast.success("Added to your wishlist!");

        setAddedWishlist(true);
      } catch (error) {
        console.log(error);

        toast.error("Something went wrong!");
      }
    } else {
      try {
        const response = await axios.delete(
          `${serverBaseUrl}/wishlist/${wishId}`
        );
        toast.success("Removed from your wishlist!");
        setAddedWishlist(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsPlaying(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (playerContainerRef.current) {
      observer.observe(playerContainerRef.current);
    }

    return () => {
      if (playerContainerRef.current) {
        observer.unobserve(playerContainerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchVilla = async () => {
      const { data } = await axios.get(`${serverBaseUrl}/villa/${id}`);

      setVilla(data?.data?.villa);
      setBookDates(data?.data?.bookedDates);
      setFeatures(
        showAll
          ? data?.data?.villa.features
          : data?.data?.villa.features.slice(0, 8)
      );
    };
    fetchVilla();
  }, [id, showAll]);

  return (
    <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0">
      {villa?.media?.photos.length > 0 ? (
        <div className="flex items-center gap-x-3 md:mt-3 sm:mt-0">
          <Link to="/" className="hover:text-[#00bbb4] md:block sm:hidden">
            <p>Home</p>
          </Link>
          <p className="sm:hidden md:block">
            <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
          </p>

          <p className="sm:hidden md:block">Villa</p>

          <p className="sm:hidden md:block">
            <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
          </p>
          <Link to="/" className="md:hidden sm:block">
            <p>
              <MdKeyboardArrowLeft className="w-[20px] h-[20px]" />
            </p>
          </Link>
          <p>Villa Details</p>
        </div>
      ) : (
        ""
      )}
      <div className="mt-2">
        <div className=" ">
          <VillaMedia
            video={villa?.media?.video}
            photos={villa?.media?.photos}
          />
          <div className="sticky lg:top-[70px] sm:top-[70px] bg-white py-1 ">
            <div className="flex text-[24px] font-medium">
              <div className="sm:flex flex-wrap">
                {navItems?.map((item, index) => (
                  <div key={index} onClick={() => setKeyValue(index)}>
                    <span>
                      <a
                        href={`#${item?.id}`}
                        onClick={anchorClick}
                        className={`hover:text-black hover:border-b-2 border-[#27b3b1] sm:text-[12px] md:text-[1rem] md:px-8 custom_key sm:px-1 py-1 border ${
                          keyValue === index
                            ? "bg-[#00bbb4] text-white hover:text-white"
                            : ""
                        }`}
                      >
                        {item?.name}
                      </a>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" text-start ">
            <div className="grid grid-cols-12 lg:gap-x-5 gap-y-16 ">
              <div className="flex flex-col items-start space-y-3 sm:col-span-12 lg:col-span-8  pt-2">
                <div className="grid md:grid-cols-12 sm:grid-cols-6">
                  <div className="col-span-10">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 px-1 ">
                        {villa?.title} - {villa?.resortId?.name}
                      </h1>
                      <div className="flex flex-col md:flex-row md:gap-4 mt-2 font-bold ms-1">
                        {/* <FaEye className="md:w-[25px] sm:w-[35px]" /> */}

                        <p>View : {villa?.view} </p>
                        <p>
                          Occupancy : {villa?.occupancy?.adults} [adult] ,{" "}
                          {villa?.occupancy?.kids} [kids]
                        </p>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center text-[#9A9A9A]">
                          <p className="ms-1 md:text-xl font-bold">
                            Villa Type : {villa?.type}{" "}
                            <span className="text-sm md:text-base  ">
                              [{villa?.villaNumber}]
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex text-[#9A9A9A] items-center mt-2">
                        <img
                          src="/public/images/icon/marker-02.png"
                          className="md:w-[25px] sm:w-[35px]"
                          alt=""
                        />

                        <p className="ms-1"> {villa?.resortId?.address} </p>
                      </div>
                      <div className="flex text-[#9A9A9A] items-center mt-2">
                        <div>
                          <IoCallOutline className="md:w-[25px] h-[25px] sm:w-[35px]" />
                        </div>
                        <p className="ms-1">
                          {" "}
                          {villa?.resortId?.contactNumbers?.map(
                            (contact, ind) => (
                              <span key={ind}>
                                <span className="mx-1">{contact}</span>
                                {ind + 1 <
                                  villa?.resortId?.contactNumbers?.length && (
                                  <span className="text-2xl">,</span>
                                )}
                              </span>
                            )
                          )}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-2 flex md:ml-[50px] justify-end md:justify-between pr-4">
                    <div>
                      <AiFillHeart
                        className={`w-[24px] h-[30px] cursor-pointer ${
                          addedWishList && "text-red-600"
                        }`}
                        onClick={handleWishlist}
                      />
                    </div>
                    <div>
                      <AiOutlineShareAlt className="w-[24px] h-[30px] cursor-pointer ml-5 hover:text-[#35B0A7]" />
                    </div>
                  </div>
                </div>
                {/* key details */}
                <div id="keyDetails" className="w-full">
                  <h2 className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5">
                    Key Details
                  </h2>
                </div>

                <div className="w-full flex flex-wrap justify-between gap-x-4 md:gap-y-6 sm:gap-y-4 p-0 lg:pr-8 ">
                  <div className="flex flex-col items-start ">
                    <p className="font-bold">Villa Type</p>
                    <p>{villa?.type}</p>
                  </div>
                  <div className="flex flex-col items-start ">
                    <p className="font-bold">View</p>
                    <p>{villa?.view}</p>
                  </div>

                  <div className="flex flex-col items-start ">
                    <p className="font-bold">Total Floor</p>
                    <p>{villa?.totalFloor} floor </p>
                  </div>
                  <div className="flex flex-col items-start ">
                    <p className="font-bold"> Bedrooms</p>
                    <p>
                      {villa?.totalRoom}{" "}
                      {villa?.totalRoom > 1 ? "Bedrooms" : "Bedroom"}
                    </p>
                  </div>
                  <div className="flex flex-col items-start ">
                    <p className="font-bold"> Bathrooms</p>
                    <p>
                      {villa?.totalBathroom}{" "}
                      {villa?.totalBathroom > 1 ? "Bathrooms" : "Bathroom"}
                    </p>
                  </div>
                  <div className="flex flex-col items-start ">
                    <p className="font-bold"> Balcony</p>
                    <p>
                      {villa?.totalBalcony}{" "}
                      {villa?.totalBalcony > 1 ? "Balconies" : "Balcony"}
                    </p>
                  </div>
                </div>

                {/* services and amenities */}
                <div id="amenities" className="w-full">
                  <h2 className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5">
                    Services & Room Amenities
                  </h2>
                  <ul className=" grid md:grid-cols-2 px-5 ">
                    <>
                      {features?.map((feature, ind) => (
                        <li key={ind} className="list-disc">
                          {feature}
                        </li>
                      ))}
                    </>
                  </ul>
                  {villa?.features.length > 8 && (
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

                {/* Price Deatils */}

                <div id="price" className="w-full">
                  <div className="facility_h1 p-2">
                    <h2
                      id="priceDetails"
                      className="text-xl font-bold text-gray-900"
                    >
                      Price Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 pt-4 ">
                    <p className="col-span-5 md:col-span-3 font-[600]">
                      Per Night
                    </p>
                    <p className="col-span-1">:</p>

                    <div className="col-span-6 md:col-span-8 text[18px] flex gap-x-2">
                      {villa?.pricing?.perNight ===
                      villa?.pricing?.afterDiscountPerNight ? (
                        <p>
                          <span className="card-price-sub">
                            BDT{" "}
                            {villa?.pricing?.afterDiscountPerNight?.toLocaleString()}
                          </span>
                          <span className="day">/Night</span>
                        </p>
                      ) : (
                        <>
                          <p className="rotate-line-through text-red-500">
                            <span className="card-price-sub">
                              BDT {villa?.pricing?.perNight?.toLocaleString()}
                            </span>
                          </p>
                          <p>
                            <span className="card-price-sub">
                              BDT{" "}
                              {villa?.pricing?.afterDiscountPerNight?.toLocaleString()}
                            </span>
                            <span className="day">/Night</span>
                          </p>
                        </>
                      )}
                    </div>
                    {villa?.pricing?.advancePayment && (
                      <>
                        {" "}
                        <p className="col-span-5 md:col-span-3 font-[600]">
                          Advance Payment
                        </p>
                        <p className="col-span-1">:</p>
                        <p className="col-span-6 md:col-span-8 text[18px]">
                          {" "}
                          {villa?.pricing?.advancePayment} % of total amount
                        </p>{" "}
                      </>
                    )}

                    {villa?.pricing?.adultAddition && (
                      <>
                        {" "}
                        <p className="col-span-5 md:col-span-3 font-[600]">
                          Additional Adult
                        </p>
                        <p className="col-span-1">:</p>
                        <p className="col-span-6 md:col-span-8 text[18px]">
                          {" "}
                          {villa?.pricing?.adultAddition} BDT
                          <span className="text-sm"> [per adult]</span>
                        </p>{" "}
                      </>
                    )}
                    {villa?.pricing?.kidAddition && (
                      <>
                        <p className="col-span-5 md:col-span-3 font-[600]">
                          Additional Children
                        </p>
                        <p className="col-span-1">:</p>
                        <p className="col-span-6 md:col-span-8 text[18px]">
                          {" "}
                          {villa?.pricing?.kidAddition} BDT
                          <span className="text-sm"> [per child]</span>
                        </p>
                      </>
                    )}
                    <p className="col-span-5 md:col-span-3 font-[600]">
                      Check In Time
                    </p>
                    <p className="col-span-1">:</p>
                    <p className="col-span-6 md:col-span-8 text[18px]">
                      {" "}
                      {convertToAMPM(villa?.pricing?.checkIn)}
                    </p>
                    <p className="col-span-5 md:col-span-3 font-[600]">
                      Check Out Time
                    </p>
                    <p className="col-span-1">:</p>
                    <p className="col-span-6 md:col-span-8 text[18px]">
                      {" "}
                      {convertToAMPM(villa?.pricing?.checkOut)}
                    </p>
                  </div>
                </div>

                <div id="policies" className="w-full">
                  <h2 className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5">
                    Occupancy Policy
                  </h2>
                  <ExpandableText
                    htmlContent={convertHtml(villa?.occupancy?.policy)}
                  />
                </div>

                <div className="w-full">
                  <h2 className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5">
                    Villa Rules
                  </h2>
                  <ExpandableText
                    htmlContent={convertHtml(villa?.houseRules)}
                  />
                </div>

                <div className="w-full">
                  <h2 className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5">
                    Booking Policy
                  </h2>
                  <ExpandableText
                    htmlContent={convertHtml(
                      villa?.resortId?.policies?.bookingPolicy
                    )}
                  />
                </div>

                <div className="w-full">
                  <h2 className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5">
                    Cancellation Policy
                  </h2>
                  <ExpandableText
                    htmlContent={convertHtml(
                      villa?.resortId?.policies?.cancellationPolicy
                    )}
                  />
                </div>

                <div className="w-full">
                  {villa?.resortdId?.locationLink !== "." ? (
                    <>
                      <div className="facility_h1 p-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          Location
                        </h2>
                      </div>

                      <div className="hidden md:block mt-5">
                        <Map branch={villa?.resortId}></Map>
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
                </div>
              </div>
              {/* Total Box */}

              <div className="flex flex-col  items-start  sm:col-span-12 lg:col-span-4  ">
                <VillaBookingBox villa={villa} bookedDates={bookedDates} />

                <div
                  ref={playerContainerRef}
                  className="relative group rounded rounded-b-none w-full md:h-[240px] sm:h-[200px] cursor-pointer overflow-hidden sm:mt-3 md:mt-0 lg:mt-3 bg-gray-100 -z-10"
                  onClick={openVideoInYouTube}
                >
                  {videoId ? (
                    <>
                      {isPlaying && (
                        <div className="w-full h-full">
                          <YouTube
                            videoId={videoId}
                            opts={playerOptions}
                            onReady={handleReady}
                            className="w-full h-full"
                          />
                        </div>
                      )}

                      <button
                        onClick={toggleMute}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg text-black z-10 opacity-80 hover:opacity-100"
                      >
                        {isMuted ? (
                          <MdVolumeUp size={20} />
                        ) : (
                          <MdVolumeOff size={20} />
                        )}
                      </button>

                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                    </>
                  ) : (
                    <Skeleton className="w-full aspect-video rounded-lg" />
                  )}
                </div>
                <div className="relative group rounded rounded-t-none w-full md:h-[240px] sm:h-[200px] cursor-pointer overflow-hidden">
                  <Link
                    to={`/resort/${villa?.resortId?._id}`}
                    className={`bg-[#35B0A7] h-[35px] flex justify-center items-center hover:bg-[#02625a] hover:text-white text-white `}
                  >
                    More About Resort
                  </Link>
                </div>
              </div>
            </div>

            {/* recommended */}
            <VillaRecommended
              division={villa?.resortId?.division}
              resortId={villa?.resortId?._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetails;
