import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import UseFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/UserProvider";
import DetailsModal from "./DetailsModal";
import homeIcon from "../../assets/img/home.png";
import bedIcon from "../../assets/img/double-bed.png";
import arroundIcon from "../../assets/img/arround.svg";
import profileIcon from "../../assets/img/profile.png";
import Map from "./Map";
import BookingTotalBox from "../Booking/BookingTotalBox";
import Seats from "./Seats";
import BookingSeatTotal from "../Booking/BookingSeatTotal";
import { ReviewAll } from "./ReviewAll";
import useBranch from "../../hooks/useBranch";
import useExtraCharge from "../../hooks/useExtraCharge";
import "./Room.css";

const RoomDetails = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [extraCharge] = useExtraCharge(id);
  const userName = user?.firstName;
  const email = user?.email;

  const [data, setData] = useState([]);
  const [allBranch] = useBranch(id);
  useEffect(() => {
    fetch(`https://api.psh.com.bd/api/property/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  const { data2 } = UseFetch(`review`);

  const { data: facality } = UseFetch("facilityCategory");
  const branch = allBranch?.find((branch) => branch._id === data?.branch);
  // Recomended Data

  // find Published Recommended Property

  const main = data2?.filter((pd) => pd.property === id);

  // modal
  const [size, setSize] = useState(null);
  const [size2, setSize2] = useState(null);

  const handleOpen = (value) => setSize(value);
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
        navbarHeight;

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
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
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
              ""
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 ml-3 relative">
            {data?.photos &&
              data.photos.slice(0, 4).map((photo, index) => (
                <div key={index}>
                  <img
                    src={photo}
                    alt=""
                    className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]"
                  />
                </div>
              ))}
            <div className="absolute bottom-16 right-28">
              <span className="text-5xl">
                +{data?.photos ? data?.photos?.slice(4).length : ""}
              </span>
            </div>
          </div>
        </div>
        <DetailsModal size={size} handleOpen={handleOpen} data={data} />
      </div>
      <div className="mt-5 text-start ">
        <div className="sticky md:top-[72px] sm:top-[72px] bg-white py-1">
          <div className="md:flex text-[24px] gap-x-8 font-medium">
            <div>
              <a
                href="#keyDetails"
                onClick={anchorClickHandler}
                className="hover:text-black hover:border-b-2 border-[#35B0A7]"
              >
                Key Details
              </a>
            </div>
            <div className="sm:flex sm:gap-x-2 md:gap-x-6">
              {facality?.slice(0, 3).map((pd) => (
                <div key={pd?._id}>
                  <span>
                    <a
                      href={`#${pd?.name}`}
                      onClick={anchorClickHandler}
                      className="hover:text-black hover:border-b-2 border-[#35B0A7] sm:text-[18px] md:text-[22px]"
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
          </div>
        </div>

        <div className="grid grid-cols-12 lg:gap-x-5 gap-y-16 ">
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 lg:col-span-8 mt-2 pt-3">
            <div className="grid md:grid-cols-12 sm:grid-cols-6">
              <div className="col-span-10">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 ">
                    {data?.name}
                  </h1>

                  <p className="text-2xl font-bold mt-1">{data.branch?.name}</p>
                  <div className="md:flex mt-5">
                    <div className="flex text-[#9A9A9A] items-center">
                      <div>
                        <img src="/images/icon/marker-02.png" alt="" />
                      </div>
                      <p className="ms-1">{branch?.name}</p>
                    </div>
                    <div className="flex sm:text-[12px] sm:mt-2 md:mt-0">
                      <div className="flex md:mx-3 items-center">
                        <div>
                          <img src={homeIcon} alt="" />
                        </div>
                        {data.furnitured === "yes" ? (
                          <div className="ms-1 ">
                            <span>Full Furnited</span>
                          </div>
                        ) : (
                          <div className="ms-1">
                            <span>None Full Furnited</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div>
                          <img src="/images/icon/user-profile-02.png" alt="" />
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
                            <p className="ms-1">{data?.seats?.length} Seats</p>
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
            <div style={{ width: "100%" }}>
              <div className="facility_h1 p-2 mt-3">
                <h2
                  id="keyDetails"
                  className="text-2xl font-bold text-gray-900"
                >
                  Key Details
                </h2>
              </div>
              <div className="grid grid-cols-12 gap-x-4 md:gap-y-16 sm:gap-y-4 py-5">
                <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                  <p className="font-bold">Type</p>
                  <p>{data.category?.name}</p>
                </div>
                <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                  <p className="font-bold">Bed Type</p>
                  <p>{data?.bedType} Bed</p>
                </div>
                <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                  <p className="font-bold">Floor</p>
                  <p>{data.floor}th Floor</p>
                </div>
                <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                  <p className="font-bold">Room Size</p>
                  <p>{data.area} SQ Feet</p>
                </div>
                <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                  <p className="font-bold">Furnishing</p>
                  {data.furnitured === "yes" ? <p>Yes</p> : <p>No</p>}
                </div>
                <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                  <p className="font-bold">Balcony</p>
                  <p>{data.balcony}</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-x-4 md:gap-y-16 sm:gap-y-4 md:py-5">
                {/* <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                        <p className="font-bold">Bedroom</p>
                        <p>{data.bedroom} Bedroom</p>
                      </div> */}
                <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                  <p className="font-bold"> Wi-Fi</p>
                  {data.WiFi === "yes" ? <p>Yes</p> : <p>No</p>}
                </div>
                <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                  <p className="font-bold"> CCTV</p>
                  {data.CCTV === "yes" ? <p>Yes</p> : <p>No</p>}
                </div>
                <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-6 lg:col-span-2">
                  <p className="font-bold">Meal</p>
                  <p>
                    {/* {data.meal
                        }  */}
                    3 Times a day
                  </p>
                </div>
              </div>
            </div>

            {facality?.slice(0, 3).map((pd) => (
              <div style={{ width: "100%" }} key={pd._id}>
                <div className="facility_h1 p-2">
                  <h2
                    id={pd?.name}
                    className="text-2xl font-bold text-gray-900"
                  >
                    {pd.name}
                  </h2>
                </div>
                <div className="grid grid-cols-12 md:gap-x-4 md:gap-y-16 sm:gap-y-4 py-5 md:px-12">
                  {data.facility
                    ? data.facility
                        .filter((item) => item.facilityCategory === pd._id)
                        .map((item) => (
                          <React.Fragment key={item._id}>
                            <div className="flex flex-col items-start col-span-12 sm:col-span-6 lg:col-span-2">
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
                        ))
                    : ""}
                </div>
              </div>
            ))}

            {data?.category?.name !== "Apartment" ? (
              <div className="w-full">
                <h2
                  id="apartmentDetails"
                  className="text-2xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5"
                >
                  Facilities
                </h2>
                <div className="leading-8">
                  <p>1. 24hours Emergency Service and Medical Support.</p>
                  <p> 2. Daily Housekeeping.</p>
                  <p>3. Customized or Specials Diet Meal Plan (On Request)</p>
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
                    className="text-2xl font-bold text-gray-900"
                  >
                    Price Details
                  </h2>
                </div>
                <div className="flex gap-x-24">
                  <div className=" mt-5 text-[18px] font-bold">
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
                    className="text-2xl font-bold text-gray-900"
                  >
                    Apartment Details
                  </h2>
                </div>
                <div className="flex">
                  <div className=" mt-5 text-xl font-bold w-2/4">
                    <p className=" ">Address & Area</p>
                    <p>Flat Size</p>
                    <p>Floor</p>
                    <p>Facilities</p>
                    <p>Room Category</p>
                    <p className="mt-[20px]">Additional Facilities</p>
                  </div>
                  <div className=" mt-5 text-[18px] ">
                    <p className="">
                      : Ahamed House,House No #3, Road #3, Dhanmondi, Dhaka-1209
                      (Residential Area)
                    </p>
                    <p>: 3000 Sq Feet</p>
                    <p>
                      : A5 (5th Floor) (6 Storied Building) (East Facing Unit)
                    </p>
                    <p>
                      : One Modern Lift, All Modern Amenities and 24/7 Security
                      Gurd
                    </p>
                    <p>
                      : 3 Large Bed rooms with 3 Balcony, Spacious Drawing Room,
                      Dining & Family Living Room, Highly Decorated Kitchen with
                      a Store Room and Servant room with Attached Toilet.
                    </p>
                    <p>
                      : 1. Electricity with full time Generator Service. 2.
                      Available 24/7 Gas. 3. Car Parking with 1 Driver’s
                      Accommodation. 4. Roof TOp Beautified Garden and Grassy
                      Ground. 5. Full Building Covered by CCTV.
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
              <div className="mb-5 w-full" id="seat">
                {data.seats && data.seats.length > 0 ? (
                  <Seats data={data} handleSubmit={handleSubmit} />
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <div>
              <h2
                id="apartmentDetails"
                className="text-2xl font-bold text-gray-900 mb-5  facility_h1 p-2 mt-5"
              >
                {data?.category?.name} Rules
              </h2>
              <div className="leading-8">
                <p>
                  1. Respect Others: Treat your fellow residents with kindness,
                  consideration, and respect.
                </p>
                <p>
                  {" "}
                  2. Quiet Hours: Maintain a peaceful environment during
                  designated quiet hours to ensure everyone's comfort and rest.
                </p>
                <p>
                  3. Cleanliness: Keep your living space clean and tidy, and
                  follow the hostel's cleanliness guidelines in common areas.
                </p>
                <p>
                  4. No Smoking: Smoking is strictly prohibited within the
                  premises of Project Second Home.
                </p>
                <p>
                  5. Security: Ensure the safety and security of yourself and
                  others by following the hostel's security measures and
                  reporting any concerns.
                </p>
                <p>
                  6. Visitors Policy: Adhere to the hostel's visitors policy,
                  which may include restrictions on overnight guests.
                </p>
              </div>
            </div>

            <div className="w-full">
              {branch?.locationLink ? (
                <>
                  <div className="facility_h1 p-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Location
                    </h2>
                  </div>

                  <div className="hidden md:block mt-5">
                    <Map branch={branch}></Map>
                  </div>
                </>
              ) : (
                ""
              )}

              <div>
                <div className="facility_h1 p-2 mt-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Around the Building
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:text-[12px] md:text-[20px]">
                  <div className="flex mt-3">
                    <img src={arroundIcon} alt="" />
                    <p className="ms-4">Dhanmondi Lake</p>
                    <p className="ms-4">1.00 km</p>
                  </div>
                  <div className="flex mt-3">
                    <img src={arroundIcon} alt="" />
                    <p className="ms-4">Dhaka City College</p>
                    <p className="ms-4">0.26 km</p>
                  </div>
                  <div className="flex mt-3">
                    <img src={arroundIcon} alt="" />
                    <p className="ms-4">Popular Medical College Hospital</p>
                    <p className="ms-4">0.26 km</p>
                  </div>

                  <div className="flex mt-3">
                    <img src={arroundIcon} alt="" />
                    <p className="ms-4">Dhaka Medical College Hospital</p>
                    <p className="ms-4">2.26 km</p>
                  </div>
                  <div className="flex mt-3">
                    <img src={arroundIcon} alt="" />
                    <p className="ms-4">PG Hospital</p>
                    <p className="ms-4">2.26 km</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="facility_h1 p-2 flex mt-5">
                <h2 className="text-2xl font-bold text-gray-900 ">
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
                    <p className="bg-[#FFB800] text-white px-2 rounded">5.0</p>
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

              {/* <div>
                      <div className="flex items-center gap-x-3 mt-4">
                        <p>
                          <img src={profileIcon} alt="" />
                        </p>
                        <p>Mrs Fatema</p>
                        <p className="bg-[#FFB800] text-white px-2 rounded">
                          5.0
                        </p>
                        <p>September 2022</p>
                      </div>
                      <p className="mt-2 pl-12">
                        The room was fantastic! It was clean, cozy, and had all
                        the amenities I needed for a comfortable stay. The bed
                        was incredibly comfortable, and the decor was modern and
                        inviting. I would definitely book this room again in the
                        future
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-x-3 mt-4">
                        <p>
                          <img src={profileIcon} alt="" />
                        </p>
                        <p>Mrs Fatema</p>
                        <p className="bg-[#FFB800] text-white px-2 rounded">
                          5.0
                        </p>
                        <p>September 2022</p>
                      </div>
                      <p className="mt-2 pl-12">
                        The room was fantastic! It was clean, cozy, and had all
                        the amenities I needed for a comfortable stay. The bed
                        was incredibly comfortable, and the decor was modern and
                        inviting. I would definitely book this room again in the
                        future
                      </p>
                    </div> */}
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
            {/* Comment Reply Area */}
            <div>{/* <CommentTalking /> */}</div>
          </div>
          {/* Total Box */}

          <div className="flex flex-col items-start space-y-3 sm:col-span-12 md:col-span-4 lg:col-span-4 ">
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
      <Toaster
        containerStyle={{ top: 300 }}
        toastOptions={{ position: "top-center" }}
      ></Toaster>
    </div>
  );
};

export default RoomDetails;
