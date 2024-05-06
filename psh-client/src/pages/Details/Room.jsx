import React, { useContext, useEffect } from "react";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import { format } from "date-fns";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { IoCallOutline } from "react-icons/io5";

import UseFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/UserProvider";
import DetailsModal from "./DetailsModal";
import homeIcon from "../../assets/img/home.png";
import bedIcon from "../../assets/img/double-bed.png";
import arroundIcon from "../../assets/img/arround.svg";
import profileIcon from "../../assets/img/profile.png";
import "../../components/shared/Custom.css";
import Map from "./Map";
import BookingTotalBox from "../Booking/BookingTotalBox";
import Seats from "./Seats";
import BookingSeatTotal from "../Booking/BookingSeatTotal";
import { ReviewAll } from "./ReviewAll";

import useExtraCharge from "../../hooks/useExtraCharge";
import SingleCard from "../../components/home/SingleCard";
import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import "./Room.css";
import RentVisitModal from "./RentVisitModal";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";

const Room = () => {
  const { id } = useParams();
  const [extraCharge] = useExtraCharge(id);
  const { user } = useContext(AuthContext);

  const [lastSlideIndex, setLastSlideIndex] = useState(0);

  // For See More Button
  const [keyDetails, setKeyDetails] = useState(false);
  const [amenities, setAmenities] = useState(false);
  const [furnishing, setFurnishing] = useState(false);
  const [services, setServices] = useState(false);
  // end

  const userName = user?.firstName;
  const email = user?.email;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.psh.com.bd/api/property/${id}`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    localStorage.removeItem("bookingItem");
    localStorage.removeItem("seatItem");
  }, []);

  const { data2 } = UseFetch(`review`);

  const { data: facality } = UseFetch("facilityCategory");

  // Recomended Data

  const { data: recomended } = UseFetch(`property/properties/recommended`);

  // find Published Recommended Property
  const publishedRecomended = recomended?.filter(
    (property) =>
      property?.isPublished === "Published" &&
      property?.category?.name === data?.category?.name
  );

  const main = data2?.filter((pd) => pd.property === id);

  // modal
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);
  const [size2, setSize2] = useState(null);

  const handleOpen2 = (value) => setSize2(value);

  // anchorClickHandler
  const anchorClickHandler = (e) => {
    e.preventDefault();
    const hash = e.target.getAttribute("href").split("#")[1];
    if (hash === "") return false;

    const targetElement = document.getElementById(hash);
    if (targetElement) {
      const navbarHeight =
        document.querySelector(".navbar_sticky").offsetHeight;
      const targetOffsetTop =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        50;

      window.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth",
      });
    }
  };

  const activeReviews = data?.review?.filter(
    (item) => item.status === "active"
  );
  const propertyId = data?._id;
  const MySwal = withReactContent(Swal);
  const { data: wishlist, reFetch: wishlistRefetch } = UseFetch(`wishlist`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const product = {
        userName,
        propertyId,
        email,
      };
      await axios.post("https://api.psh.com.bd/api/wishlist", product);
      // MySwal.fire("Thanks ! wishlisted");
      wishlistRefetch();
    } catch (err) {
      MySwal.fire("Already Added!");
    }
  };

  const exactWishList = wishlist?.filter(
    (wishList) => wishList?.property?._id == id
  );
  const userWishList = exactWishList?.find(
    (wishList) => wishList?.email === email
  );

  const checkWishLists = wishlist?.filter((pd) => pd?.email === email);
  const checkWishListIds = checkWishLists?.map((item) => item?.property?._id);
  const handleRemoveSubmit = async (event) => {
    event.preventDefault();
    try {
      const product = {
        userName,
        propertyId,
        email,
      };
      await axios.delete(
        `https://api.psh.com.bd/api/wishlist/${userWishList._id}`,
        product
      );
      // MySwal.fire("Successfullt Remove ! wishlisted");
      wishlistRefetch();
    } catch (err) {
      MySwal.fire("Wrong!");
    }
  };
  const [detailsShow, setDetailsShow] = useState(false);
  const handleDetailsShow = () => setDetailsShow(!detailsShow);

  // Page location top to path dependency

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  // For Recomended House

  const [keyValue, setKeyValue] = useState("");

  // For Slider

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === 0) {
      return null;
    } else {
      return <img src={LeftArrow} alt="prevArrow" {...props} />;
    }
  };

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === publishedRecomended?.length - 5) {
      return null;
    } else {
      return <img src={RightArrow} alt="nextArrow" {...props} />;
    }
  };

  const settings = {
    dots: false,

    afterChange: (index) => {
      setLastSlideIndex(index);
    },
    infinite: false,
    speed: 400,
    adaptiveHeight: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,

    className: `center mx-[-15px] `,
    arrows: publishedRecomended?.length > 4 ? true : false,
    autoplay: false,

    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,

          infinite: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          className: `center ms-[-8px] ${
            lastSlideIndex >= publishedRecomended?.length - 1
              ? "only-forMobile"
              : ""
          }`,
          afterChange: (index) => {
            setLastSlideIndex(index);
          },
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
          initialSlide: 1,
          speed: 400,
          cssEase: "ease-out",
        },
      },
    ],
  };

  return (
    <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0">
      {data?.photos?.length > 0 ? (
        <div className="flex items-center gap-x-3 md:mt-3 sm:mt-0">
          <Link to="/" className="hover:text-[#00bbb4] md:block sm:hidden">
            <p>Home</p>
          </Link>
          <p className="sm:hidden md:block">
            <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
          </p>

          <p className="sm:hidden md:block">{data?.category?.name}</p>

          <p className="sm:hidden md:block">
            <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
          </p>
          <Link to="/" className="md:hidden sm:block">
            <p>
              <MdKeyboardArrowLeft className="w-[20px] h-[20px]" />
            </p>
          </Link>
          <p>Room Details</p>
        </div>
      ) : (
        ""
      )}
      <div className="mt-2">
        <div className=" ">
          <div>
            <div
              className="grid grid-cols-2 cursor-pointer details-img"
              onClick={() => handleOpen("lg")}
            >
              <div>
                {data?.photos ? (
                  <img
                    src={data?.photos[0]}
                    className="rounded w-[100%] lg:h-[400px] md:h-[280px] sm:h-[230px]"
                    alt=""
                  />
                ) : (
                  <Skeleton className=" w-[100%] lg:h-[400px] md:h-[280px] sm:h-[230px]" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 ml-3 relative">
                {data?.photos ? (
                  data?.photos?.slice(1, 5).map((photo, index) => (
                    <div key={index}>
                      <img
                        src={photo}
                        alt=""
                        className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]"
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <Skeleton className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]" />
                    <Skeleton className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]" />
                    <Skeleton className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]" />
                    <Skeleton className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]" />
                  </>
                )}
                <div className="absolute md:bottom-16 sm:bottom-10 md:right-28 sm:right-5">
                  <span className="md:text-5xl sm:text-[25px] ">
                    +{data?.photos ? data?.photos?.slice(4).length : ""}
                  </span>
                </div>
              </div>
            </div>
            <DetailsModal size={size} handleOpen={handleOpen} data={data} />
          </div>

          <div className="mt-2 text-start ">
            <div className="sticky lg:top-[70px] sm:top-[70px] bg-white py-1 ">
              <div className="flex text-[24px]  font-medium ">
                <div onClick={() => setKeyValue(0)}>
                  <a
                    href="#keyDetails"
                    onClick={anchorClickHandler}
                    className={`hover:text-black hover:border-b-2 border-[#27b3b1] sm:text-[12px] md:text-[1rem]  md:px-8 custom_key sm:px-2 py-1  border ${
                      // typeof keyValue !== "string" &&
                      typeof keyValue === "number" && keyValue === 0
                        ? "bg-[#00bbb4] text-white hover:text-white"
                        : ""
                    }`}
                  >
                    Key Details
                  </a>
                </div>

                <div className="sm:flex">
                  {facality?.slice(0, 3).map((pd, index) => (
                    <div key={pd?._id} onClick={() => setKeyValue(index + 1)}>
                      <span>
                        <a
                          href={`#${pd?.name}`}
                          onClick={anchorClickHandler}
                          className={`hover:text-black hover:border-b-2 border-[#27b3b1] sm:text-[12px] md:text-[1rem] md:px-8 custom_key sm:px-2 py-1 border ${
                            keyValue === index + 1
                              ? "bg-[#00bbb4] text-white hover:text-white"
                              : ""
                          }`}
                        >
                          {pd?.name}
                        </a>
                      </span>
                    </div>
                  ))}
                </div>

                {data?.category?.name === "Apartment" ? (
                  <div>
                    <a
                      href="#priceDetails"
                      onClick={anchorClickHandler}
                      className="hover:text-black hover:border-b-2 border-[#35B0A7]"
                    >
                      Price Details
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {data?.category?.name === "Apartment" ? (
                  <div>
                    <a
                      href="#apartmentDetails"
                      onClick={anchorClickHandler}
                      className="hover:text-black hover:border-b-2 border-[#35B0A7]"
                    >
                      {data?.category?.name} Details
                    </a>
                  </div>
                ) : (
                  ""
                )}

                {data?.category?.name === "Shared Room" ? (
                  <div
                    onClick={() => setKeyValue(4)}
                    className="sm:hidden md:block"
                  >
                    <a
                      href="#seatTypes"
                      onClick={anchorClickHandler}
                      className={`hover:text-black hover:border-b-2 border-[#27b3b1] sm:text-[12px] md:text-[1rem]  md:px-8 custom_key sm:px-2 py-1  border ${
                        // typeof keyValue !== "string" &&
                        typeof keyValue === "number" && keyValue === 4
                          ? "bg-[#00bbb4] text-white hover:text-white"
                          : ""
                      }`}
                    >
                      Seat Types
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="grid grid-cols-12 lg:gap-x-5 gap-y-16 ">
              <div className="flex flex-col items-start space-y-3 sm:col-span-12 lg:col-span-8  pt-2">
                <div className="grid md:grid-cols-12 sm:grid-cols-6">
                  <div className="col-span-10">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 px-2 ">
                        {data?.name}
                      </h1>
                      <div className="flex text-[#9A9A9A] items-center custom_room_name2">
                        <div>
                          <img src="/images/icon/marker-02.png" alt="" />
                        </div>
                        <p className="ms-1"> {data.branch?.name} -</p>
                      </div>
                      {/* 
                      <p className="text-xl font-bold mt-1">
                        {data.branch?.name}
                      </p> */}

                      <div className="flex text-[#9A9A9A] items-center mt-2">
                        <div>
                          <img
                            src="/images/icon/marker-02.png"
                            className="md:w-[25px] sm:w-[35px]"
                            alt=""
                          />
                        </div>
                        <p className="ms-1"> {data?.branch?.branchAddress} </p>
                      </div>
                      <div className="flex text-[#9A9A9A] items-center mt-2">
                        <div>
                          {/* <img
                            src="/images/icon/marker-02.png"
                            className="md:w-[25px] sm:w-[35px]"
                            alt=""
                          /> */}
                          <IoCallOutline className="md:w-[25px] h-[25px] sm:w-[35px]" />
                        </div>
                        <p className="ms-1">
                          {" "}
                          {data?.branch?.branchMobileNumber}{" "}
                        </p>
                      </div>
                      <div className="md:flex mt-2">
                        <div className="flex items-center text-black">
                          <p className="ms-1 md:text-xl sm:text-[1rem]">
                            Room Number : {data?.roomNumber}
                          </p>
                        </div>
                        <div className="flex sm:text-[12px] sm:mt-2 md:mt-0">
                          <div className="flex md:mx-3 items-center">
                            <div>
                              <img src={homeIcon} alt="" />
                            </div>
                            {data.furnitured === "yes" ? (
                              <div className="ms-1 ">
                                <span>Full Furnished</span>
                              </div>
                            ) : (
                              <div className="ms-1">
                                <span>None Full Furnished</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center">
                            <div>
                              <img
                                src="/images/icon/user-profile-02.png"
                                alt=""
                              />
                            </div>

                            <p className="ms-1">
                              {data?.seats?.length > 0
                                ? `${data?.seats?.length} People`
                                : `${data?.bedroom} People`}
                            </p>
                          </div>
                          <div className="flex mx-3 items-center">
                            {data?.seats?.length === 0 ? (
                              <>
                                <div>
                                  <img src={bedIcon} alt="" />
                                </div>

                                <p className="ms-1">{data?.bedroom} Bed</p>
                              </>
                            ) : (
                              <>
                                {" "}
                                <div>
                                  <img
                                    src="/images/icon/category-bed.svg.png"
                                    alt=""
                                  />
                                </div>
                                <p className="ms-1">
                                  {data?.seats?.length} Seats
                                </p>
                              </>
                            )}
                          </div>
                          <div className="flex mx-3 items-center">
                            <div>
                              <img src="/images/icon/Bath.png" alt="" />
                            </div>

                            <p className="ms-1">{data.bathroom} Bathroom</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex md:ml-[50px] md:justify-between sm:mt-3 md:mt-0">
                    <div>
                      {checkWishListIds?.some((item) => item === id) ? (
                        <AiFillHeart
                          className={`w-[24px] h-[30px] cursor-pointer text-red-600`}
                          onClick={handleRemoveSubmit}
                        />
                      ) : (
                        <AiFillHeart
                          className={`w-[24px] h-[30px] cursor-pointer `}
                          onClick={handleSubmit}
                        />
                      )}
                    </div>
                    <div>
                      <AiOutlineShareAlt className="w-[24px] h-[30px] cursor-pointer ml-5 hover:text-[#35B0A7]" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  {activeReviews?.length > 0 ? (
                    <>
                      <p>5.0</p>
                      <div className="flex text-[#FFB800]">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </div>
                      <p>({activeReviews?.length} Reviews)</p>
                    </>
                  ) : (
                    <p>(0 Reviews)</p>
                  )}
                </div>

                <Dialog
                  open={size2 === "sm"}
                  size={size2 || "sm"}
                  handler={handleOpen2}
                  style={{ overflow: "scroll" }}
                >
                  <DialogHeader>
                    {" "}
                    <div
                      className="flex justify-end text-3xl text-black"
                      onClick={() => handleOpen2(null)}
                    >
                      <i className="fa-solid fa-circle-xmark cursor-pointer"></i>
                    </div>
                  </DialogHeader>
                  <DialogBody className="p-2">
                    <RentVisitModal property={data} handleOpen2={handleOpen2} />
                  </DialogBody>
                </Dialog>
                <div style={{ width: "100%" }}>
                  <div className="facility_h1 p-2 mt-3">
                    <h2
                      id="keyDetails"
                      className="text-xl font-bold text-gray-900 "
                    >
                      Key Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 gap-x-4 md:gap-y-16 sm:gap-y-4 py-5 text-sm">
                    <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3">
                      <p className="font-bold">Type</p>
                      <p>{data.category?.name}</p>
                    </div>
                    <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3">
                      <p className="font-bold">Bed Type</p>
                      <p>{data?.bedType} Bed</p>
                    </div>
                    <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3">
                      <p className="font-bold">Floor</p>
                      <p>{data.floor}th Floor</p>
                    </div>
                    <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3">
                      <p className="font-bold">Room Size</p>
                      <p>{data.area} SQ Feet</p>
                    </div>
                    <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3">
                      <p className="font-bold">Furnishing</p>
                      {data.furnitured === "yes" ? <p>Yes</p> : <p>No</p>}
                    </div>
                    {keyDetails ? (
                      <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3">
                        <p className="font-bold">Balcony</p>
                        <p>{data.balcony}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    {keyDetails ? (
                      ""
                    ) : (
                      <div
                        className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 mt-5 cursor-pointer"
                        onClick={() => setKeyDetails(true)}
                      >
                        <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                          See More
                        </p>
                      </div>
                    )}
                  </div>
                  {keyDetails ? (
                    <div className="grid grid-cols-12 gap-x-4 md:gap-y-16 sm:gap-y-4 md:py-5">
                      <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3 ">
                        <p className="font-bold"> Wi-Fi</p>
                        {data.WiFi === "yes" ? <p>Yes</p> : <p>No</p>}
                      </div>
                      <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                        <p className="font-bold"> CCTV</p>
                        {data.CCTV === "yes" ? <p>Yes</p> : <p>No</p>}
                      </div>
                      <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3">
                        <p className="font-bold">Meal</p>
                        <p>
                          {/* {data.meal
                      }  */}
                          3 Times a day
                        </p>
                      </div>
                      {!keyDetails ? (
                        ""
                      ) : (
                        <div
                          className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 mt-5 cursor-pointer"
                          onClick={() => setKeyDetails(false)}
                        >
                          <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                            See Less
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {facality?.slice(0, 3).map((pd) => {
                  // console.log(specificFacility);

                  const findAmenities = facality?.find(
                    (facility) => facility?.name === "Amenities"
                  );
                  const findFurnishing = facality?.find(
                    (facility) => facility?.name === "Furnishing"
                  );
                  const findServices = facality?.find(
                    (facility) => facility?.name === "Services"
                  );

                  return (
                    <div
                      style={{ width: "100%" }}
                      key={pd._id}
                      className="text-sm"
                    >
                      <div className="facility_h1 p-2">
                        <h2
                          id={pd?.name}
                          className="text-xl font-bold text-gray-900"
                        >
                          {pd.name}
                        </h2>
                      </div>
                      <div className="grid grid-cols-12 md:gap-x-4 md:gap-y-16 sm:gap-y-4 py-5 md:px-2">
                        {/* Show 5 amenities Facility*/}
                        {pd?.name === "Amenities" && !amenities
                          ? findAmenities?.facility?.slice(0, 5).map((item) => {
                              return (
                                <React.Fragment key={item._id}>
                                  <div className="flex flex-col items-start col-span-12 sm:col-span-6 lg:col-span-2 md:col-span-3">
                                    <div>
                                      <div className="flex md:justify-center sm:justify-start">
                                        <img
                                          src={item.photos[0]}
                                          alt=""
                                          style={{ maxWidth: "none" }}
                                          className="sm:w-[22px]"
                                        />
                                      </div>

                                      <h2 className="mt-3 text-gray-900">
                                        {item.name ? item.name : ""}
                                      </h2>
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })
                          : ""}

                        {/* Show All Amenities Facility*/}
                        {pd?.name === "Amenities" && amenities ? (
                          <>
                            {findAmenities?.facility?.map((item) => {
                              return (
                                <React.Fragment key={item._id}>
                                  <div className="flex flex-col items-start col-span-12 sm:col-span-6 lg:col-span-2 md:col-span-3">
                                    <div>
                                      <div className="flex md:justify-center sm:justify-start">
                                        <img
                                          src={item.photos[0]}
                                          alt=""
                                          style={{ maxWidth: "none" }}
                                          className="sm:w-[22px]"
                                        />
                                      </div>

                                      <h2 className="mt-3 text-gray-900">
                                        {item.name ? item.name : ""}
                                      </h2>
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })}
                            {findAmenities?.facility?.length > 5 &&
                            pd?.name === "Amenities" &&
                            !amenities ? (
                              ""
                            ) : (
                              <div
                                className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3 cursor-pointer"
                                onClick={() => setAmenities(false)}
                              >
                                <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                                  See Less
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        {/* Show 5 Furnishing Facility */}
                        {pd?.name === "Furnishing" && !furnishing
                          ? findFurnishing?.facility
                              ?.slice(0, 5)
                              .map((item) => {
                                return (
                                  <React.Fragment key={item._id}>
                                    <div className="flex flex-col items-start col-span-12 sm:col-span-6 lg:col-span-2 md:col-span-3">
                                      <div>
                                        <div className="flex md:justify-center sm:justify-start">
                                          <img
                                            src={item.photos[0]}
                                            alt=""
                                            style={{ maxWidth: "none" }}
                                            className="sm:w-[22px]"
                                          />
                                        </div>

                                        <h2 className="mt-3 text-gray-900">
                                          {item.name ? item.name : ""}
                                        </h2>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                );
                              })
                          : ""}
                        {/* Show All Furnishing Facility */}
                        {pd?.name === "Furnishing" && furnishing ? (
                          <>
                            {findFurnishing?.facility?.map((item) => {
                              return (
                                <React.Fragment key={item._id}>
                                  <div className="flex flex-col items-start col-span-12 sm:col-span-6 lg:col-span-2 md:col-span-3">
                                    <div>
                                      <div className="flex md:justify-center sm:justify-start">
                                        <img
                                          src={item.photos[0]}
                                          alt=""
                                          style={{ maxWidth: "none" }}
                                          className="sm:w-[22px]"
                                        />
                                      </div>

                                      <h2 className="mt-3 text-gray-900">
                                        {item.name ? item.name : ""}
                                      </h2>
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })}

                            {findFurnishing?.facility?.length > 5 &&
                            pd?.name === "Furnishing" &&
                            !furnishing ? (
                              ""
                            ) : (
                              <div
                                className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3 mt-5 cursor-pointer"
                                onClick={() => setFurnishing(false)}
                              >
                                <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                                  See Less
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                        {/* Show 5 Services Facility*/}
                        {pd?.name === "Services" && !services
                          ? findServices?.facility?.slice(0, 5).map((item) => {
                              return (
                                <React.Fragment key={item._id}>
                                  <div className="flex flex-col items-start col-span-12 sm:col-span-6 lg:col-span-2 md:col-span-3">
                                    <div>
                                      <div className="flex md:justify-center sm:justify-start">
                                        <img
                                          src={item.photos[0]}
                                          alt=""
                                          style={{ maxWidth: "none" }}
                                          className="sm:w-[22px]"
                                        />
                                      </div>

                                      <h2 className="mt-3 text-gray-900">
                                        {item.name ? item.name : ""}
                                      </h2>
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })
                          : ""}
                        {/* Show All Services Facility*/}
                        {pd?.name === "Services" && services ? (
                          <>
                            {findServices?.facility?.map((item) => {
                              return (
                                <React.Fragment key={item._id}>
                                  <div className="flex flex-col items-start col-span-12 sm:col-span-6 lg:col-span-2 md:col-span-3">
                                    <div>
                                      <div className="flex md:justify-center sm:justify-start">
                                        <img
                                          src={item.photos[0]}
                                          alt=""
                                          style={{ maxWidth: "none" }}
                                          className="sm:w-[22px]"
                                        />
                                      </div>

                                      <h2 className="mt-3 text-gray-900">
                                        {item.name ? item.name : ""}
                                      </h2>
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })}
                            {/* For Service */}
                            {findServices?.facility?.length > 5 &&
                            pd?.name === "Services" &&
                            !services ? (
                              ""
                            ) : (
                              <div
                                className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 mt-5 md:col-span-3 cursor-pointer"
                                onClick={() => setServices(true)}
                              >
                                <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                                  See Less
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        {/* For Amenities */}
                        {findAmenities?.facility?.length > 5 &&
                        pd?.name === "Amenities" &&
                        !amenities ? (
                          <div
                            className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3 mt-5 cursor-pointer"
                            onClick={() => setAmenities(true)}
                          >
                            <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                              See More
                            </p>
                          </div>
                        ) : (
                          ""
                        )}

                        {/* For Furnishing */}
                        {findFurnishing?.facility?.length > 5 &&
                        pd?.name === "Furnishing" &&
                        !furnishing ? (
                          <div
                            className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 md:col-span-3 mt-5 cursor-pointer"
                            onClick={() => setFurnishing(true)}
                          >
                            <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                              See More
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        {/* For Service */}
                        {findServices?.facility?.length > 5 &&
                        pd?.name === "Services" &&
                        !services ? (
                          <div
                            className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2 mt-5 md:col-span-3 cursor-pointer"
                            onClick={() => setServices(true)}
                          >
                            <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                              See More
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}

                {data?.category?.name !== "Apartment" ? (
                  <div className="w-full">
                    <h2
                      id="apartmentDetails"
                      className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5"
                    >
                      Facilities
                    </h2>
                    <div className="leading-8 text-sm">
                      <p>1. 24hours Emergency Service and Medical Support.</p>
                      <p> 2. Daily Housekeeping.</p>
                      <p>
                        3. Customized or Specials Diet Meal Plan (On Request)
                      </p>
                      <p>4. Meeting Room Facilities (On Request)</p>
                      <p>5. Tuition Facilities (Students)</p>
                      <p>6. Mental Healthcare</p>
                      <p>7. Proper Guideline for new comes in Dhaka.</p>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* Price Deatils */}
                {data?.category?.name === "Apartment" ? (
                  <div className="w-full">
                    <div className="facility_h1 p-2">
                      <h2
                        id="priceDetails"
                        className="text-xl font-bold text-gray-900"
                      >
                        Price Details
                      </h2>
                    </div>
                    <div className="flex gap-x-24">
                      <div className=" mt-5 text-sm font-bold">
                        <p className=" ">Rent/Month</p>
                        <p>Service Charge</p>
                        <p>Security Deposit</p>
                        <p>Flat Release Policy</p>
                      </div>
                      <div className=" mt-5 text-xl">
                        <p className="">: 20,000 BDT(negotiable)</p>
                        <p>: 5,000 BDT/per month</p>
                        <p>: 2 month’s rent</p>
                        <p>: 2 months earlier notice required</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* Apartment Details */}
                {data?.category?.name === "Apartment" ? (
                  <div className="w-full ">
                    <div className="facility_h1 p-2 mt-5">
                      <h2
                        id="priceDetails"
                        className="text-xl font-bold text-gray-900"
                      >
                        Apartment Details
                      </h2>
                    </div>
                    <div className="flex">
                      <div className=" mt-5 text-sm font-bold w-2/4">
                        <p className=" ">Address & Area</p>
                        <p>Flat Size</p>
                        <p>Floor</p>
                        <p>Facilities</p>
                        <p>Room Category</p>
                        <p className="mt-[20px]">Additional Facilities</p>
                      </div>
                      <div className=" mt-5 text-[18px] ">
                        <p className="">
                          : Ahamed House,House No #3, Road #3, Dhanmondi,
                          Dhaka-1209 (Residential Area)
                        </p>
                        <p>: 3000 Sq Feet</p>
                        <p>
                          : A5 (5th Floor) (6 Storied Building) (East Facing
                          Unit)
                        </p>
                        <p>
                          : One Modern Lift, All Modern Amenities and 24/7
                          Security Gurd
                        </p>
                        <p>
                          : 3 Large Bed rooms with 3 Balcony, Spacious Drawing
                          Room, Dining & Family Living Room, Highly Decorated
                          Kitchen with a Store Room and Servant room with
                          Attached Toilet.
                        </p>
                        <p>
                          : 1. Electricity with full time Generator Service. 2.
                          Available 24/7 Gas. 3. Car Parking with 1 Driver’s
                          Accommodation. 4. Roof TOp Beautified Garden and
                          Grassy Ground. 5. Full Building Covered by CCTV.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* If Seats */}
                {/* 
                  {data?.category?.name === "Apartment" ||
                  data?.category?.name === "Private Room" ? (
                    ""
                  ) : (
                    <div className="mb-5 w-full">
                      {data.seats && data.seats.length > 0 ? (
                        <Seats data={data} handleSubmit={handleSubmit} />
                      ) : (
                        ""
                      )}
                    </div>
                  )} */}

                {data?.category?.name === "Shared Room" ? (
                  <div id="seatTypes">
                    <div className="mb-5 w-full" id="seat">
                      {data.seats && data.seats.length > 0 ? (
                        <Seats data={data} handleSubmit={handleSubmit} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <h2
                    id="apartmentDetails"
                    className="text-xl font-bold text-gray-900 mb-5  facility_h1 p-2 mt-5"
                  >
                    {data?.category?.name} Rules
                  </h2>
                  <div className="leading-8 text-sm">
                    <p>
                      1. Respect Others: Treat your fellow residents with
                      kindness, consideration, and respect.
                    </p>
                    <p>
                      {" "}
                      2. Quiet Hours: Maintain a peaceful environment during
                      designated quiet hours to ensure everyone's comfort and
                      rest.
                    </p>
                    <p>
                      3. Cleanliness: Keep your living space clean and tidy, and
                      follow the hostel's cleanliness guidelines in common
                      areas.
                    </p>
                    <p>
                      4. No Smoking: Smoking is strictly prohibited within the
                      premises of Project Second Home.
                    </p>
                    <p>
                      5. Security: Ensure the safety and security of yourself
                      and others by following the hostel's security measures and
                      reporting any concerns.
                    </p>
                    <p>
                      6. Visitors Policy: Adhere to the hostel's visitors
                      policy, which may include restrictions on overnight
                      guests.
                    </p>
                  </div>
                </div>

                <div className="w-full">
                  {data?.branch?.locationLink ? (
                    <>
                      <div className="facility_h1 p-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          Location
                        </h2>
                      </div>

                      <div className="hidden md:block mt-5">
                        <Map branch={data?.branch}></Map>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div>
                    {data.branch?.nearLocation1 ? (
                      <div className="facility_h1 p-2 mt-5">
                        <h2 className="text-xl font-bold text-gray-900">
                          Around the Building
                        </h2>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="grid grid-cols-2 sm:text-sm ">
                      {data.branch?.nearLocation1 ? (
                        <div className="flex mt-3">
                          <img src={arroundIcon} alt="" />
                          <p className="ms-4">{data.branch?.nearLocation1}</p>
                        </div>
                      ) : (
                        ""
                      )}

                      {data.branch?.nearLocation2 ? (
                        <div className="flex mt-3">
                          <img src={arroundIcon} alt="" />
                          <p className="ms-4">{data.branch?.nearLocation2}</p>
                        </div>
                      ) : (
                        ""
                      )}
                      {data.branch?.nearLocation3 ? (
                        <div className="flex mt-3">
                          <img src={arroundIcon} alt="" />
                          <p className="ms-4">{data.branch?.nearLocation3}</p>
                        </div>
                      ) : (
                        ""
                      )}

                      {data.branch?.nearLocation4 ? (
                        <div className="flex mt-3">
                          <img src={arroundIcon} alt="" />
                          <p className="ms-4">{data.branch?.nearLocation4}</p>
                        </div>
                      ) : (
                        ""
                      )}
                      {data.branch?.nearLocation5 ? (
                        <div className="flex mt-3">
                          <img src={arroundIcon} alt="" />
                          <p className="ms-4">{data.branch?.nearLocation5}</p>
                        </div>
                      ) : (
                        ""
                      )}
                      {data.branch?.nearLocation6 ? (
                        <div className="flex mt-3">
                          <img src={arroundIcon} alt="" />
                          <p className="ms-4">{data.branch?.nearLocation6}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="facility_h1 p-2 flex mt-5">
                    <h2 className="text-xl font-bold text-gray-900 ">
                      Reviews {activeReviews?.length}
                    </h2>
                    {activeReviews?.length > 0 && (
                      <div className="flex">
                        <div>
                          <img
                            src="../images/icon/Vector (1).png"
                            alt=""
                            className="ms-5 mt-1"
                            style={{ width: 20, height: 20 }}
                          />
                        </div>
                        <p className="ms-3 text-2xl">5.0</p>
                      </div>
                    )}
                  </div>
                  {activeReviews?.slice(0, 1).map((item) => (
                    <div key={item.id}>
                      <div className="flex items-center gap-x-3 mt-4">
                        <p>
                          <img src={profileIcon} alt="" />
                        </p>
                        <p>{item?.userName}</p>
                        <p className="bg-[#FFB800] text-white px-2 rounded">
                          5.0
                        </p>
                        <p>
                          {item?.createdAt
                            ? format(
                                new Date(item.createdAt),
                                "yyyy-MM-dd HH:mm:ss"
                              )
                            : ""}
                        </p>
                      </div>
                      <p className="mt-2 pl-12">{item?.comment}</p>
                    </div>
                  ))}

                  {activeReviews?.length > 0 && (
                    <div className="mt-10">
                      <button
                        className="text-[#399] border px-8 py-2 border-[#399] hover:bg-[#399] hover:text-white rounded"
                        onClick={handleDetailsShow}
                      >
                        See All {activeReviews?.length} Reviews
                      </button>
                    </div>
                  )}

                  <ReviewAll
                    handleDetailsShow={handleDetailsShow}
                    detailsShow={detailsShow}
                    activeReviews={activeReviews}
                  />
                </div>

                <div className="flex items-center gap-x-3 request-visit">
                  <button
                    className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch   px-4 py-1 rounded-lg"
                    style={{ width: 220 }}
                    onClick={() => handleOpen2("sm")}
                  >
                    Request for a visit to our PSH
                  </button>
                  {/* <p></p> */}
                </div>
              </div>
              {/* Total Box */}

              <div className="flex flex-col items-start space-y-3 sm:col-span-12 md:col-span-6 lg:col-span-4 ">
                {data.seats && data.seats.length > 0 ? (
                  <BookingSeatTotal
                    data={data}
                    seats={data?.seats}
                    extraCharge={extraCharge}
                  />
                ) : (
                  <BookingTotalBox
                    data={data}
                    seats={data?.seats}
                    extraCharge={extraCharge}
                  />
                )}
              </div>
            </div>
          </div>
          {publishedRecomended?.length > 0 ? (
            <h2 className="text-xl font-bold text-gray-900 mt-5">
              Recommended Room
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>
      {publishedRecomended?.length > 0 ? (
        <div className=" mb-5 all_recommended mt-4 slider_margin card-slider ">
          <Slider {...settings}>
            {publishedRecomended?.map((item) => (
              <SingleCard key={item._id} item={item} />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-x-5">
          <CardSkeleton cards={4} />
        </div>
      )}

      {/* <Toaster
        containerStyle={{ top: 300 }}
        toastOptions={{ position: "top-center" }}
      ></Toaster> */}
    </div>
  );
};

export default Room;
