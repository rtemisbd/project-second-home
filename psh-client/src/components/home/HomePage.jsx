import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
  Spinner,
  TabsBody,
} from "@material-tailwind/react";
import Slider from "react-slick";
import axios from "axios";

import UseFetch from "../../hooks/useFetch";
// import Header from "./Header";
import SingleCard from "./SingleCard";
import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeSeatBooking } from "../../redux/reducers/seatBookingSlice";
import { useQuery } from "react-query";

export default function HomePage() {
  // const { data, error } = UseFetch(`property`);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Featured, setFeatured] = useState("yes");
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [activeTab, setActiveTab] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [randomIndex, setRandomIndex] = useState([]);
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const { pathname } = useLocation();

  // Get Properties
  const { refetch, loading, error } = useQuery(["propertyList"], async () => {
    try {
      const queryParams = new URLSearchParams({
        Featured,
        category: activeTab,
        isPublished: "Published",
      });
      const response = await axios.get(
        `${serverBaseUrl}/property?${queryParams.toString()}`
      );

      setData(response?.data?.properties);
      setTotalDataCount(response?.data?.totalCount);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  // Get categories
  const { refetch: refetchCategories } = useQuery(["categories"], async () => {
    try {
      const response = await axios.get(`${serverBaseUrl}/category`);
      setCategories(response?.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  // show Random index
  const getRandomData = () => {
    const shuffledData = [...data];

    for (let i = shuffledData.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[random]] = [
        shuffledData[random],
        shuffledData[i],
      ];
    }

    setRandomIndex([...shuffledData]);
  };

  // find Published Property
  // const publishRandomProperty = randomIndex?.filter(
  //   (property) =>
  //     property?.isPublished === "Published" && property?.Featured === "yes"
  // );
  // console.log(publishRandomProperty);

  // useEffect(() => {
  //   localStorage.removeItem("seatItem");
  //   localStorage.removeItem("bookingItem");
  //   dispatch(removeSeatBooking());
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(`${serverBaseUrl}/category`, {
  //         mode: "cors",
  //       });

  //       const categoryMap = {};

  //       data.forEach((category) => {
  //         categoryMap[category?._id] = category?.name;
  //       });
  //       setCategories(categoryMap);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchCategories();
  // }, [pathname]);

  useEffect(() => {
    if (data.length > 0) {
      // setActiveTab(uniqueValues[0]);
      getRandomData();
      setIsLoaded(true); // Mark data as loaded
    }
  }, [data]);

  // if (!isLoaded) {
  //   return (
  //     <div className="flex justify-center mt-5">
  //       <div>
  //         <Spinner color="green" className="h-10 w-10" />
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return <div>Error occurred: {error.message}</div>; // Placeholder for error state
  }

  // const uniqueValues = Array.from(
  //   new Set(data?.map((item) => item?.categoryDetails?._id))
  // );

  // const filteredData = data.filter(
  //   (item) =>
  //     item.categoryDetails?._id === activeTab &&
  //     item?.isPublished === "Published" &&
  //     item?.Featured === "yes"
  // );

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === 0) {
      return null;
    } else {
      return <img src={LeftArrow} alt="prevArrow" {...props} />;
    }
  };

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === data?.length - 5) {
      return null;
    } else {
      return <img src={RightArrow} alt="nextArrow" {...props} />;
    }
  };
  useEffect(() => {
    refetch();
  }, [activeTab, Featured]);

  const settings = {
    dots: false,

    afterChange: (index) => {
      setLastSlideIndex(index);
    },
    infinite: false,
    speed: 400,
    adaptiveHeight: true,
    slidesToShow: 4,
    touchThreshold: 100,
    initialSlide: 0,
    draggable: true, // Enable free dragging
    swipeToSlide: true,
    className: `center mx-[-15px] `,
    arrows: data?.length > 4 ? true : false,
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

          autoplaySpeed: 3000,
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
            activeTab === ""
              ? lastSlideIndex >= data?.length - 1
                ? "only-forMobile"
                : ""
              : lastSlideIndex >= data?.length - 1
              ? "only-forMobile"
              : ""
          }`,
          afterChange: (index) => {
            setLastSlideIndex(index);
          },
          centerMode: true,
          slidesToShow: 1,

          infinite: false,
          arrows: false,

          speed: 400,
          cssEase: "ease-out",
          draggable: true, // Enable free dragging
          swipeToSlide: true,
        },
      },
    ],
  };

  return (
    <div className="category-item ">
      {/* <Header /> */}
      <div className=" text-left mt-3">
        <Tabs value={activeTab} className=" ">
          <TabsHeader
            className="rounded-none border-b bg-transparent p-0 md:gap-x-5 sm:gap-x-4 "
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-[#00BBB4] shadow-none rounded-none ",
            }}
          >
            <Tab
              value="All"
              onClick={() => {
                getRandomData();
                setFeatured("yes");
                setActiveTab("");
              }}
              className="w-fit  md:text-[20px] sm:text-[14px] category-type z-0 text-[#00bbb4] "
            >
              Featured
            </Tab>
            {categories.map((category, index) => (
              <Tab
                value={index}
                key={index}
                onClick={() => {
                  setFeatured("no");
                  setActiveTab(category.name);
                }}
                className="w-fit md:text-[20px] sm:text-[12px] category-type px-0 z-0"
              >
                {category.name}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>
      {/* card start */}
      {data?.length ? (
        <div className="mt-3 all_recommended slider_margin card-slider ">
          <Slider {...settings}>
            {data?.map((item) => (
              <SingleCard key={item._id} item={item} />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-x-5">
          <CardSkeleton cards={4} />
        </div>
      )}
    </div>
  );
}
