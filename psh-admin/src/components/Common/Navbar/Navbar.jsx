import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import img3 from "../../../img/home/profile.png";
// import pshLogo from "../../../img/home/psh-logo.png";
import { AuthContext } from "../../../contexts/UserProvider";
import "./Navbar.css";
import { MdDashboard } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { RiBuilding2Line } from "react-icons/ri";
import { IoBedOutline, IoCalendarOutline } from "react-icons/io5";
import { MdOutlineLocalOffer } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaRegHandPointRight } from "react-icons/fa";

import { MdOutlineSms } from "react-icons/md";
import { AiTwotoneWarning } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { TbFileHorizontal } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { PiFlagBanner } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { baseUrl } from "../../../utils/getBaseURL";
import villaIcon from "../../../img/home/villa.png";
import ResortSidebar from "./ResortSidebar";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive6, setIsActive6] = useState(false);
  const [isActive7, setIsActive7] = useState(false);
  const [isActive8, setIsActive8] = useState(false);
  const [isActive9, setIsActive9] = useState(false);
  const [isActive10, setIsActive10] = useState(false);
  const [isActive11, setIsActive11] = useState(false);
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const fetchBranch = async () => {
      const { data } = await axios.get(`${baseUrl}/api/branch/${user?.branch}`);
      setBranch(data);
    };
    fetchBranch();
  }, [user?.branch]);

  const handleLogOut = () => {
    logoutUser();
    navigate("/login");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (location.pathname === "/login") {
    return null;
  }

  return (
    <div>
      <div className="wrapper admin_nav">
        {/* right navbar links */}
        <nav className="main-header navbar navbar-expand">
          <div className="nav_design">
            <div className="mt-2" style={{ marginLeft: "100px" }}>
              <span className="" data-widget="pushmenu" role="button">
                <i className="fas fa-bars bars_1 fs-5" />
              </span>
            </div>

            <ul className="navbar-nav ml-lg-auto">
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <img src={img3} className="profile_image ms-5" alt="" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              </div>
            </ul>
          </div>
        </nav>
        {/* left navbar links */}

        <aside
          className="main-sidebar elevation-4 side_menubar "
          style={{
            position: "fixed",
          }}
        >
          {/* Sidebar */}
          <div className="sidebar">      
            
            {/* Sidebar user panel (optional) */}
            <div className="mt-2 d-flex gap-3 mt-4">
              <CgProfile
                style={{
                  width: "24px",
                  height: "24px",
                  color: "white",
                }}
              />
              <div className="text-white">
                <p
                  style={{
                    lineHeight: "10px",
                  }}
                >
                  {user?.firstName}
                </p>
                <p
                  style={{
                    lineHeight: 0,
                  }}
                  className="user-role"
                >
                  {user?.role === "SuperAdmin"
                    ? "Super Admin"
                    : user?.role === "subAdmin1"
                    ? "Sub Admin"
                    : user?.role === "manager"
                    ? "Branch Manager"
                    : user?.role === "partner"
                    ? "Partner"
                    : user?.role === "resortAdmin"
                    ? "Admin"
                    : user?.role === "resortAccountant"
                    ? "Accountant"
                    : user?.role === "resortReceptionist"
                    ? "Receptionist"
                    : ""}
                </p>
                <p
                  style={{
                    lineHeight: "5px",
                  }}
                  className="user-role"
                >
                  {branch?.name ? `Branch : ${branch?.name}` : ""}
                </p>
              </div>
            </div>
            {user?.role === "resortAdmin" ||
            user?.role === "resortAccountant" ||
            user?.role === "resortReceptionist" ? (
              <ResortSidebar />
            ) : (
              <nav className="mt-2" style={{ width: "1000px" }}>
                <ul
                  className="nav nav-pills nav-sidebar flex-column "
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  <div className="navbar_bar bar_menu_sm">
                    <li className="nav-link">
                      <button
                        className="nav-link"
                        data-widget="pushmenu"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <i
                          className="fa-solid fa-circle-xmark "
                          style={{ fontSize: 36 }}
                        ></i>
                      </button>
                    </li>
                  </div>

                  {(user && user?.role === "SuperAdmin") ||
                  user?.role === "admin" ||
                  user?.role === "subAdmin1" ||
                  user?.role === "subAdmin2" ||
                  user?.role === "manager" ? (
                    <Link to={"/dashboard"}>
                      <li className="main_nav-link">
                        <div className=" nav-link text-black  d-flex align-items-center">
                          <MdDashboard
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "white",
                              marginRight: "10px",
                            }}
                          />
                          <span className="span_text">Dashboard</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Dashboard
                          </span>
                        </div>
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}

                  {(user && user?.role === "SuperAdmin") ||
                  user?.role === "admin" ? (
                    <>
                      <li
                        className={`nav-item `}
                        style={{
                          backgroundColor: isActive1 ? "#2E3344" : "",
                          // borderLeft: isActive1 ? "2px solid #35b0a7" : "",
                        }}
                      >
                        <span
                          className="nav-link "
                          onClick={() => {
                            setIsActive1(!isActive1);
                            setIsActive2(false);
                            setIsActive3(false);
                            setIsActive4(false);
                            setIsActive5(false);
                            setIsActive6(false);
                            setIsActive7(false);
                            setIsActive8(false);
                            setIsActive9(false);
                            setIsActive10(false);
                          }}
                        >
                          <RiUserAddLine
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "white",
                              marginRight: "10px",
                            }}
                          />

                          <p style={{ color: "white" }}>
                            Manager & Partners
                            <i
                              className={`fas fa-angle-left right `}
                              style={{
                                rotate: isActive1 ? "-90deg" : "180deg",
                              }}
                            />
                          </p>
                        </span>
                        <ul
                          className={` custom-drop ${
                            isActive1 ? "custom-drop-show" : ""
                          }`}
                        >
                          <Link to={"/dashboard/manager_list"}>
                            <li className="main_nav-link">
                              <span className="nav-link">
                                {/* <img style={{ width: 16 }} src={img6} alt="" /> */}
                                <div className="menu_flex">
                                  <span className="span_text">Manager</span>
                                  <span
                                    className="span_text_mobile"
                                    data-widget="pushmenu"
                                  >
                                    Manager
                                  </span>
                                </div>
                              </span>
                            </li>
                          </Link>
                          <Link to={"/dashboard/partner_list"}>
                            <li className="main_nav-link">
                              <span className="nav-link">
                                {/* <img style={{ width: 16 }} src={img6} alt="" /> */}
                                <div className="menu_flex">
                                  <span className="span_text">Partner</span>
                                  <span
                                    className="span_text_mobile"
                                    data-widget="pushmenu"
                                  >
                                    Partner
                                  </span>
                                </div>
                              </span>
                            </li>
                          </Link>
                          <Link to={"/dashboard/resort-list"}>
                            <li className="main_nav-link">
                              <span className="nav-link">
                                {/* <img style={{ width: 16 }} src={img6} alt="" /> */}
                                <div className="menu_flex">
                                  <span className="span_text">Resort</span>
                                  <span
                                    className="span_text_mobile"
                                    data-widget="pushmenu"
                                  >
                                    Resort
                                  </span>
                                </div>
                              </span>
                            </li>
                          </Link>
                        </ul>
                      </li>
                      <li
                        className="nav-item"
                        style={{
                          backgroundColor: isActive2 ? "#2E3344" : "",
                          borderLeft: isActive2 ? "2px solid #35b0a7" : "",
                        }}
                      >
                        <span
                          className="nav-link"
                          onClick={() => {
                            setIsActive1(false);
                            setIsActive2(!isActive2);
                            setIsActive3(false);
                            setIsActive4(false);
                            setIsActive5(false);
                            setIsActive6(false);
                            setIsActive7(false);
                            setIsActive8(false);
                            setIsActive9(false);
                            setIsActive10(false);
                          }}
                        >
                          <RiBuilding2Line
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "white",
                              marginRight: "10px",
                            }}
                          />

                          <p className="span_text" style={{ color: "white" }}>
                            Manage Branch
                            <i
                              className={`fas fa-angle-left right`}
                              style={{
                                rotate: isActive2 ? "-90deg" : "180deg",
                              }}
                            />
                          </p>
                        </span>
                        <ul
                          className={` custom-drop ${
                            isActive2 ? "custom-drop-show" : ""
                          }`}
                        >
                          <Link to={"/dashboard/add_branch"}>
                            <li className="main_nav-link">
                              <span className="nav-link">
                                <div className="menu_flex">
                                  <span className="span_text">Add Branch</span>
                                  <span
                                    className="span_text_mobile"
                                    data-widget="pushmenu"
                                  >
                                    Add Branch
                                  </span>
                                </div>
                              </span>
                            </li>
                          </Link>
                          <Link to={"/dashboard/branch_list"}>
                            <li className="main_nav-link">
                              <span className="nav-link">
                                <div className="menu_flex">
                                  <span className="span_text">
                                    List of Branch
                                  </span>
                                  <span
                                    className="span_text_mobile"
                                    data-widget="pushmenu"
                                  >
                                    List of Branch
                                  </span>
                                </div>
                              </span>
                            </li>
                          </Link>
                        </ul>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                  {/* resort management */}
                  <li
                    className="nav-item"
                    style={{
                      backgroundColor: isActive11 ? "#2E3344" : "",
                      borderLeft: isActive11 ? "2px solid #35b0a7" : "",
                    }}
                  >
                    <span
                      className="nav-link"
                      onClick={() => {
                        setIsActive1(false);
                        setIsActive2(false);
                        setIsActive3(false);
                        setIsActive4(false);
                        setIsActive5(false);
                        setIsActive6(false);
                        setIsActive7(false);
                        setIsActive8(false);
                        setIsActive9(false);
                        setIsActive10(false);
                        setIsActive11(!isActive11);
                      }}
                    >
                      <img
                        src={villaIcon}
                        alt="villa icon"
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "10px",
                        }}
                      />

                      <p className="span_text" style={{ color: "white" }}>
                        Resort & Villa
                        <i
                          className={`fas fa-angle-left right`}
                          style={{ rotate: isActive11 ? "-90deg" : "180deg" }}
                        />
                      </p>
                    </span>

                    <ul
                      className={` custom-drop ${
                        isActive11 ? "custom-drop-show" : ""
                      }`}
                    >
                      <Link to={"/dashboard/add-resort"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">Add Resort</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                Add Resort
                              </span>
                            </div>
                          </span>
                        </li>
                      </Link>
                      <Link to={"/dashboard/resort-list"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">List of Resort</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                List of Resort
                              </span>
                            </div>
                          </span>
                        </li>
                      </Link>
                      <Link to={"/dashboard/add-villa"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">Add Villa</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                Add Villa
                              </span>
                            </div>
                          </span>
                        </li>
                      </Link>
                      <Link to={"/dashboard/villa-list"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">List of Villa</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                List of Villa
                              </span>
                            </div>
                          </span>
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <li
                    className="nav-item"
                    style={{
                      backgroundColor: isActive3 ? "#2E3344" : "",
                      borderLeft: isActive3 ? "2px solid #35b0a7" : "",
                    }}
                  >
                    {(user && user?.role === "SuperAdmin") ||
                    user?.role === "manager" ||
                    user?.role === "partner" ||
                    user?.role === "subAdmin1" ? (
                      <span
                        className="nav-link"
                        onClick={() => {
                          setIsActive1(false);
                          setIsActive2(false);
                          setIsActive3(!isActive3);
                          setIsActive4(false);
                          setIsActive5(false);
                          setIsActive6(false);
                          setIsActive7(false);
                          setIsActive8(false);
                          setIsActive9(false);
                          setIsActive10(false);
                        }}
                      >
                        <IoBedOutline
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />

                        <p className="span_text" style={{ color: "white" }}>
                          Room & Seats
                          <i
                            className={`fas fa-angle-left right`}
                            style={{ rotate: isActive3 ? "-90deg" : "180deg" }}
                          />
                        </p>
                      </span>
                    ) : (
                      ""
                    )}

                    <ul
                      className={` custom-drop ${
                        isActive3 ? "custom-drop-show" : ""
                      }`}
                    >
                      <Link to={"/dashboard/property-report"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">Room Overview</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                Room Overview
                              </span>
                            </div>
                          </span>
                        </li>
                      </Link>

                      <>
                        <Link to={"/dashboard/add_property"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Add New Room</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Add New Room
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      </>

                      <Link to={"/dashboard/property_list"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">List of Rooms</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                List of Rooms
                              </span>
                            </div>
                          </span>
                        </li>
                      </Link>
                      {user && user?.role === "partner" ? (
                        <Link to={"/dashboard/property_list_p"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">List of Rooms</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  List of Rooms
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}

                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/category_list"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  Room Categories
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Room Categories
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/featured"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  Featured Rooms
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Featured Rooms
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>

                  {(user && user?.role === "SuperAdmin") ||
                  user?.role === "admin" ||
                  user?.role === "subAdmin1" ? (
                    <Link
                      to={"/dashboard/booking-overview"}
                      style={{
                        backgroundColor:
                          location.pathname === "/booking-overview"
                            ? "#35b0a7"
                            : "",
                        borderRadius: "10px",
                      }}
                    >
                      <li className="main_nav-link">
                        <div
                          className={` nav-link d-flex align-items-center ${
                            location.pathname === "/booking-overview"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <IoCalendarOutline
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "white",
                              marginRight: "10px",
                            }}
                          />

                          <span className="span_text">Booking Overview</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Booking Overview
                          </span>
                        </div>
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}

                  <li
                    className="nav-item"
                    style={{
                      backgroundColor: isActive4 ? "#2E3344" : "",
                      borderLeft: isActive4 ? "2px solid #35b0a7" : "",
                    }}
                  >
                    {(user && user?.role === "SuperAdmin") ||
                    user?.role === "manager" ||
                    user?.role === "partner" ||
                    user?.role === "subAdmin1" ||
                    user?.role === "subAdmin2" ? (
                      <span
                        className="nav-link"
                        onClick={() => {
                          setIsActive1(false);
                          setIsActive2(false);
                          setIsActive3(false);
                          setIsActive4(!isActive4);
                          setIsActive5(false);
                          setIsActive6(false);
                          setIsActive7(false);
                          setIsActive8(false);
                          setIsActive9(false);
                          setIsActive10(false);
                        }}
                      >
                        <CiDiscount1
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />

                        <p className="span_text" style={{ color: "white" }}>
                          Discounts
                          <i
                            className={`fas fa-angle-left right`}
                            style={{ rotate: isActive4 ? "-90deg" : "180deg" }}
                          />
                        </p>
                      </span>
                    ) : (
                      ""
                    )}

                    <ul
                      className={` custom-drop ${
                        isActive4 ? "custom-drop-show" : ""
                      }`}
                    >
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ||
                      user?.role === "subAdmin2" ? (
                        <Link to={"/dashboard/add-promo"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  Create Discount
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Create Discount
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}

                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "manager" ||
                      user?.role === "partner" ||
                      user?.role === "subAdmin1" ||
                      user?.role === "subAdmin2" ? (
                        <>
                          <Link to={"/dashboard/promo_list"}>
                            <li className="main_nav-link">
                              <span className="nav-link">
                                <div className="menu_flex">
                                  <span className="span_text">
                                    List of Discount
                                  </span>
                                  <span
                                    className="span_text_mobile"
                                    data-widget="pushmenu"
                                  >
                                    List of Discount
                                  </span>
                                </div>
                              </span>
                            </li>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ||
                      user?.role === "subAdmin2" ? (
                        <Link to={"/dashboard/used-promo"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  User discount list
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  User discount list
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ||
                      user?.role === "subAdmin2" ? (
                        <Link to={"/dashboard/adjustmen-list"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  Discount Adjustment
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Discount Adjustment
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>
                  <li
                    className="nav-item"
                    style={{
                      backgroundColor: isActive5 ? "#2E3344" : "",
                      borderLeft: isActive5 ? "2px solid #35b0a7" : "",
                    }}
                  >
                    {(user && user?.role === "SuperAdmin") ||
                    user?.role === "subAdmin1" ? (
                      <span
                        className="nav-link"
                        onClick={() => {
                          setIsActive1(false);
                          setIsActive2(false);
                          setIsActive3(false);
                          setIsActive4(false);
                          setIsActive5(!isActive5);
                          setIsActive6(false);
                          setIsActive7(false);
                          setIsActive8(false);
                          setIsActive9(false);
                          setIsActive10(false);
                        }}
                      >
                        <MdOutlineLocalOffer
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />

                        <p className="span_text" style={{ color: "white" }}>
                          Subscriptions
                          <i
                            className={`fas fa-angle-left right`}
                            style={{ rotate: isActive5 ? "-90deg" : "180deg" }}
                          />
                        </p>
                      </span>
                    ) : (
                      ""
                    )}

                    <ul
                      className={` custom-drop ${
                        isActive5 ? "custom-drop-show" : ""
                      }`}
                    >
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/subscription-list"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Package</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Package
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}

                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/subscription-order"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  Partner Subscriptions
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Partner Subscriptions
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>
                  <li
                    className="nav-item"
                    style={{
                      backgroundColor: isActive6 ? "#2E3344" : "",
                      borderLeft: isActive6 ? "2px solid #35b0a7" : "",
                    }}
                  >
                    {(user && user?.role === "SuperAdmin") ||
                    user?.role === "subAdmin1" ||
                    user?.role === "subAdmin2" ? (
                      <span
                        className="nav-link"
                        onClick={() => {
                          setIsActive1(false);
                          setIsActive2(false);
                          setIsActive3(false);
                          setIsActive4(false);
                          setIsActive5(false);
                          setIsActive6(!isActive6);
                          setIsActive7(false);
                          setIsActive8(false);
                          setIsActive9(false);
                          setIsActive10(false);
                        }}
                      >
                        <AiOutlineDollarCircle
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />

                        <p className="span_text" style={{ color: "white" }}>
                          Payment
                          <i
                            className={`fas fa-angle-left right`}
                            style={{ rotate: isActive6 ? "-90deg" : "180deg" }}
                          />
                        </p>
                      </span>
                    ) : (
                      ""
                    )}

                    <ul
                      className={` custom-drop ${
                        isActive6 ? "custom-drop-show" : ""
                      }`}
                    >
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ||
                      user?.role === "subAdmin2" ? (
                        <Link to={"/dashboard/transaction"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Transaction</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Transaction
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                      {user && user?.role === "manager" ? (
                        <Link to={"/dashboard/transaction-m"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Transaction</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Transaction
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}

                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/extra-charge"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Extra Charge</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Extra Charge
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>
                  <li
                    className="nav-item"
                    style={{
                      backgroundColor: isActive7 ? "#2E3344" : "",
                      borderLeft: isActive7 ? "2px solid #35b0a7" : "",
                    }}
                  >
                    {(user && user?.role === "SuperAdmin") ||
                    user?.role === "subAdmin1" ? (
                      <span
                        className="nav-link"
                        onClick={() => {
                          setIsActive1(false);
                          setIsActive2(false);
                          setIsActive3(false);
                          setIsActive4(false);
                          setIsActive5(false);
                          setIsActive6(false);
                          setIsActive7(!isActive7);
                          setIsActive8(false);
                          setIsActive9(false);
                          setIsActive10(false);
                        }}
                      >
                        <FaRegHandPointRight
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />

                        <p className="span_text" style={{ color: "white" }}>
                          Room Facility
                          <i
                            className={`fas fa-angle-left right`}
                            style={{ rotate: isActive7 ? "-90deg" : "180deg" }}
                          />
                        </p>
                      </span>
                    ) : (
                      ""
                    )}

                    <ul
                      className={` custom-drop ${
                        isActive7 ? "custom-drop-show" : ""
                      }`}
                    >
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/add_facility"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Add Facility</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Add Facility
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}

                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/facility_list"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Facility List</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Facility List
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>
                  {/* for Super Admin */}
                  {/* {(user && user?.role === "SuperAdmin") ||
                user?.role === "admin" ||
                user?.role === "subAdmin1" ? (
                  <Link
                    to={"orders"}
                    style={{
                      backgroundColor:
                        location.pathname === "/orders" ? "#35b0a7" : "",
                      borderRadius: "10px",
                    }}
                  >
                    <li className="main_nav-link">
                      <div
                        className={` nav-link d-flex align-items-center ${
                          location.pathname === "/orders"
                            ? "active_route"
                            : "text-black"
                        }`}
                      >
                        <MdOutlineCallToAction
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />
                        <span className="span_text">Booking List</span>
                        <span
                          className="span_text_mobile"
                          data-widget="pushmenu"
                        >
                          Booking List
                        </span>
                      </div>
                    </li>
                  </Link>
                ) : (
                  ""
                )} */}
                  {/* for manager */}
                  {/* {user && user?.role === "manager" ? (
                  <Link
                    to={"/orders_m"}
                    style={{
                      backgroundColor:
                        location.pathname === "/orders_m" ? "#35b0a7" : "",
                      borderRadius: "10px",
                    }}
                  >
                    <li className="main_nav-link">
                      <div
                        className={` nav-link d-flex align-items-center ${
                          location.pathname === "/orders_m"
                            ? "active_route"
                            : "text-black"
                        }`}
                      >
                        <MdOutlineCallToAction
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />
                        <span className="span_text">Booking List</span>
                        <span
                          className="span_text_mobile"
                          data-widget="pushmenu"
                        >
                          Booking List
                        </span>
                      </div>
                    </li>
                  </Link>
                ) : (
                  ""
                )} */}

                  {(user && user?.role === "SuperAdmin") ||
                  user?.role === "admin" ||
                  user?.role === "subAdmin1" ? (
                    <Link
                      to={"/dashboard/visitingRequest"}
                      style={{
                        backgroundColor:
                          location.pathname === "/visitingRequest"
                            ? "#35b0a7"
                            : "",
                        borderRadius: "10px",
                      }}
                    >
                      <li className="main_nav-link">
                        <div
                          className={` nav-link d-flex align-items-center ${
                            location.pathname === "/visitingRequest"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <MdOutlineVisibility
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "white",
                              marginRight: "10px",
                            }}
                          />

                          <span className="span_text">
                            Room Visiting schedule
                          </span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Room Visiting schedule
                          </span>
                        </div>
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}

                  {(user && user?.role === "SuperAdmin") ||
                  user?.role === "admin" ||
                  user?.role === "subAdmin1" ? (
                    <Link
                      to={"/dashboard/issues"}
                      style={{
                        backgroundColor:
                          location.pathname === "/issues" ? "#35b0a7" : "",
                        borderRadius: "10px",
                      }}
                    >
                      <li className="main_nav-link">
                        <div
                          className={` nav-link d-flex align-items-center ${
                            location.pathname === "/issues"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <AiTwotoneWarning
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "white",
                              marginRight: "10px",
                            }}
                          />

                          <span className="span_text">Issue Report</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Issue Report
                          </span>
                        </div>
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}

                  {/* For Manager */}
                  {user && user?.role === "manager" ? (
                    <Link
                      to={"/dashboard/issues_m"}
                      style={{
                        backgroundColor:
                          location.pathname === "/issues_m" ? "#35b0a7" : "",
                        borderRadius: "10px",
                      }}
                    >
                      <li className="main_nav-link">
                        <div
                          className={` nav-link d-flex align-items-center ${
                            location.pathname === "/issues_m"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <AiTwotoneWarning
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "white",
                              marginRight: "10px",
                            }}
                          />

                          <span className="span_text">Issue Report</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Issue Report
                          </span>
                        </div>
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}

                  {(user && user?.role === "SuperAdmin") ||
                  user?.role === "admin" ||
                  user?.role === "subAdmin1" ? (
                    <Link
                      to={"/dashboard/contact-us"}
                      style={{
                        backgroundColor:
                          location.pathname === "/contact-us" ? "#35b0a7" : "",
                        borderRadius: "10px",
                      }}
                    >
                      <li className="main_nav-link">
                        <div
                          className={` nav-link d-flex align-items-center ${
                            location.pathname === "/contact-us"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <MdOutlineSms
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "white",
                              marginRight: "10px",
                            }}
                          />

                          <span className="span_text">Contact Us List</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Contact Us List
                          </span>
                        </div>
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}

                  <li
                    className="nav-item"
                    style={{
                      backgroundColor: isActive8 ? "#2E3344" : "",
                      borderLeft: isActive8 ? "2px solid #35b0a7" : "",
                    }}
                  >
                    {(user && user?.role === "SuperAdmin") ||
                    user?.role === "subAdmin1" ? (
                      <span
                        className="nav-link"
                        onClick={() => {
                          setIsActive1(false);
                          setIsActive2(false);
                          setIsActive3(false);
                          setIsActive4(false);
                          setIsActive5(false);
                          setIsActive6(false);
                          setIsActive7(false);
                          setIsActive8(!isActive8);
                          setIsActive9(false);
                          setIsActive10(false);
                        }}
                      >
                        <TbFileHorizontal
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />

                        <p className="span_text" style={{ color: "white" }}>
                          More
                          <i
                            className={`fas fa-angle-left right`}
                            style={{ rotate: isActive8 ? "-90deg" : "180deg" }}
                          />
                        </p>
                      </span>
                    ) : (
                      ""
                    )}

                    <ul
                      className={` custom-drop ${
                        isActive8 ? "custom-drop-show" : ""
                      }`}
                    >
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/review"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Reviews</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Reviews
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}

                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/user-manage"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">User List</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  User List
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/pages"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Policy Pages</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Policy Pages
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/lease-property"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  Lease Property
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Lease Property
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/finance"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  Franchises Request
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Franchises Request
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/corporate-housing"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  Corporate Housing
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Corporate Housing
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/study-space"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Study Space</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Study Space
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>

                  <li
                    className="nav-item"
                    style={{
                      backgroundColor: isActive9 ? "#2E3344" : "",
                      borderLeft: isActive9 ? "2px solid #35b0a7" : "",
                    }}
                  >
                    {(user && user?.role === "SuperAdmin") ||
                    user?.role === "subAdmin1" ? (
                      <span
                        className="nav-link"
                        onClick={() => {
                          setIsActive1(false);
                          setIsActive2(false);
                          setIsActive3(false);
                          setIsActive4(false);
                          setIsActive5(false);
                          setIsActive6(false);
                          setIsActive7(false);
                          setIsActive8(false);
                          setIsActive9(!isActive9);
                          setIsActive10(false);
                        }}
                      >
                        <PiFlagBanner
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />

                        <p className="span_text" style={{ color: "white" }}>
                          Website Cover
                          <i
                            className={`fas fa-angle-left right`}
                            style={{ rotate: isActive9 ? "-90deg" : "180deg" }}
                          />
                        </p>
                      </span>
                    ) : (
                      ""
                    )}

                    <ul
                      className={` custom-drop ${
                        isActive9 ? "custom-drop-show" : ""
                      }`}
                    >
                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/add_banner"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Add Cover</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Add Cover
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}

                      {(user && user?.role === "SuperAdmin") ||
                      user?.role === "admin" ||
                      user?.role === "subAdmin1" ? (
                        <Link to={"/dashboard/banner_list"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">List of Cover</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  List of Cover
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>

                  <li className="main_nav-link" onClick={handleLogOut}>
                    <div
                      className={` nav-link d-flex align-items-center ${
                        location.pathname === "/issues"
                          ? "active_route"
                          : "text-black"
                      }`}
                    >
                      <MdLogout
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "white",
                          marginRight: "10px",
                        }}
                      />

                      <span className="span_text"> Log Out</span>
                      <span className="span_text_mobile" data-widget="pushmenu">
                        Log Out
                      </span>
                    </div>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
