import PromoOffer from "../../components/home/PromoOffer";
import Recommended from "../../components/home/Recommended";
import AllBranch from "../../components/home/AllBranch";

import Review from "../../components/home/Review";

import Facility from "../../components/home/Facility";
import Banner from "../../components/home/Banner";
import SearchBoxSm from "../../components/home/SearchBoxSm";

// import Platform from "../../components/home/Platform";
import SearchBox from "../../components/home/SearchBox";
import BusinessPlatform from "../new/BusinessPlatform";
import HomePage from "../../components/home/HomePage";
import useRentRoom from "../../hooks/useRentRoom";
import NewBanner from "../../components/home/NewBanner";
import Franchise from "../../components/home/Franchise";

const Home = () => {
  useRentRoom();
  return (
    <>
      <div className="banner_custom_container ">
        {/* <Banner /> */}

        <NewBanner />
      </div>
      <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0 space-y-3 ">
        <SearchBoxSm />
      </div>
      <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0 space-y-3 lg:space-y-7">
        <div className="flex flex-col md:flex-row w-full gap-4 items-end">
          <div className="w-full md:w-1/2 lg:w-1/3 ">
            <PromoOffer />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3 ">
            <Franchise />
          </div>
        </div>

        <HomePage />
      </div>

      <Facility />
      <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0 space-y-7">
        <Recommended />
        <AllBranch />
        <h2 className="text-xl font-bold mt-10">
          Why this platform better then others?
        </h2>
        <BusinessPlatform />

        <Review />
      </div>
    </>
  );
};

export default Home;
