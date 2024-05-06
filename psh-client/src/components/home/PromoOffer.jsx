import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IoIosArrowForward } from "react-icons/io";

import UseFetch from "../../hooks/useFetch";
import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import "./AllPromo.css";

const PromoOffer = () => {
  const { data } = UseFetch(`promo`);
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === 0) {
      return null;
    } else {
      return <img src={LeftArrow} alt="prevArrow" {...props} />;
    }
  };
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === data?.length - 3) {
      return null;
    } else {
      return <img src={RightArrow} alt="nextArrow" {...props} />;
    }
  };
  const settings = {
    dots: false,
    speed: 400,

    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    arrows: data?.length > 3 ? true : false,
    autoplay: false,
    infinite: true,
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
          infinite: false,
          // autoplay: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          // infinite: true,
          // autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 640,
        settings: {
          className: `center ms-[-8px] `,
          afterChange: (index) => {
            setLastSlideIndex(index);
          },
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,

          arrows: false,
          initialSlide: 1,
          speed: 400,
          cssEase: "ease-out",
        },
      },
    ],
  };

  return (
    <div>
      <div className="mt-5">
        <div className="">
          <div className="">
            <h2 className="text-xl font-bold text-gray-900">Promo Offers</h2>
            <div className="flex justify-between items-center">
              <p className="mb-2">Our best Discount Offers for you</p>
              <p>
                <Link
                  to="/promo"
                  className="flex items-center hover:text-[#27b3b1]"
                >
                  See More
                  <IoIosArrowForward />
                </Link>
              </p>
            </div>
            <div className="all_recommended slider_margin promo-slider">
              {/* <Splide
                options={{
                  // type: "loop",
                  arrows: data?.length > 3 ? true : false,

                  rewind: true,
                  drag: "free",
                  gap: "1rem",
                  perPage: 3,
                  height: "14rem",
                  pagination: false,
                  breakpoints: {
                    1200: { arrows: true, perPage: 3 },
                    800: { arrows: true, perPage: 2 },
                    640: { arrows: true, perPage: 1, padding: "5rem" },
                  },
                }}
              >
                {data.map((item, i) => (
                  <SplideSlide>
                    <div key={i} className="group relative">
                      <Link to={`/promo/${item._id}`}>
                        <div className="relative w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75">
                          <img
                            src={item.photos[0]}
                            alt=""
                            className="promo_img"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </Link>
                    </div>
                  </SplideSlide>
                ))}
              </Splide> */}

              <Slider {...settings}>
                {data
                  ?.slice()
                  ?.reverse()
                  .map((item, i) => (
                    <div key={i} className="group relative">
                      <Link to={`/promo/${item?._id}`}>
                        <div className="relative w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75">
                          {item?.homePageCover?.length > 0 ? (
                            <img
                              src={item?.homePageCover[0]}
                              alt=""
                              className="promo_img"
                              style={{
                                maxWidth: "100%",

                                height: "200px",
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoOffer;
