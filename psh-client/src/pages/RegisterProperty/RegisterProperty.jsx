import banner from "../../assets/img/register/banner.png";
import Apartment from "../../assets/img/register/Apartment.png";
import Villa from "../../assets/img/register/Villa.png";
import Hotel from "../../assets/img/register/Hotel.png";
import Building from "../../assets/img/register/Building.png";

const RegisterProperty = () => {
  const choiceArray = [
    {
      itemImg: banner,
      heading: "Full-Service Property Management",
      description:
        "We take care of bookings, guest communication, check-ins, cleaning, and maintenance. You just collect the income.",
    },
    {
      itemImg: banner,
      heading: "Maximum Exposure, Maximum Bookings",
      description:
        "Your property gets listed on PSH and top travel platforms, ensuring more guests and higher occupancy.",
    },
    {
      itemImg: banner,
      heading: "Optimized Pricing for Maximum Profit",
      description:
        "Dynamic pricing adjusts automatically to market demand, seasonality, and location, so you never miss out on revenue.",
    },
    {
      itemImg: banner,
      heading: "Guest Satisfaction Guaranteed",
      description:
        "Professional cleaning and amenities mean happy guests, glowing reviews, and repeat bookings.",
    },
    {
      itemImg: banner,
      heading: "Transparent Earnings & Insights",
      description:
        "Track bookings, income, and performance in real-time via our easy-to-use dashboard.",
    },
  ];

  const workMethods = [
    {
      heading: "Register Your Property",
      description:
        "Complete our quick and simple form with property details and photos.",
    },
    {
      heading: "Property Evaluation & Optimization",
      description:
        "Our experts review your listing and provide tips to boost bookings and guest satisfaction.",
    },
    {
      heading: "Professional Listing Goes Live",
      description:
        "Your property appears on PSH and partner platforms with professional photos and descriptions.",
    },
    {
      heading: "Sit Back & Earn",
      description:
        "We handle all bookings, guest support, and maintenance, while you enjoy passive income.",
    },
    {
      heading: "Continuous Support & Insights",
      description: "Continuous Support & Insights",
    },
  ];

  const listArray = [
    { icon: Apartment, title: "Apartments & flats" },
    { icon: Villa, title: "Villas & vacation homes" },
    { icon: Hotel, title: "Guesthouses & Home stays" },
    { icon: Building, title: "Commercial rental properties" },
  ];

  return (
    <div className="">
      {/* banner */}
      <div className="relative w-full h-[40vh] md:h-[60vh]">
        {/* Responsive Image */}
        <img
          src={banner}
          alt="Register Property Banner"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F8F8] to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center w-[90%] md:w-[85%] xl:w-[68%] mx-auto">
          <div className="">
            <h2 className="text-xl md:text-4xl font-bold text-[#35B0A7]">
              Earn More from Your Property—Stress-Free!
            </h2>
            <p className="my-2 md:my-4 text-[#267373] md:text-xl">
              Your apartment, villa, or guesthouse can earn more while we handle
              everything. <br /> Join hundreds of property owners already
              boosting their income with PSH.
            </p>
            <button className="bg-[#35B0A7] hover:bg-[#2dc3c0] text-white px-3 md:px-8  py-2 rounded md:rounded-lg">
              Register Your Property Today
            </button>
          </div>
        </div>
      </div>
      {/* Why PSH Is the Smart Choice */}
      <div className="py-10 w-[90%] md:w-[85%] xl:w-[68%] mx-auto">
        <h2 className="text-[#35B0A7] text-2xl font-medium">
          Why PSH Is the Smart Choice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-5">
          {choiceArray.map((item) => (
            <div>
              <img
                src={item?.itemImg}
                alt="img"
                className="h-[160px] md:h-[200px] rounded-lg"
              />
              <h3 className="my-2 md:my-3 font-bold">{item.heading}</h3>
              <p className="text-[#646464] text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* How it Works */}
      <div className=" lg:py-10 w-[90%] md:w-[85%] xl:w-[68%] mx-auto">
        <h2 className="text-[#35B0A7] text-2xl font-medium">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 my-5">
          {workMethods.map((item, ind) => (
            <div className="flex gap-2">
              <div className="bg-gradient-to-b from-[#27B3B1] to-[#E9F5F400] px-2 pt-3 text-white">
                {ind + 1}
              </div>
              <div className="bg-[#D3ECEA] w-full">
                <h3 className="bg-[#27B3B1] py-3 text-white pl-3">
                  {item.heading}
                </h3>
                <p className="px-3 pt-3 pb-5 text-sm">{item?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Who Can List? */}
      <div className="py-10 w-[90%] md:w-[85%] xl:w-[68%] mx-auto flex flex-col-reverse lg:flex-row justify-between">
        <div className="lg:w-[55%]">
          <h2 className="text-[#35B0A7] text-2xl font-medium mt-6 lg:mt-0 mb-3">
            Who Can List?
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {listArray.map((list) => (
              <div className="flex  items-center  ">
                <div className="bg-[#35B0A7] p-2 w-[48px] h-[48px] rounded-tl-2xl">
                  <img src={list.icon} className="w-[32px] h-[32px]" />
                </div>
                <p className="pl-4 bg-gray-100 py-3 w-full rounded-br-2xl">
                  {list.title}
                </p>
              </div>
            ))}
          </div>
          <p className="text-black mt-4">
            No matter the type or size, PSH turns your property into a
            high-performing rental asset.
          </p>
        </div>
        <div className="lg:w-[40%]">
          <img src={banner} className="w-full h-full md:rounded-lg" />
        </div>
      </div>

      {/* benefits */}

      <div className="py-4 lg:py-10 w-[90%] md:w-[85%] xl:w-[68%] mx-auto flex flex-col lg:flex-row justify-between ">
        <div className="lg:w-[50%]">
          <img src={banner} className="w-full h-full rounded-lg" />
        </div>
        <div className="lg:w-[40%]">
          <h2 className="text-[#35B0A7] text-xl md:text-2xl font-medium mb-3  mt-6 lg:mt-0">
            Benefits That Make a Difference
          </h2>

          <ul className="ml-8 list-disc text-[#646464] ">
            <li>24/7 professional guest support</li>
            <li>SEO-optimized, high-converting listings</li>
            <li>Secure and timely payments</li>
            <li>Expert property management guidance</li>
            <li>Analytics & insights to track performance</li>
          </ul>

          <div>
            <h3 className=" text-xl font-bold mt-6">
              Don’t Miss Out—Start Earning Today!
            </h3>
            <p className="text-[#646464] ">
              Properties listed on PSH earn 30–50% more on average than
              self-managed rentals. The sooner you register, the sooner you
              start earning. Join now and turn your property into a reliable
              income stream.
            </p>
            <button className="bg-[#35B0A7] hover:bg-[#2dc3c0] text-white px-3 md:px-8  py-2 rounded  my-4">
              Register Your Property Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProperty;
