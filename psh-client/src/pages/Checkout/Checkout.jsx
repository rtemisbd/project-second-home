import React, { useContext, useState } from "react";
import { useCountries } from "use-react-countries";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserProvider";

function formatExpires(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).\*/g, "$1/$2");
}
const Checkout = () => {
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];
  const [type, setType] = React.useState("card");

  //cart
  const { user } = useContext(AuthContext);

  //cart
  const getState = useSelector((state) => state.bookingCart);

  const [price, setPrice] = React.useState(0);
  const [grandPrice, setGrandPrice] = React.useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let tax = 120;

  const gTotal = () => {
    const grandTotal = price + tax;
    setGrandPrice(grandTotal);
  };
  React.useEffect(() => {
    gTotal();
  }, [gTotal]);

  const navigate = useNavigate();

  console.log(getState);
  const initialInfo = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };

  const [bookingInfo, setBookingInfo] = useState(initialInfo);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...bookingInfo };

    newValue[field] = value;
    setBookingInfo(newValue);
  };
  const MySwal = withReactContent(Swal);
  // Handle Product submit
  const handleModal = (e) => {
    const orders = {
      ...bookingInfo,
      getState,
    };

    fetch("https://api.psh.com.bd/api/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orders),
    })
      .then((res) => res.json())
      .then((data) => {
        MySwal.fire({
          icon: "success",
          title: "Order successfully done",
          showConfirmButton: false,
          timer: 1500,
        });
      });

    e.preventDefault();
    navigate("/success");
  };

  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {/* component */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-900">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
            <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
              <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-8">
                <section className="py-1 bg-blueGray-50 w-full">
                  <div className="w-full  mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                      <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                          <h6 className="text-blueGray-700 text-xl font-bold">
                            Contact Details
                          </h6>
                        </div>
                      </div>
                      <div>
                        <form>
                          <div className="flex-auto  py-10 pt-0 text-start">
                            {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    User Information
                  </h6> */}
                            <div className="flex flex-wrap my-5 ">
                              <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3 ">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlfor="grid-password"
                                  >
                                    First Name *
                                  </label>
                                  <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    onBlur={handleOnBlur}
                                    defaultValue={user ? user.firstName : ""}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlfor="grid-password"
                                  >
                                    Last Name *
                                  </label>
                                  <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    onBlur={handleOnBlur}
                                    defaultValue={user ? user.lastName : ""}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap">
                              <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlfor="grid-password"
                                  >
                                    Address
                                  </label>
                                  <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    name="address"
                                    placeholder="Enter your address"
                                    onBlur={handleOnBlur}
                                    defaultValue={user ? user.address : ""}
                                    required
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap">
                              <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlfor="grid-password"
                                  >
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    name="email"
                                    placeholder="Enter your email"
                                    onBlur={handleOnBlur}
                                    required
                                    defaultValue={user ? user.email : ""}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap">
                              <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlfor="grid-password"
                                  >
                                    Phone
                                  </label>
                                  <input
                                    type="number"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    name="phone"
                                    placeholder="Enter your Phone Number"
                                    onBlur={handleOnBlur}
                                    required
                                    defaultValue={user ? user.phone : ""}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                <div>
                  <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center">
                      <div className="max-w-sm w-full sm:w-full lg:w-full py-6 px-3">
                        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                          <div
                            className="bg-cover bg-center h-56 p-4"
                            style={{
                              backgroundImage:
                                "url(https://i.ibb.co/qDzPGLG/div-controller-box-top.png)",
                            }}
                          >
                            <div className="flex justify-end">
                              <svg
                                className="h-6 w-6 text-white fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z" />
                              </svg>
                            </div>
                          </div>
                          <div
                            className="p-4"
                            style={{ background: "#35B0A7" }}
                          >
                            <p className="uppercase tracking-wide text-sm font-bold text-white">
                              Great choice and Comfy Room by PSH
                            </p>
                            <p className="uppercase tracking-wide text-sm font-normal text-white">
                              Dhanmondi 03, Road- 03, Dhaka-1234
                            </p>
                          </div>
                          <div className="py-3 border-t border-gray-300 text-gray-900">
                            <p className="text-center">
                              Studio Room, 1 Night, 1 Unit
                            </p>
                          </div>
                          <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
                            <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
                              Realtor
                            </div>
                            <div className="flex items-center pt-2">
                              <div
                                className="bg-cover bg-center w-10 h-10 rounded-full mr-3"
                                style={{
                                  backgroundImage:
                                    "url(https://via.placeholder.com/50x50)",
                                }}
                              ></div>
                              <div>
                                <p className="font-bold text-gray-900">
                                  Catherine Heffner
                                </p>
                                <p className="text-sm text-gray-700">
                                  (111) 111-1111
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-start border-t p-4">
                            <div className="flex justify-between  border-gray-300 text-gray-900">
                              <p className="">BDT 487,550 x 11 night</p>
                              <p> BDT 5,363,050</p>
                            </div>
                            <div className="flex justify-between   text-gray-900">
                              <p className="">Cleaning Fee </p>
                              <p> BDT 100,000</p>
                            </div>
                            <div className="flex justify-between   text-gray-900">
                              <p className="">Disc. Long Stay 8% </p>
                              <p>- BDT 429,044</p>
                            </div>
                            <p className="font-bold my-3">Add ons</p>
                            <div className="flex justify-between   text-gray-900">
                              <p className="">Internet Package </p>
                              <p>BDT 275,000</p>
                            </div>
                          </div>
                          <div className="flex justify-around py-3 border-t border-gray-300 text-gray-900">
                            <p className="">Total</p>
                            <p>BDT 5,309,006</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
