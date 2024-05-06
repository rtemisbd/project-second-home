import React from "react";
const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {/* Your custom next arrow component */}
      {/* For example, you can use an SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {/* Your custom previous arrow component */}
      {/* For example, you can use an SVG icon */}
      <button>SSS</button>
    </div>
  );
};
const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 5,
  infinite: true,
  // autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,

  responsive: [
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
      },
    },
  ],
};

const CustomSlider = () => {
  return (
    // Your slider component where you use settings
    <Slider {...settings}>{/* Your slider items */}</Slider>
  );
};

export default CustomSlider;
