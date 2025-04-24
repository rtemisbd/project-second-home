import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import VillaMedia from "../../components/Villa/VillaMedia";
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

const VillaDetails = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [addedWishList, setAddedWishlist] = useState(false);
  const videoId = getYouTubeVideoId(villa?.resortId.video);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);

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
      setVilla(data?.data);
    };
    fetchVilla();
  }, [id]);
  console.log(villa);

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
          <div className=" text-start ">
            <div className="grid grid-cols-12 lg:gap-x-5 gap-y-16 ">
              <div className="flex flex-col items-start space-y-3 sm:col-span-12 lg:col-span-8  pt-2">
                <div className="grid md:grid-cols-12 sm:grid-cols-6">
                  <div className="col-span-10">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 px-1 ">
                        {villa?.title} - {villa?.resortId?.name}
                      </h1>
                      <div className="mt-2">
                        <div className="flex items-center text-black">
                          <p className="ms-1 md:text-xl sm:text-[1rem]">
                            Villa Number : {villa?.villaNumber}{" "}
                            <span className="text-base font-bold">
                              [{villa?.type}]
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex text-[#9A9A9A] items-center gap-4 mt-2 font-bold ms-1">
                        {/* <FaEye className="md:w-[25px] sm:w-[35px]" /> */}

                        <p>View : {villa?.view} ,</p>
                        <p>
                          Occupancy : {villa?.occupancy?.adults} [adult] ,{" "}
                          {villa?.occupancy?.kids} [kids]
                        </p>
                      </div>
                      <div className="flex text-[#9A9A9A] items-center mt-2">
                        <div>
                          <IoCallOutline className="md:w-[25px] h-[25px] sm:w-[35px]" />
                        </div>
                        <p className="ms-1">
                          {" "}
                          {villa?.resortId?.resortMobileNumber}{" "}
                        </p>
                      </div>
                      <div className="flex text-[#9A9A9A] items-center mt-2">
                        <img
                          src="/public/images/icon/marker-02.png"
                          className="md:w-[25px] sm:w-[35px]"
                          alt=""
                        />

                        <p className="ms-1"> {villa?.resortId?.address} </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex md:ml-[50px] md:justify-between sm:mt-3 md:mt-0">
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

                <div className="w-full">
                  <h2
                    id="apartmentDetails"
                    className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5"
                  >
                    Services & Room Amenities
                  </h2>
                  <ul className=" grid md:grid-cols-2 px-5">
                    {villa?.features?.map((feature, ind) => (
                      <li key={ind} className="list-disc">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Deatils */}

                <div className="w-full">
                  <div className="facility_h1 p-2">
                    <h2
                      id="priceDetails"
                      className="text-xl font-bold text-gray-900"
                    >
                      Price Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 pt-4 ">
                    <p className="col-span-3 text-xl font-[500]">Per Night</p>
                    <p className="col-span-1">:</p>
                    <p className="col-span-8 text[18px]">
                      {" "}
                      {villa?.pricing?.perNight} BDT
                    </p>

                    <p className="col-span-3 text-xl font-[500]">
                      Additional Adult
                    </p>
                    <p className="col-span-1">:</p>
                    <p className="col-span-8 text[18px]">
                      {" "}
                      {villa?.pricing?.adultAddition} BDT
                      <span className="text-sm"> [per adult]</span>
                    </p>
                    <p className="col-span-3 text-xl font-[500]">
                      Additional Children
                    </p>
                    <p className="col-span-1">:</p>
                    <p className="col-span-8 text[18px]">
                      {" "}
                      {villa?.pricing?.kidAddition} BDT
                      <span className="text-sm"> [per child]</span>
                    </p>
                  </div>
                </div>

                <div className="w-full">
                  <h2
                    id="apartmentDetails"
                    className="text-xl font-bold text-gray-900 mb-5  facility_h1 p-2 mt-5"
                  >
                    Occupancy Policy
                  </h2>
                  <div className="leading-8 w-full">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: convertHtml(villa?.occupancy?.policy),
                      }}
                    ></span>
                  </div>
                </div>
                <div className="w-full">
                  <h2
                    id="apartmentDetails"
                    className="text-xl font-bold text-gray-900 mb-5  facility_h1 p-2 mt-5"
                  >
                    Villa Rules
                  </h2>
                  <div className="leading-8 w-full">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: convertHtml(villa?.houseRules),
                      }}
                    ></span>
                  </div>
                </div>
                <div className="w-full">
                  <h2
                    id="apartmentDetails"
                    className="text-xl font-bold text-gray-900 mb-5  facility_h1 p-2 mt-5"
                  >
                    Booking Policy
                  </h2>
                  <div className="leading-8 w-full">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: convertHtml(
                          villa?.resortId?.policies?.bookingPolicy
                        ),
                      }}
                    ></span>
                  </div>
                </div>
                <div className="w-full">
                  <h2
                    id="apartmentDetails"
                    className="text-xl font-bold text-gray-900   facility_h1 p-2 mt-5"
                  >
                    Cancellation Policy
                  </h2>
                  <div className="w-full">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: convertHtml(
                          villa?.resortId?.policies?.cancellationPolicy
                        ),
                      }}
                    ></span>
                  </div>
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

              <div className="flex flex-col items-start  sm:col-span-12 md:col-span-6 lg:col-span-4 ">
                <VillaBookingBox villa={villa} />
                <div
                  ref={playerContainerRef}
                  className="relative group rounded rounded-b-none w-full md:h-[240px] sm:h-[200px] cursor-pointer overflow-hidden mt-3 bg-gray-100"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetails;
