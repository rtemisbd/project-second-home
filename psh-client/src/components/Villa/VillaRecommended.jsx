import axios from "axios";
import { useEffect, useState } from "react";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import Slider from "react-slick";
import VillaCard from "../home/VillaCard";
import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

const VillaRecommended = ({ division, resortId }) => {
  const [recommended, setRecommended] = useState([]);
  const [lastSlideIndex, setLastSlideIndex] = useState(0);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === 0) {
      return null;
    } else {
      return <img loading="lazy" src={LeftArrow} alt="prevArrow" {...props} />;
    }
  };

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === recommended?.length - 5) {
      return null;
    } else {
      return <img loading="lazy" src={RightArrow} alt="nextArrow" {...props} />;
    }
  };

  const settings = {
    dots: false,

    afterChange: (index) => {
      setLastSlideIndex(index);
    },
    infinite: false,
    speed: 400,
    adaptiveHeight: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,

    className: `center mx-[-15px] `,
    arrows: recommended?.length > 4 ? true : false,
    autoplay: false,

    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,

          infinite: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          className: `center ms-[-8px] ${
            lastSlideIndex >= recommended?.length - 1 ? "only-forMobile" : ""
          }`,
          afterChange: (index) => {
            setLastSlideIndex(index);
          },
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
          initialSlide: 1,
          speed: 400,
          cssEase: "ease-out",
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          division,
          isPublished: "Published",
        });
        const { data } = await axios.get(
          `${serverBaseUrl}/villa?${queryParams.toString()}`
        );
        const allVilla = data?.data;
        const recommendedVilla = allVilla?.filter(
          (villa) => villa?.resortId !== resortId
        );
        setRecommended(recommendedVilla);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [division, resortId]);

  return (
    <>
      {recommended.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mt-5">
            Recommended Villa
          </h2>
          <div className=" mb-5 all_recommended mt-4 slider_margin card-slider ">
            <Slider {...settings}>
              {recommended?.map((villa) => (
                <VillaCard key={villa._id} villa={villa} />
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-x-5">
          <CardSkeleton cards={4} />
        </div>
      )}
    </>
  );
};

export default VillaRecommended;
