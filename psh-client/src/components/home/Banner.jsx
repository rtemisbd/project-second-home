import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import UseFetch from "../../hooks/useFetch";
import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import "./Banner.css";
import Skeleton from "react-loading-skeleton";
import PopUp from "./PopUp";

const Banner = () => {
  const { data } = UseFetch(`banner`);

  return (
    <>
      <div style={{ zIndex: "000" }}>
        <div className=" p-0 banner-slider ">
          {data?.length > 0 ? (
            data?.map((pd, i) => (
              <img
                key={i}
                src={pd?.photos[0]}
                alt="image 2"
                className=" w-full h-full"
              />
            ))
          ) : (
            <div className="skeleton-banner">
              <Skeleton className=" w-full md:h-[400px] sm:h-[120px]" />
            </div>
          )}
        </div>
      </div>

      {/* <PopUp /> */}
    </>
  );
};

export default Banner;
