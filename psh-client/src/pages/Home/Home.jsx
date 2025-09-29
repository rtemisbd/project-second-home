import PromoOffer from "../../components/home/PromoOffer";
import Recommended from "../../components/home/Recommended";
import AllBranch from "../../components/home/AllBranch";
import Review from "../../components/home/Review";
import Facility from "../../components/home/Facility";
import SearchBoxSm from "../../components/home/SearchBoxSm";
import BusinessPlatform from "../new/BusinessPlatform";
import HomePage from "../../components/home/HomePage";
import useRentRoom from "../../hooks/useRentRoom";
import NewBanner from "../../components/home/NewBanner";
import Franchise from "../../components/home/Franchise";
import { useEffect, useState } from "react";
import useSeat from "../../hooks/useSeat";
import useVilla from "../../hooks/useVilla";
import { useQuery } from "react-query";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const Home = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Featured, setFeatured] = useState("yes");
  const [activeTab, setActiveTab] = useState("All");
  const [randomIndex, setRandomIndex] = useState([]);
  const [withSharedRoom, setWithSharedRoom] = useState(true);
  const [showVilla, setShowVilla] = useState(false);
  const [highestPrice, setHighestPrice] = useState(20000);

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
      const { data } = await axios.get(
        `${serverBaseUrl}/property?${queryParams.toString()}`
      );
      // console.log(data);

      setData(data?.properties);
      setHighestPrice(data?.highestHomeStayPrice);
      setRandomIndex(data?.properties); // immediate set
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

  // Shuffle Data
  const getRandomData = () => {
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRandomIndex(shuffled);
  };

  useEffect(() => {
    if (activeTab === "") {
      setData(randomIndex);
    }
  }, [activeTab]);

  useEffect(() => {
    if (data.length > 0) getRandomData();
  }, [data]);

  useEffect(() => {
    refetch();
    getRandomData();
  }, [activeTab, Featured]);

  const handleTabChange = (categoryName) => {
    setFeatured("");
    setActiveTab(categoryName);

    if (categoryName === "Villa") {
      setData([]);
      setRandomIndex([]);
      setShowVilla(true);
      return;
    }

    setShowVilla(false);

    if (categoryName === "Shared Room") {
      setRandomIndex(seats);
      setWithSharedRoom(false);
    } else {
      setWithSharedRoom(true);
    }
  };

  if (error) {
    return (
      <div className="text-xl text-red-600 pb-4">
        Error occurred: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="banner_custom_container">
        <NewBanner highestPrice={highestPrice} />
      </div>

      <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0 space-y-3">
        <SearchBoxSm />
      </div>

      <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0 space-y-3 lg:space-y-7">
        <div className="flex flex-col md:flex-row w-full gap-4 items-end">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <PromoOffer />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3">
            <Franchise />
          </div>
        </div>

        <HomePage
          data={randomIndex}
          activeTab={activeTab}
          categories={categories}
          handleTabChange={handleTabChange}
          villas={villas}
          showVilla={showVilla}
        />
      </div>

      <Facility />

      <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0 space-y-7">
        <Recommended />
        <AllBranch />
        <h2 className="text-xl font-bold mt-10">
          Why this platform better than others?
        </h2>
        <BusinessPlatform />
        <Review />
      </div>
    </>
  );
};

export default Home;
