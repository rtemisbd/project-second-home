import UseFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "./styles/AllPromo.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef } from "react";

const PromoOffer = () => {
  const { data } = UseFetch(`promo`);
  const swiperRef = useRef(null);

  const promoFiltering = data.filter(
    (promo) => promo.isPublished === "Published"
  );

  return (
    <div>
      <div className="">
        <div>
          <h2 className="text-base md:text-xl font-bold text-gray-900">
            Promo Offers
          </h2>
          <div className="flex justify-between items-end text-sm md:text-base mb-1">
            <p>Our best Discount Offers for you</p>
            {promoFiltering.length > 1 ? (
              <p>
                <Link
                  to="/promo"
                  className="flex items-center hover:text-[#27b3b1]"
                >
                  See More
                  <IoIosArrowForward />
                </Link>
              </p>
            ) : null}
          </div>

          {/* Swiper Component */}
          <div
            onMouseEnter={() => swiperRef.current?.autoplay.stop()} // Stop autoplay on hover
            onMouseLeave={() => swiperRef.current?.autoplay.start()} // Resume autoplay on mouse leave
          >
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true} // Infinite loop enabled
              modules={[Autoplay]}
              className="mySwiper"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {promoFiltering.map((item) => (
                <SwiperSlide key={item?._id}>
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoOffer;
