import process from "../../assets/img/register/process.jpg";
import processSm from "../../assets/img/register/process-sm.jpg";
import Apartment from "../../assets/img/register/Apartment.png";
import Villa from "../../assets/img/register/Villa.png";
import Hotel from "../../assets/img/register/Hotel.png";
import Building from "../../assets/img/register/Building.png";
import partnerImg2 from "../../assets/img/offerImg.png";
import forPayment from "../../assets/img/for-about-monthly-payment.jpeg";
import forComprehensive from "../../assets/img/for-about-comprhensive.jpeg";
import partnerImg from "../../assets/img/partner-img1.jpeg";
import forMobile from "../../assets/img/for-about-mobile.jpeg";
import internetImg from "../../assets/img/internetImg.png";
import footerImg from "../../assets/img/footer-img.webp";
import { useRef, useState } from "react";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import toast, { Toaster } from "react-hot-toast";
import Pricing from "../../components/pricing/Pricing";

const RegisterProperty = () => {
  const formRef = useRef(null);

  const choiceArray = [
    {
      itemImg: partnerImg2,
      heading: "Full-Service Property Management",
      description:
        "We take care of bookings, guest communication, check-ins, cleaning, and maintenance. You just collect the income.",
    },
    {
      itemImg: forMobile,
      heading: "Maximum Exposure, Maximum Bookings",
      description:
        "Your property gets listed on PSH and top travel platforms, ensuring more guests and higher occupancy.",
    },
    {
      itemImg: internetImg,
      heading: "Optimized Pricing for Maximum Profit",
      description:
        "Dynamic pricing adjusts automatically to market demand, seasonality, and location, so you never miss out on revenue.",
    },
    {
      itemImg: forComprehensive,
      heading: "Guest Satisfaction Guaranteed",
      description:
        "Professional cleaning and amenities mean happy guests, glowing reviews, and repeat bookings.",
    },
    {
      itemImg: forPayment,
      heading: "Transparent Earnings & Insights",
      description:
        "Track bookings, income, and performance in real-time via our easy-to-use dashboard.",
    },
  ];

  const workMethods = [
    {
      heading: "List Your Property",
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
    { icon: Hotel, title: "Guesthouses & Homestays" },
    { icon: Building, title: "Commercial rental properties" },
  ];

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegisterProperty = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;

      const leaseData = {
        name: form.name.value,
        mobile: form.mobile.value,
        email: form.email.value,
        propertyType: form.propertyType.value,
        address: form.address.value,
      };

      const { data } = await axios.post(
        `${serverBaseUrl}/leaseProperty`,
        leaseData
      );

      if (data?.success === true) {
        toast.success(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    }
  };

  return (
    <div className={``}>
      <div>
        {/* banner */}
        <div className="relative  w-full h-[40vh] md:h-[60vh]">
          {/* Responsive Image */}
          <img
            src={footerImg}
            alt="Register Property Banner"
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#181818] to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center w-[90%] md:w-[85%] xl:w-[68%] mx-auto">
            <div className="">
              <h2 className="text-xl md:text-4xl font-bold text-white ">
                Earn More from Your Property, <br />
                <p className="mt-1"> 100% Stress Free !</p>
              </h2>
              <p className="my-2 md:my-4 text-white md:text-xl">
                Your apartment, villa, or guesthouse can earn more while we
                handle everything. <br /> Join hundreds of property owners
                already boosting their income with PSH.
              </p>
              <button
                onClick={handleScrollToForm}
                className="bg-[#35B0A7] hover:bg-[#2dc3c0] text-white px-3 md:px-8  py-2 rounded md:rounded-lg"
              >
                List Your Property Today
              </button>
            </div>
          </div>
        </div>
        {/* Why PSH Is the Smart Choice */}
        <div className="py-10 w-[90%] md:w-[85%] xl:w-[68%] mx-auto">
          <h2 className="text-[#35B0A7] text-xl md:text-2xl font-medium">
            Why PSH Is the Smart Choice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-5">
            {choiceArray.map((item) => (
              <div>
                <img
                  src={item?.itemImg}
                  alt="img"
                  className="h-[160px] md:h-[200px] rounded-lg w-full"
                />
                <h3 className="my-2 md:my-3 font-bold">{item.heading}</h3>
                <p className="text-[#646464] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* How it Works */}
        {/* <div className=" lg:py-10 w-[90%] md:w-[85%] xl:w-[68%] mx-auto">
          <h2 className="text-[#35B0A7] text-xl md:text-2xl font-medium">
            How it Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 my-5">
            {workMethods.map((item, ind) => (
              <div className="flex gap-2">
                <div className="bg-gradient-to-b from-[#27B3B1] to-[#E9F5F4] px-2 pt-3 text-white">
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
        </div> */}
        {/* Who Can List? */}
        <div className="pb-10 md:pb-0 md:py-10 w-[90%] md:w-[85%] xl:w-[68%] mx-auto flex flex-col-reverse lg:flex-row justify-between">
          <div className="lg:w-[40%]">
            <h2 className="text-[#35B0A7] text-xl md:text-2xl font-medium mt-6 lg:mt-0 mb-3">
              Who Can List?
            </h2>

            <div className="grid  gap-4">
              {listArray.map((list) => (
                <div className="flex  items-center   ">
                  <div className="bg-[#35B0A7] p-2 w-[48px] h-[48px] ">
                    <img src={list.icon} className="w-[32px] h-[32px]" />
                  </div>
                  <p className="pl-4 bg-gray-100 py-3 w-full ">{list.title}</p>
                </div>
              ))}
            </div>
            <p className="text-black mt-4">
              No matter the type or size, PSH turns your property into a
              high-performing rental asset.
            </p>
          </div>
          <div className="lg:w-[58%] h-[540px] md:h-[390px]">
            <img
              src={process}
              className="hidden md:block md:rounded-lg h-full w-full object-fit"
            />
            <img
              src={processSm}
              className=" rounded-lg h-full w-full object-cover md:hidden"
            />
          </div>
        </div>

        {/* pricing plan */}
        <div className="pb-6 lg:py-10 w-[90%] md:w-[85%] xl:w-[68%] mx-auto ">
          <Pricing />
        </div>

        {/* benefits */}

        <div className="pb-6 lg:py-10 w-[90%] md:w-[85%] xl:w-[68%] mx-auto flex flex-col-reverse lg:flex-row justify-between  ">
          <div
            ref={formRef}
            className="lg:w-[55%] border rounded-xl md:rounded-2xl shadow-md bg-white mt-6 md:mt-0 "
          >
            <div className="px-4 md:px-8 py-6">
              <form
                onSubmit={handleRegisterProperty}
                className="extra-form space-y-4 "
              >
                <h3 className="text-black font-bold md:text-xl mb-4">
                  Join Now and Turn Your Property Into A Reliable Income Stream.
                </h3>
                <div className="md:flex gap-4">
                  {/* Full Name */}
                  <div className="relative md:w-1/2 mb-3 md:mb-0">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder=" "
                      className="peer block w-full rounded-md border border-gray-400 bg-transparent px-3 py-3 text-black focus:border-[#35B0A7] focus:ring-1 focus:ring-[#35B0A7] outline-none"
                    />
                    <label
                      htmlFor="fullname"
                      className="absolute left-2.5 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#35B0A7]"
                    >
                      Owner Name
                    </label>
                  </div>

                  {/* Phone */}
                  <div className="relative md:w-1/2 mb-3 md:mb-0">
                    <input
                      type="text"
                      name="mobile"
                      required
                      placeholder=" "
                      className="peer block w-full rounded-md border border-gray-400 bg-transparent px-3 py-3 text-black focus:border-[#35B0A7] focus:ring-1 focus:ring-[#35B0A7] outline-none"
                    />
                    <label
                      htmlFor="mobile"
                      className="absolute left-2.5 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#35B0A7]"
                    >
                      Mobile
                    </label>
                  </div>
                </div>
                <div className="md:flex gap-4">
                  {/* Email */}
                  <div className="relative md:w-1/2 mb-3 md:mb-0">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder=" "
                      className="peer block w-full rounded-md border border-gray-400 bg-transparent px-3 py-3 text-black focus:border-[#35B0A7] focus:ring-1 focus:ring-[#35B0A7] outline-none"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-2.5 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#35B0A7]"
                    >
                      Email
                    </label>
                  </div>

                  {/* Property Type */}
                  <div className="relative md:w-1/2 mb-3 md:mb-0">
                    <select
                      name="propertyType"
                      required
                      defaultValue=""
                      className="peer block w-full rounded-md border border-gray-400 bg-transparent px-3 py-3 text-black focus:border-[#35B0A7] focus:ring-1 focus:ring-[#35B0A7] outline-none"
                    >
                      <option value="" disabled hidden>
                        <span className="!text-gray-200">
                          Choose Your Property Type
                        </span>
                      </option>
                      <option value="building">Building</option>
                      <option value="apartment">Apartment</option>
                      <option value="flat">Flat</option>
                      <option value="villa">Villa</option>
                    </select>
                    <label
                      htmlFor="propertyType"
                      className="absolute left-2.5 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#35B0A7]"
                    >
                      Property Type
                    </label>
                  </div>
                </div>

                {/* Location */}
                <div className="relative ">
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder=" "
                    className="peer block w-full rounded-md border border-gray-400 bg-transparent px-3 py-3 text-black focus:border-[#35B0A7] focus:ring-1 focus:ring-[#35B0A7] outline-none"
                  />
                  <label
                    htmlFor="address"
                    className="absolute left-2.5 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#35B0A7]"
                  >
                    Address
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 mt-6 rounded-md bg-[#35B0A7] hover:bg-[#2dc3c0] text-white font-medium transition"
                >
                  List Your Property
                </button>
              </form>
            </div>
          </div>

          <div className="lg:w-[40%] md:py-6">
            <h2 className="text-[#35B0A7] text-xl md:text-2xl font-medium mb-3 ">
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
                start earning.
                {/* Join now and turn your property into a reliable
                income stream. */}
              </p>
              {/* <button className="bg-[#35B0A7] hover:bg-[#2dc3c0] text-white px-3 md:px-8  py-2 rounded  my-4">
                List Your Property Today
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <Toaster
        containerStyle={{ top: 200 }}
        toastOptions={{ position: "top-center" }}
      ></Toaster>
    </div>
  );
};

export default RegisterProperty;
