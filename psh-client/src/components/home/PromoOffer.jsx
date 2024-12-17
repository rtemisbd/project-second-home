import { useState, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import UseFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { promoSlider } from "../../helpers/utils/promoSlider";

import "./styles/AllPromo.css";
import { IoIosArrowForward } from "react-icons/io";

const PromoOffer = () => {
  const { data } = UseFetch(`promo`);
  const splideRef = useRef(null); // Ref to control Splide instance
  const [activeIndex, setActiveIndex] = useState(0);

  const promoFiltering = data.filter(
    (promo) => promo.isPublished === "Published"
  );

  // Update active index on slide movement
  const handleMove = (splide) => {
    setActiveIndex(splide.index);
  };

  // Handle previous button click
  const handlePrevClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  // Handle next button click
  const handleNextClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };

  // Dynamic arrow visibility
  const isLastSlide = () => {
    if (!splideRef.current) return false;

    const splide = splideRef.current.splide;
    const { length } = splide.Components.Elements.slides; // Total slides
    const { perPage } = splide.options; // Slides visible at once
    const lastVisibleSlideIndex = splide.index + perPage;

    return lastVisibleSlideIndex >= length; // Check if we reached the end
  };

  const isFirstSlide = activeIndex === 0;

  return (
    <div>
      <div className="mt-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Promo Offers</h2>
          <div className="flex justify-between items-end my-2">
            <p className="">Our best Discount Offers for you</p>
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
          <div className="all_promo slider_margin promo-slider pl-0 relative">
            {/* Splide Slider */}
            <Splide
              ref={splideRef}
              options={promoSlider(promoFiltering)} // Options from utils
              onMove={handleMove} // Update active slide on move
            >
              {promoFiltering.map((item) => (
                <SplideSlide key={item?._id}>
                  <div className="group relative">
                    <Link to={`/promo/${item?._id}`}>
                      <div className="relative w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75">
                        {item?.homePageCover?.length > 0 && (
                          <img
                            src={item?.homePageCover[0]}
                            alt=""
                            className="promo_img h-[200px] md:h-[240px]"
                          />
                        )}
                      </div>
                    </Link>
                  </div>
                </SplideSlide>
              ))}
            </Splide>

            {/* Custom Arrow Buttons */}
            <div className="absolute top-1/2 w-full flex justify-between items-center z-50 text-xl font-bold">
              {/* Left Arrow */}
              {!isFirstSlide && (
                <button
                  className="splide__arrow splide__arrow--prev"
                  onClick={handlePrevClick}
                >
                  {/* <img src={LeftArrow} alt="Prev Arrow" /> */}
                  {"<"}
                </button>
              )}

              {/* Right Arrow */}
              {!isLastSlide() && (
                <button
                  className="splide__arrow splide__arrow--next"
                  onClick={handleNextClick}
                >
                  {/* <img src={RightArrow} alt="Next Arrow" /> */}
                  {">"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoOffer;
