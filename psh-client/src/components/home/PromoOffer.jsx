import { useState, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
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

  const totalSlides = promoFiltering.length;

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

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === totalSlides - 1;

  return (
    <div>
      <div className="">
        <div>
          <h2 className="text-base md:text-xl font-bold text-gray-900">
            Promo Offers
          </h2>
          <div className="flex justify-between items-end text-sm md:text-base mb-1">
            <p>Our best Discount Offers for you</p>
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
          <div className="all_promo slider_margin promo-slider pl-12 md:pl-0 relative">
            {/* Splide Slider */}
            <Splide
              ref={splideRef}
              options={promoSlider(promoFiltering)} // Options from utils
              onMove={handleMove} // Update active slide on move
            >
              {promoFiltering.map((item) => (
                <SplideSlide key={item?._id}>
                  <div className="group relative shadow">
                    <Link to={`/promo/${item?._id}`}>
                      <div className="relative w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75">
                        {item?.homePageCover?.length > 0 && (
                          <img
                            src={item?.homePageCover[0]}
                            alt=""
                            className="promo_img h-[100px] md:h-[100px] w-full object-fill"
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
                  className="splide__arrow splide__arrow--prev "
                  onClick={handlePrevClick}
                >
                  {"<"}
                </button>
              )}

              {/* Right Arrow */}
              {!isLastSlide && (
                <button
                  className="splide__arrow splide__arrow--next"
                  onClick={handleNextClick}
                >
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
