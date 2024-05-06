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

export default function Categories() {
  const { data, error } = UseFetch(`property`);
  const [categories, setCategories] = useState({});
  const [activeTab, setActiveTab] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false); // Track the loading status
  const [randomIndex, setRandomIndex] = useState([]);
  const [lastSlideIndex, setLastSlideIndex] = useState(0);

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
  const publishRandomProperty = randomIndex?.filter(
    (property) =>
      property?.isPublished === "Published" && property?.Featured === "yes"
  );

  useEffect(() => {
    localStorage.removeItem("seatItem");
    localStorage.removeItem("bookingItem");
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://api.psh.com.bd/api/category",
          {
            mode: "cors",
          }
        );

        const categoryMap = {};

        data.forEach((category) => {
          categoryMap[category?._id] = category?.name;
        });
        setCategories(categoryMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

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

  const uniqueValues = Array.from(
    new Set(data.map((item) => item?.category?._id))
  );

  const filteredData = data.filter(
    (item) =>
      item.category?._id === activeTab &&
      item?.isPublished === "Published" &&
      item?.Featured === "yes"
  );

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === 0) {
      return null;
    } else {
      return <img src={LeftArrow} alt="prevArrow" {...props} />;
    }
  };

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    if (
      lastSlideIndex === publishRandomProperty?.length - 5 ||
      lastSlideIndex === filteredData?.length - 5
    ) {
      return null;
    } else {
      return <img src={RightArrow} alt="nextArrow" {...props} />;
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
    touchThreshold: 100,
    initialSlide: 0,
    draggable: true, // Enable free dragging
    swipeToSlide: true,
    className: `center mx-[-15px] `,
    arrows:
      publishRandomProperty?.length > 4 || filteredData?.length > 4
        ? true
        : false,
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
            activeTab === "All"
              ? lastSlideIndex >= publishRandomProperty?.length - 1
                ? "only-forMobile"
                : ""
              : lastSlideIndex >= filteredData?.length - 1
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
                setActiveTab("All");
              }}
              className="w-fit  md:text-[20px] sm:text-[14px] category-type z-0 text-[#00bbb4] "
            >
              Featured
            </Tab>
            {uniqueValues.map((type, index) => {
              const item = data.find((item) => item?.category?._id === type);
              if (!item) return null;

              const categoryName = categories[item?.category?._id]; // Get the category name using the ID

              return (
                <Tab
                  value={index}
                  key={index}
                  onClick={() => setActiveTab(type)}
                  className="w-fit md:text-[20px] sm:text-[12px] category-type px-0 z-0"
                >
                  {categoryName}
                </Tab>
              );
            })}
          </TabsHeader>
        </Tabs>
        {/* card start */}
      </div>

      {publishRandomProperty?.length > 0 ? (
        <div className="mt-3 all_recommended slider_margin card-slider ">
          <Slider {...settings}>
            {activeTab === "All"
              ? publishRandomProperty?.map((item) => (
                  <SingleCard key={item._id} item={item} />
                ))
              : filteredData.map((item) => (
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
