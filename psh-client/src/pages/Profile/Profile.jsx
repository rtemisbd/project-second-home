import React, { useContext, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useState } from "react";
import { MdPayment } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsGift } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import Booking from "../../components/profile/Booking";

import { AuthContext } from "../../contexts/UserProvider";
import Personal from "../../components/profile/Personal";
import Payment from "../../components/profile/Payment";
// import EditProfile from "../../components/profile/EditProfile";
import TicketList from "../../components/profile/TicketList";
import Setting from "../../components/profile/Setting";
import Vouchers from "../../components/profile/Vouchers";
import Referral from "../../components/profile/Referral";
import Community from "../../components/profile/Community";
import UseFetch from "../../hooks/useFetch";
import WishList from "../../components/profile/WishList";
import userEndOrder from "../../hooks/userEndOrder";
import { placeProfileMenu } from "../../redux/reducers/smProfileMenuSlice";
// import MenuList from "../../components/profile/MenuList";
import "./Profile.css";

export default function Profile() {
  const { user, logoutUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("booking");
  const { data } = UseFetch(`wishlist`);
  const isProfileMenu = useSelector(
    (state) => state?.profileMenu?.isProfileMenu
  );
  const dispatch = useDispatch();

  const [endOrder, setEndOrder] = useState({});
  const [userOrder] = userEndOrder();
  // console.log(endOrder);
  useEffect(() => {
    if (userOrder) {
      const lastOrder = userOrder[userOrder?.length - 1];

      setEndOrder(lastOrder);
    }
  }, [userOrder, user, endOrder?.bookingInfo?.branch]);

  const email = user?.email;
  const main = data.filter((pd) => pd?.email === email);
  const [active, setActive] = useState(0);
  const data2 = [
    {
      label: "Booking History",
      value: "booking",
      icon: <FaRegCalendarAlt style={{ width: "24px", height: "24px" }} />,
    },

    {
      label: "Transaction",
      value: "payment",
      icon: <MdPayment style={{ width: "24px", height: "24px" }} />,
    },

    {
      label: "Wishlist",
      value: "wishlist",
      icon: <AiOutlineHeart style={{ width: "24px", height: "24px" }} />,
    },

    {
      label: "Issu Deatails",
      value: "list",
      icon: <TbReport style={{ width: "24px", height: "24px" }} />,
    },
    {
      label: "Personal Deatils",
      value: "info",
      icon: <BsPerson style={{ width: "24px", height: "24px" }} />,
    },

    {
      label: "Security",
      value: "Security",
      icon: <RiLockPasswordLine style={{ width: "24px", height: "24px" }} />,
    },
    {
      label: "My Vouchers",
      value: "vouchers",
      icon: <BsGift style={{ width: "24px", height: "24px" }} />,
    },
    // {
    //   label: "Invite and Referral",
    //   value: "referral",
    //   icon: <AiOutlineShareAlt style={{ width: "24px", height: "24px" }} />,
    // },
    {
      label: "Community",
      value: "community",
      icon: <IoIosPeople style={{ width: "24px", height: "24px" }} />,
    },
    {
      label: "Log-out",
      value: "log-out",
      icon: <AiOutlineLogout style={{ width: "24px", height: "24px" }} />,
    },
  ];

  // const [isHeader, setIsHeader] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (value) => {
    setActiveTab(value);
  };

  const navigate = useNavigate();
  const handleLogOut = () => {
    logoutUser();
    navigate("/");
    window.location.reload();
  };
  return (
    <div
      className={`mx-auto max-w-7xl md:px-4 sm:${
        !isProfileMenu ? "px-2" : "px-0"
      } lg:px-8`}
      style={{
        marginTop: !isProfileMenu ? "0px" : "-50px",
      }}
    >
      <div className="mx-auto max-w-2xl lg:py-5 md:py-5 sm:py-0 lg:max-w-none lg:py-12 ">
        <div className=" ">
          {/* <div className="md:hidden sm:block">
            <MenuList />
          </div> */}
          <div className="">
            <Tabs
              value={activeTab}
              className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-x-5 "
            >
              <div className=" col-span-1 md:z-0 sm:z-[100000]">
                <TabsHeader
                  className={`flex-col w-full profile-left md:border  rounded p-0 lg:block md:block lg:px-0 md:px-0 sm:px-5
               
                 sm:${!isProfileMenu ? "hidden" : "block"}
                
              `}
                >
                  <div className="flex gap-x-2 p-3 border-b">
                    <div>
                      {/* <Avatar
                        src="https://i.ibb.co/jwYHgqz/Rectangle-97.png"
                        alt="avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50px",
                        }}
                      /> */}
                      <HiOutlineUserCircle
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>

                    <div>
                      <div>
                        <span> {user ? user?.firstName : ""}</span>
                        <span> {user ? user?.lastName : ""}</span>
                      </div>
                      <div>
                        <span
                          className="font-medium"
                          onClick={() => dispatch(placeProfileMenu(false))}
                        >
                          {/* <Tab value="edit" className="text-[#35b0a7] ">
                            Edit Your Profile
                          </Tab> */}
                        </span>
                      </div>
                    </div>
                    <div className="profile-close md:hidden sm:block ">
                      <div
                        onClick={() => dispatch(placeProfileMenu(false))}
                        className="mr-5"
                      >
                        <AiOutlineClose
                          style={{ width: "24px", height: "24px" }}
                        />
                      </div>
                    </div>
                  </div>
                  {endOrder?.paymentStatus ? (
                    <div
                      className=" border-b py-2 "
                      style={{
                        backgroundColor: "rgba(53, 176, 167, 0.20)",
                      }}
                    >
                      {endOrder?.paymentStatus ? (
                        <div className="md:ms-16 sm:ms-2">
                          <span className="mt-3 mb-3 text-sm py-2 font-medium ">
                            Payment Status:
                            <span
                              className=" text-sm text-white px-3 rounded py-1 ml-2"
                              style={{
                                backgroundColor:
                                  endOrder?.paymentStatus === "Unpaid"
                                    ? "#e34234"
                                    : "#35B0A7",
                              }}
                            >
                              {endOrder?.paymentStatus}
                            </span>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  {data2.map((tab, idx) => (
                    <span
                      onClick={tab.label === "Log-out" ? handleLogOut : null}
                      key={idx}
                    >
                      <Tab
                        onClick={() => {
                          setActive(idx);
                          dispatch(placeProfileMenu(false));
                        }}
                        value={tab.value}
                        className={`${active === idx ? "text-[#35b0a7]" : ""} ${
                          isProfileMenu ? "" : "profileTab"
                        }  flex justify-start py-1 lg:pl-14 md:pl-0 sm:pl-0 `}
                      >
                        <div
                          className=" gap-2 p-2 flex items-center side_bar "
                          // onClick={() => dispatch(placeProfileMenu(false))}
                        >
                          <div>{tab.icon}</div>

                          <div>
                            <span>{tab.label}</span>
                          </div>
                        </div>
                      </Tab>
                    </span>
                  ))}
                </TabsHeader>
              </div>

              {/* tabs description */}
              {isProfileMenu ? (
                ""
              ) : (
                <div className="w-full lg:col-span-3 md:col-span-3 sm:col-span-1 ">
                  <TabsBody>
                    {/* Personal Info Description */}
                    <TabPanel value="info" className="py-0">
                      <Personal />
                    </TabPanel>
                    {/* <TabPanel value="edit" className="py-0">
                      <EditProfile />
                    </TabPanel> */}
                    {/* <TabPanel value="createTricket" className="py-0">
                      <Ticket />
                    </TabPanel> */}

                    <TabPanel value="community" className="py-0">
                      <Community />
                    </TabPanel>
                    {/* <TabPanel value="waitingList" className="py-0">
                <JoinWaitingList />
              </TabPanel> */}

                    {/* Booking history Description */}
                    <TabPanel value="booking" className="py-0">
                      <Booking />
                    </TabPanel>

                    {/* Payment Setting Description */}
                    <TabPanel value="payment" className="py-0">
                      <Payment />
                    </TabPanel>

                    {/* Wishlist Description */}
                    <TabPanel value="wishlist" className="py-0">
                      <WishList />
                    </TabPanel>
                    <TabPanel value="list" className="py-0">
                      <TicketList />
                    </TabPanel>
                    <TabPanel value="listBack" className="py-0">
                      <TicketList />
                    </TabPanel>

                    {/* Setting Tab Description */}
                    <TabPanel value="Security" className="py-0">
                      {/* component */}
                      <Setting />
                    </TabPanel>
                    <TabPanel value="vouchers" className="py-0">
                      <Vouchers />
                    </TabPanel>
                    <TabPanel value="referral" className="py-0">
                      <Referral />
                    </TabPanel>
                  </TabsBody>
                </div>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
