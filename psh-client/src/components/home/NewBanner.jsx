import BannerSlider from "./BannerSlider";
import FindAccommodation from "./FindAccommodation";

const NewBanner = () => {
  return (
    <div className="flex justify-between w-full my-1 py-2 lg:py-5 ">
      <div className="w-[40%] h-auto  shadow-md rounded-md p-5 pb-0 hidden lg:block ">
        <FindAccommodation />
      </div>
      <div className="w-full lg:w-[60%] px-5   ">
        <BannerSlider />
      </div>
    </div>
  );
};

export default NewBanner;
