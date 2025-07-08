import React, { useContext, useEffect } from "react";
import { format } from "date-fns";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useState } from "react";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { IoCallOutline } from "react-icons/io5";
import UseFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/UserProvider";
import arroundIcon from "../../assets/img/arround.svg";
import "../../components/shared/Custom.css";
import Map from "./Map";
import BookingTotalBox from "../Booking/BookingTotalBox";
import SingleCard from "../../components/home/SingleCard";
import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import "./Room.css";
import RentVisitModal from "./RentVisitModal";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import toast from "react-hot-toast";
import useRecommended from "../../hooks/useRecommended";
import ImageViewerSlider from "../../components/RoomDetails/ImageViewerSlider";
import { anchorClickHandler } from "../../utilities/anchorClickHandler";
import Facilities from "../../components/RoomDetails/Facilities";

const RoomDetails = () => {
  const { id, category: categoryId } = useParams();
  const { user } = useContext(AuthContext);
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  // For See More Button
  const [keyDetails, setKeyDetails] = useState(false);
  const [allFacilities, setAllFacilities] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [data, setData] = useState([]);
  const [seat, setSeat] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [bookedDates, setBookDates] = useState([]);
  const [keyValue, setKeyValue] = useState("");
  const [addedWishList, setAddedWishlist] = useState(false);
  const [wishId, setWishId] = useState(null);
  const [size2, setSize2] = useState(null);

  const anchorClick = (e) => {
    anchorClickHandler(e);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${serverBaseUrl}/category/${categoryId}`);
        const res = await response.json();
        setRoomType(res.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    if (roomType !== "Shared Room") {
      const fetchData = async () => {
        try {
          const response = await fetch(`${serverBaseUrl}/property/${id}`);
          // const res = await response.json();
          // console.log(res);

          const { property, rentRooms } = await response.json();
          setData(property);
          setPhotos([...property?.photos]);
          setBookDates(rentRooms);
          setAllFacilities(property?.facility);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
    if (roomType === "Shared Room") {
      const fetchData = async () => {
        try {
          const response = await fetch(`${serverBaseUrl}/seats/${id}`);

          if (!response.ok) {
            const errorData = await response.json(); // get message from backend
            throw new Error(errorData.message || "Failed to fetch seat");
          }

          const { data } = await response.json();
          setSeat(data.seat);
          setBookDates(data.rentRooms);
          setPhotos([...data?.seat?.photos]);

          if (data?.seat) {
            try {
              const responseForRoom = await fetch(
                `${serverBaseUrl}/property/${data?.seat?.roomId}`
              );

              if (!responseForRoom.ok) {
                const errorData = await responseForRoom.json();
                throw new Error(
                  errorData.message || "Failed to fetch property"
                );
              }

              const { property } = await responseForRoom.json();
              setData(property);
              setAllFacilities(property?.facility);
              setPhotos((previousPhotos) => [
                ...previousPhotos,
                ...property?.photos,
              ]);
            } catch (error) {
              console.error("Error fetching property:", error.message);
            }
          }
        } catch (error) {
          console.error("Error fetching seat:", error);
          // Optional: show toast, set error state, redirect, etc.
        }
      };

      fetchData();
    }
  }, [roomType, id]);
  console.log(bookedDates);

  useEffect(() => {
    localStorage.removeItem("bookingItem");
    localStorage.removeItem("seatItem");
  }, []);

  const { data: facilities } = UseFetch("facilityCategory");

  const recomended = useRecommended();
  const publishedRecomended = recomended?.filter(
    (property) => property?.categoryDetails?.name === data?.category?.name
  );

  // modal

  const handleOpen2 = (value) => setSize2(value);

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

  // Page location top to path dependency

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === 0) {
      return null;
    } else {
      return <img loading="lazy" src={LeftArrow} alt="prevArrow" {...props} />;
    }
  };

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === publishedRecomended?.length - 5) {
      return null;
    } else {
      return <img loading="lazy" src={RightArrow} alt="nextArrow" {...props} />;
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
          roomType,
        };
        const response = await axios.post(
          `${serverBaseUrl}/wishlist`,
          newWishlist
        );
        toast.success("Added to your wishlist!");

        setAddedWishlist(true);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    } else {
      try {
        const response = await axios.delete(
          `${serverBaseUrl}/wishlist/${wishId}`
        );
        toast.success("This room has been removed from your wishlist!");
        setAddedWishlist(false);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div>
      {seat?.isSeatPublished === "Unpublished" ||
      data?.isPublished === "Unpublished" ? (
        <div className="h-[55vh] flex flex-col gap-4 justify-center items-center">
          <h2 className="text-2xl text-red-600 font-semibold">
            The room has been unpublished for upgrading...
          </h2>
          <Link
            to={"/"}
            className="bg-[#35B0A7] text-white px-3 py-2 rounded-md hover:text-white"
          >
            {" "}
            Choose Another
          </Link>
        </div>
      ) : (
        <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0">
          {photos?.length > 0 ? (
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
              <ImageViewerSlider photos={photos} />

              <div className="mt-2 text-start ">
                <div className="sticky lg:top-[70px] sm:top-[70px] bg-white py-1 ">
                  <div className="flex text-[24px] font-medium">
                    <div onClick={() => setKeyValue(0)}>
                      <a
                        href="#keyDetails"
                        onClick={anchorClick}
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
                      {facilities?.map((pd, index) => (
                        <div
                          key={pd?._id}
                          onClick={() => setKeyValue(index + 1)}
                        >
                          <span>
                            <a
                              href={`#${pd?.name}`}
                              onClick={anchorClick}
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
                          onClick={anchorClick}
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
                          onClick={anchorClick}
                          className="hover:text-black hover:border-b-2 border-[#35B0A7]"
                        >
                          {data?.category?.name} Details
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
                              <img
                                loading="lazy"
                                src="/images/icon/marker-02.png"
                                alt=""
                              />
                            </div>
                            <p className="ms-1"> {data?.branch?.name} -</p>
                          </div>
                          <div className="flex text-[#9A9A9A] items-center mt-2">
                            <div>
                              <img
                                src="/images/icon/marker-02.png"
                                className="md:w-[25px] sm:w-[35px]"
                                alt=""
                              />
                            </div>
                            <p className="ms-1">
                              {" "}
                              {data?.branch?.branchAddress}{" "}
                            </p>
                          </div>
                          <div className="flex text-[#9A9A9A] items-center mt-2">
                            <div>
                              <IoCallOutline className="md:w-[25px] h-[25px] sm:w-[35px]" />
                            </div>
                            <p className="ms-1">
                              {" "}
                              {data?.branch?.branchMobileNumber}{" "}
                            </p>
                          </div>
                          {seat && (
                            <>
                              <p className="ms-1 md:text-xl sm:text-[1rem]">
                                Seat Number : {seat?.seatNumber}{" "}
                                <span className="text-sm">
                                  [{seat?.seatType}, {seat?.name} ]
                                </span>
                              </p>
                            </>
                          )}
                          <div className="mt-2">
                            <div className="flex items-center text-black">
                              <p
                                className={`ms-1  ${
                                  seat
                                    ? "text-[16px] text-[#9A9A9A] font-[700]"
                                    : "md:text-xl sm:text-[1rem]"
                                }`}
                              >
                                Room Number : {data?.roomNumber}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex md:ml-[50px] md:justify-between sm:mt-3 md:mt-0">
                        <div>
                          <AiFillHeart
                            className={`w-[24px] h-[30px] cursor-pointer ${
                              addedWishList && "text-red-600"
                            }`}
                            onClick={handleWishlist}
                          />
                          {/* {checkWishListIds?.some((item) => item === id) ? (
                        <AiFillHeart
                          className={`w-[24px] h-[30px] cursor-pointer text-red-600`}
                          onClick={handleRemoveSubmit}
                        />
                      ) : (
                        <AiFillHeart
                          className={`w-[24px] h-[30px] cursor-pointer `}
                          onClick={handleSubmit}
                        />
                      )} */}
                        </div>
                        <div>
                          <AiOutlineShareAlt className="w-[24px] h-[30px] cursor-pointer ml-5 hover:text-[#35B0A7]" />
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex items-center gap-x-3">
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
                </div> */}

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
                        <RentVisitModal
                          property={data}
                          handleOpen2={handleOpen2}
                        />
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
                      <div className="grid grid-cols-6 gap-x-4 md:gap-y-16 sm:gap-y-4 py-5 text-sm">
                        <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3">
                          <p className="font-bold">Type</p>
                          <p>{data?.category?.name}</p>
                        </div>
                        <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3">
                          <p className="font-bold">People</p>
                          <p>
                            {data?.totalSeats
                              ? data?.totalSeats
                              : data?.bedroom}{" "}
                            People{" "}
                          </p>
                        </div>
                        <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3">
                          <p className="font-bold">Bed Type</p>
                          <p>{data?.bedType} </p>
                        </div>
                        <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3">
                          <p className="font-bold">Floor</p>
                          <p>
                            {data?.floor}{" "}
                            {data?.floor === "1st" || "2nd" || "3rd"
                              ? ""
                              : "th"}{" "}
                          </p>
                        </div>

                        <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3">
                          <p className="font-bold">Bathroom</p>
                          <p>{data?.bathroom} Bathroom</p>
                        </div>

                        {keyDetails ? (
                          <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3">
                            <p className="font-bold">Balcony</p>
                            <p>{data?.balcony}</p>
                          </div>
                        ) : (
                          ""
                        )}
                        {keyDetails ? (
                          ""
                        ) : (
                          <div
                            className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 mt-5 cursor-pointer"
                            onClick={() => setKeyDetails(true)}
                          >
                            <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                              See More
                            </p>
                          </div>
                        )}
                      </div>
                      {keyDetails ? (
                        <div className="grid grid-cols-6 gap-x-4 md:gap-y-16 sm:gap-y-4 md:py-5">
                          <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3">
                            <p className="font-bold">Room Size</p>
                            <p>{data?.area} SQ Feet</p>
                          </div>
                          <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3">
                            <p className="font-bold">Furnishing</p>
                            {data?.furnitured === "yes" ? (
                              <p>Yes</p>
                            ) : (
                              <p>No</p>
                            )}
                          </div>
                          <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3 ">
                            <p className="font-bold"> Wi-Fi</p>
                            {data?.WiFi === "yes" ? <p>Yes</p> : <p>No</p>}
                          </div>
                          <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1">
                            <p className="font-bold"> CCTV</p>
                            {data?.CCTV === "yes" ? <p>Yes</p> : <p>No</p>}
                          </div>
                          <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3">
                            <p className="font-bold">Meal</p>
                            <p>Complementary Breakfast</p>
                          </div>
                          {!keyDetails ? (
                            ""
                          ) : (
                            <div
                              className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 mt-5 cursor-pointer"
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
                    <Facilities allFacilities={allFacilities} />

                    {data?.category?.name !== "Apartment" ? (
                      <div className="w-full">
                        <h2
                          id="apartmentDetails"
                          className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5"
                        >
                          Facilities
                        </h2>
                        <div className="leading-8 text-sm">
                          <p>
                            1. 24hours Emergency Service and Medical Support.
                          </p>
                          <p> 2. Daily Housekeeping.</p>
                          <p>
                            3. Customized or Specials Diet Meal Plan (On
                            Request)
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
                              : 3 Large Bed rooms with 3 Balcony, Spacious
                              Drawing Room, Dining & Family Living Room, Highly
                              Decorated Kitchen with a Store Room and Servant
                              room with Attached Toilet.
                            </p>
                            <p>
                              : 1. Electricity with full time Generator Service.
                              2. Available 24/7 Gas. 3. Car Parking with 1
                              Driver’s Accommodation. 4. Roof TOp Beautified
                              Garden and Grassy Ground. 5. Full Building Covered
                              by CCTV.
                            </p>
                          </div>
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
                          designated quiet hours to ensure everyone's comfort
                          and rest.
                        </p>
                        <p>
                          3. Cleanliness: Keep your living space clean and tidy,
                          and follow the hostel's cleanliness guidelines in
                          common areas.
                        </p>
                        <p>
                          4. No Smoking: Smoking is strictly prohibited within
                          the premises of Project Second Home.
                        </p>
                        <p>
                          5. Security: Ensure the safety and security of
                          yourself and others by following the hostel's security
                          measures and reporting any concerns.
                        </p>
                        <p>
                          6. Visitors Policy: Adhere to the hostel's visitors
                          policy, which may include restrictions on overnight
                          guests.
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      {data?.branch?.locationLink !== "." ? (
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
                        {data?.branch?.nearLocation1 ? (
                          <div className="facility_h1 p-2 mt-5">
                            <h2 className="text-xl font-bold text-gray-900">
                              Around the Building
                            </h2>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="grid grid-cols-2 sm:text-sm ">
                          {data?.branch?.nearLocation1 ? (
                            <div className="flex mt-3">
                              <img loading="lazy" src={arroundIcon} alt="" />
                              <p className="ms-4">
                                {data?.branch?.nearLocation1}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}

                          {data?.branch?.nearLocation2 ? (
                            <div className="flex mt-3">
                              <img loading="lazy" src={arroundIcon} alt="" />
                              <p className="ms-4">
                                {data?.branch?.nearLocation2}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          {data?.branch?.nearLocation3 ? (
                            <div className="flex mt-3">
                              <img loading="lazy" src={arroundIcon} alt="" />
                              <p className="ms-4">
                                {data?.branch?.nearLocation3}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}

                          {data?.branch?.nearLocation4 ? (
                            <div className="flex mt-3">
                              <img loading="lazy" src={arroundIcon} alt="" />
                              <p className="ms-4">
                                {data?.branch?.nearLocation4}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          {data?.branch?.nearLocation5 ? (
                            <div className="flex mt-3">
                              <img loading="lazy" src={arroundIcon} alt="" />
                              <p className="ms-4">
                                {data?.branch?.nearLocation5}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          {data?.branch?.nearLocation6 ? (
                            <div className="flex mt-3">
                              <img loading="lazy" src={arroundIcon} alt="" />
                              <p className="ms-4">
                                {data?.branch?.nearLocation6}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    {/* review will include later */}

                    <div className="flex items-center gap-x-3 request-visit">
                      <button
                        className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch   px-4 py-1 rounded-lg"
                        style={{ width: 220 }}
                        onClick={() => handleOpen2("sm")}
                      >
                        Request for a visit to our PSH
                      </button>
                    </div>
                  </div>
                  {/* Total Box */}

                  <div className="flex flex-col items-start space-y-3 sm:col-span-12 md:col-span-6 lg:col-span-4 ">
                    <BookingTotalBox
                      data={data}
                      bookedDates={bookedDates}
                      seat={seat}
                    />
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
      )}
    </div>
  );
};

export default RoomDetails;
