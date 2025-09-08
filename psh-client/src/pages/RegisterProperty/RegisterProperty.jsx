import banner from "../../assets/img/register/banner.png";

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
  return (
    <div className="bg-[#E9F5F4]">
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
            <button className="bg-[#35B0A7] hover:bg-[#2dc3c0] text-white px-12 md:px-24 py-2 md:py-4 rounded md:rounded-lg">
              Join Now
            </button>
          </div>
        </div>
      </div>
      {/* Why PSH Is the Smart Choice */}
      <div className="py-6 w-[90%] md:w-[85%] xl:w-[68%] mx-auto">
        <h2 className="text-[#35B0A7] text-2xl font-medium">
          Why PSH Is the Smart Choice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 my-5">
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
      <div className="py-6 w-[90%] md:w-[85%] xl:w-[68%] mx-auto">
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
    </div>
  );
};

export default RegisterProperty;
