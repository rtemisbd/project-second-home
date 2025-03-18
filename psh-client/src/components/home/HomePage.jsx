import React, { useEffect, useState } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import axios from "axios";
import SingleCard from "./SingleCard";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { useQuery } from "react-query";
import "./styles/Recommended.css";
import "./styles/SingleCard.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import { propertySlider } from "../../helpers/utils/projectSlider";
import useSeat from "../../hooks/useSeat";
import useVilla from "../../hooks/useVilla";
// import SharedRoom from "./SharedRoom";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Featured, setFeatured] = useState("yes");
  const [activeTab, setActiveTab] = useState("All");
  const [randomIndex, setRandomIndex] = useState([]);
  const [withSharedRoom, setWithSharedRoom] = useState(true);
  const [showVilla, setShowVilla] = useState(false);
  // get all seats
  const seats = useSeat();
  const villas = useVilla();

  // Get Properties
  const { refetch, error } = useQuery(["propertyList"], async () => {
    try {
      const queryParams = new URLSearchParams({
        Featured,
        category: activeTab,
        isPublished: "Published",
        fromClient: true,
        withSharedRoom,
      });
      const response = await axios.get(
        `${serverBaseUrl}/property?${queryParams.toString()}`
      );

      setData(response?.data?.properties);
      setRandomIndex(data);
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

  // Show Random Data
  const getRandomData = () => {
    const shuffledData = [...data];

    for (let i = shuffledData?.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[random]] = [
        shuffledData[random],
        shuffledData[i],
      ];
    }

    setRandomIndex([...shuffledData]);
  };

  useEffect(() => {
    if (activeTab === "") {
      setData(randomIndex);
    }
  }, [activeTab]);

  useEffect(() => {
    if (data?.length > 0) {
      getRandomData();
    }
  }, [data]);

  if (error) {
    return <div>Error occurred: {error.message}</div>; // Placeholder for error state
  }

  useEffect(() => {
    refetch();
    getRandomData();
  }, [activeTab, Featured]);

  const handleTabChange = async (categoryName) => {
    setFeatured("");
    setActiveTab(categoryName);

    if (categoryName === "Villa") {
      setData([]);
      setRandomIndex(() => []);
      setShowVilla(true);
      return;
    }

    if (categoryName === "Shared Room") {
      setRandomIndex(seats);
      setWithSharedRoom(false);
    } else {
      setWithSharedRoom(true);
    }
  };

  return (
    <div className="category-item">
      <div className="text-left mt-3">
        <Tabs value={activeTab} className=" ">
          <TabsHeader
            className="rounded-none bg-transparent p-0 md:gap-x-5 sm:gap-x-4 mb-2"
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
                setActiveTab("All");
                setWithSharedRoom(true);
              }}
              className="w-fit md:text-[20px] sm:text-[14px] category-type z-0 text-[#00bbb4]"
            >
              Featured
            </Tab>
            {categories?.map((category, index) => (
              <Tab
                value={index}
                key={index}
                // onClick={() => {
                //   setFeatured("");
                //   setActiveTab(category.name);
                //   setWithSharedRoom(false);
                // }}
                onClick={() => handleTabChange(category.name)}
                className="w-fit md:text-[20px] sm:text-[12px] category-type px-0 z-0"
              >
                {category.name}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>

      {/* Cards */}
      {randomIndex?.length ? (
        <Splide options={propertySlider(randomIndex)}>
          {randomIndex?.map((item) => (
            <SplideSlide key={item?._id}>
              <SingleCard item={item} />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-x-5">
          <CardSkeleton cards={4} />
        </div>
      )}
    </div>
  );
}
