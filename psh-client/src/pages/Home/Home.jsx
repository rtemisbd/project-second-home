import PromoOffer from "../../components/home/PromoOffer";
import Recommended from "../../components/home/Recommended";
import AllBranch from "../../components/home/AllBranch";

import Review from "../../components/home/Review";

import Categories from "../../components/home/Categories";
import Facility from "../../components/home/Facility";
import Banner from "../../components/home/Banner";
import SearchBoxSm from "../../components/home/SearchBoxSm";

import Platform from "../../components/home/Platform";
import SearchBox from "../../components/home/SearchBox";
import BusinessPlatform from "../new/BusinessPlatform";

function Home() {
  return (
    <>
      <div className="banner_custom_container ">
        <Banner />
      </div>
      <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0">
        <SearchBoxSm />
        <SearchBox />
        <Categories />
      </div>

      <Facility />
      <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0">
        <PromoOffer />
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
}

export default Home;
