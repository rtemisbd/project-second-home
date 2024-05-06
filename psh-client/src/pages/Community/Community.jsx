import React, { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import UseFetch from "../../hooks/useFetch";
import LeftArrow from "../../assets/img/left-arrow.svg";
import RightArrow from "../../assets/img/right-arrow.svg";
import "./Community.css";

const Community = () => {
  const { data } = UseFetch(`event`);
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );
  const settings = {
    dots: false,

    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (index) => {
      setLastSlideIndex(index);
    },
    infinite: false,
    speed: 400,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    className: "mx-[-15px]",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
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
          className: `center ms-5 ${
            lastSlideIndex >= 1 ? "only-forMobile" : ""
          }`,
          afterChange: (index) => {
            setLastSlideIndex(index);
          },
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          speed: 1000,
          autoplaySpeed: 1000,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div>
      <div className="community_header custom-container">
        <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16 ">
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 md:col-span-6">
            <div className="2xl:ms-12 ">
              <div className="flex justify-center items-center h-96">
                <div className="">
                  <h1 className="text-black">PSH Community Event</h1>
                  <p className="community_p my-4">
                    Di mana keceriaan jadi cerita baru. Temukan ragam acara
                    pilihanmu di PSH!
                  </p>
                  <div className="md:flex  gap-4">
                    <button
                      className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch text-white px-4 py-4 rounded-lg"
                      style={{ width: 220, background: "black" }}
                    >
                      Check the Event Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 md:col-span-6 ">
            <Carousel className="rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                alt="image 1"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 2"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="image 3"
                className="h-full w-full object-cover"
              />
            </Carousel>
          </div>
        </div>
      </div>
      <div className="custom-container">
        <h2 className="text-xl font-bold mb-5 mt-12">Event choices for you</h2>
        <div className=" md:px-0 sm:px-6 ">
          <div className=" lg:py-2">
            <div className=" md:space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src="/assets/img2/SVG (4).png" />
                  </div>
                  <div className="ms-3">
                    <h2 className="text-black font-bold text-[16px]">
                      Workshop
                    </h2>
                    <p>Painting, drawing, photography and more</p>
                  </div>
                </div>
              </div>
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src="/assets/img2/SVG (5).png" />
                  </div>
                  <div className="ms-3">
                    <h2 className="text-black font-bold text-[16px]">Sport</h2>
                    <p>Yoga, swimming, badminton and much more!</p>
                  </div>
                </div>
              </div>
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src="/assets/img2/SVG (5).png" />
                  </div>
                  <div className="ms-3">
                    <h2 className="text-black font-bold text-[16px]">
                      Entertainment
                    </h2>
                    <p>
                      Hanging out at music events and watching films together at
                      Rukita
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src="/assets/img2/SVG (5).png" />
                  </div>
                  <div className="ms-3">
                    <h2 className="text-black font-bold text-[16px]">
                      Kegiatan Sosial
                    </h2>
                    <p>Cleaning, sharing food and raising funds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-container">
        <h2 className="text-xl font-bold mb-5 mt-12">Event choices for you</h2>
        <div className="all_promo slider_margin card-slider">
          <Slider {...settings}>
            {data?.map((item) => (
              <div
                className="group relative"
                style={{ height: "160px", width: "270px" }}
                key={item?._id}
              >
                <Link to={`/event/${item?._id}`}>
                  <div className="overflow-hidden">
                    <div className="m-0 rounded-none">
                      <img
                        src={item?.photos[0]}
                        alt="ui/ux review check"
                        style={{ height: "160px", width: "100%" }}
                      />
                    </div>
                    <div
                      className="md:p-4 sm:p-2"
                      style={{
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      }}
                    >
                      <p className="business font-bold"> {item?.name}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Community;
