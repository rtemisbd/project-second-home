import React, { useState } from "react";

import Slider from "react-slick";

import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import mapsOnArrow from "../../assets/img/search-on-maps-arrow.png";
import { useLocation } from "react-router-dom";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import RentRequestModal from "../../pages/new/RentRequestModal";

const SearchOnMaps = () => {
  const { pathname } = useLocation();
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === 0) {
      return null;
    } else {
      return <img src={LeftArrow} alt="prevArrow" {...props} />;
    }
  };
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    return <img src={RightArrow} alt="nextArrow" {...props} />;
  };
  const settings = {
    dots: false,

    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (index) => {
      setLastSlideIndex(index);
    },
    infinite: false,
    speed: 400,
    adaptiveHeight: true,
    // arrows: publishedData?.length > 5 ? true : false,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    className: "mx-[-15px]",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          infinite: true,

          autoplaySpeed: 3000,
          arrows: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,

          autoplaySpeed: 3000,
          arrows: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          className: `center ms-[-8px] ${
            lastSlideIndex >= 1 ? "only-forMobile" : ""
          }`,
          afterChange: (index) => {
            setLastSlideIndex(index);
          },
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          speed: 400,
          cssEase: "ease",
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="mt-10">
      <Slider {...settings}>
        <div className=" text-center space-y-3 sm:col-span-12 lg:col-span-4">
          <div className="flex">
            <img src="/images/Frame 3727.png" alt="project second home form" />
            <div style={{ marginLeft: 80, marginTop: 120 }}>
              <img
                src={mapsOnArrow}
                style={{
                  width: "40px",
                  height: "10px",
                }}
                alt=""
              />
            </div>
          </div>

          {pathname === "/" ? (
            <>
              <div className="flex justify-center w-full">
                <h2>Search on Maps</h2>
              </div>

              <p>
                Explore and find your desired location on our interactive maps
                feature, ensuring convenience and proximity to your desired
                area.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center w-full">
                <h2>Fill up the form</h2>
              </div>

              <p>
                Please fill up the form with required information and submit.
              </p>
              <div className="sm:mb-3 md:mb-0">
                <button
                  className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch px-4 py-4 rounded-lg text-white"
                  style={{ width: 140, background: "black" }}
                  onClick={() => handleOpen("sm")}
                >
                  I am interested in
                </button>
              </div>
            </>
          )}

          <Dialog
            open={size === "sm"}
            size={size || "sm"}
            handler={handleOpen}
            style={{ height: "100vh", overflow: "scroll" }}
          >
            <DialogHeader>
              {" "}
              <div
                className="flex justify-end text-3xl text-black"
                onClick={() => handleOpen(null)}
              >
                <i className="fa-solid fa-circle-xmark cursor-pointer"></i>
              </div>
            </DialogHeader>
            <DialogBody className="p-2">
              <RentRequestModal handleOpen={handleOpen} />
            </DialogBody>
          </Dialog>
        </div>
        <div className=" text-center space-y-3 sm:col-span-12 lg:col-span-4">
          <div className="flex">
            <img src="/images/Group.png" alt="" />
            <div style={{ marginLeft: 80, marginTop: 120 }}>
              <img
                src={mapsOnArrow}
                style={{
                  width: "40px",
                  height: "10px",
                }}
                alt=""
              />
            </div>
          </div>
          {pathname === "/" ? (
            <>
              {" "}
              <div className="flex justify-center w-full">
                <h2>Select Your Perfect Room</h2>
              </div>
              <p>
                Browse through our diverse range of room types and amenities,
                selecting the perfect option that suits your needs and
                preferences.
              </p>
            </>
          ) : (
            <>
              {" "}
              <div className="flex justify-center w-full">
                <h2>Select Your options</h2>
              </div>
              <p>
                One of your corporate housing representative will contact at the
                earliest, discuss and share possible options with you.
              </p>
            </>
          )}
        </div>
        <div className=" text-center col-span-12 space-y-3 sm:col-span-12 lg:col-span-4">
          <div className="flex">
            <img src="/images/Frame 3726.png" alt="" />
          </div>
          {pathname === "/" ? (
            <>
              <div className="flex justify-center w-full">
                <h2>Book and Get Ready to Stay</h2>
              </div>
              <p>
                Confirm your booking and get ready to enjoy a comfortable and
                memorable stay at Project Second Home.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center w-full">
                <h2>Book and Get Ready to Stay</h2>
              </div>
              <p>
                Explore and find your desired location on our interactive maps
                feature, ensuring convenience and proximity to your desired
                area.
              </p>
            </>
          )}
        </div>
      </Slider>
    </div>
  );
};

export default SearchOnMaps;
