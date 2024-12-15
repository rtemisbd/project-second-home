import { useState, useRef, useEffect } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(true);
  const { data } = UseFetch(`promo`);

  const splideRef = useRef(null); // Create a ref for the Splide instance

  const promoFiltering = data.filter(
    (promo) => promo.isPublished === "Published"
  );

  const handleMove = (splide) => {
    const newIndex = splide.index;
    setActiveIndex(newIndex);
    setShowPrevArrow(newIndex > 0);
    setShowNextArrow(newIndex < promoFiltering.length - 1);
  };

  useEffect(() => {
    setShowPrevArrow(false);
    setShowNextArrow(promoFiltering.length > 1);
  }, [promoFiltering]);

  const handlePrevClick = () => {
    if (splideRef.current) {
      splideRef.current.go("<");
    }
  };

  const handleNextClick = () => {
    if (splideRef.current) {
      splideRef.current.go(">");
    }
  };

  return (
    <div>
      <div className="mt-5">
        <div className="">
          <div className="">
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
              <Splide
                ref={splideRef} // Attach the Splide ref
                options={promoSlider(promoFiltering)}
                onMove={handleMove} // Listen for move events
              >
                {promoFiltering?.map((item, index) => (
                  <SplideSlide key={item?._id}>
                    <div className="group relative">
                      <Link to={`/promo/${item?._id}`}>
                        <div className="relative w-full overflow-hidden rounded-r-lg rounded-l-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75">
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
              <div className="all_promo absolute z-50 top-1/2 w-full flex justify-between">
                {showPrevArrow ? (
                  <button
                    className="splide__arrow--prev absolute"
                    onClick={handlePrevClick}
                  >
                    <img src={LeftArrow} alt="prevArrow" />
                  </button>
                ) : (
                  <></>
                )}
                {showNextArrow ? (
                  <button
                    className="splide__arrow--next right-10 absolute"
                    onClick={handleNextClick}
                  >
                    <img src={RightArrow} alt="nextArrow" />
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoOffer;
