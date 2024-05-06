import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { BiSolidChevronDown } from "react-icons/bi";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import img3 from "../../../img/home/profile.png";
import pshLogo from "../../../img/home/psh-logo.png";
import { AuthContext } from "../../../contexts/UserProvider";
import "./Navbar.css";
import axios from "axios";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  // Get partner Subscriptions
  const [userUubscription, setUserSubscription] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.psh.com.bd/api/subscriptionOrder/${user?.email}`,
          {
            mode: "cors",
          }
        );
        setUserSubscription(
          data?.subscriptionHistory?.filter(
            (subscription) =>
              new Date(subscription?.packageEndDate) >= new Date() &&
              subscription?.acceptableStatus === "Accepted"
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user?.email]);

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

  const handleLogOut = () => {
    logoutUser();
    navigate("/signup");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (location.pathname === "/signup") {
    return null;
  }

  return (
    <div>
      <div className="wrapper admin_nav">
        <nav className="main-header navbar navbar-expand">
          {/* Left navbar links */}
          <div className="nav_design">
            <div className="mt-2" style={{ marginLeft: "80px" }}>
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
          {/* Right navbar links */}
        </nav>

        <aside
          className="main-sidebar  elevation-4 side_menubar "
          style={{
            position: "fixed",
          }}
        >
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="mt-2">
              <img src={pshLogo} style={{ width: "150px" }} alt="" />
            </div>

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
                user?.role === "partner" ||
                user?.role === "manager" ? (
                  <Link to={"/"}>
                    <li className="main_nav-link">
                      <div className=" nav-link text-black">
                        <span className="span_text">Home</span>
                        <span
                          className="span_text_mobile"
                          data-widget="pushmenu"
                        >
                          Home
                        </span>
                      </div>
                    </li>
                  </Link>
                ) : (
                  ""
                )}
                {/* {(user && user?.role === "user") || user?.role === "partner" ? (
                  <>
                    <Link to={"/order"}>
                      <li className="main_nav-link">
                        <span className="nav-link">
                          <div className="">
                            <span className="span_text">Bookings</span>
                          </div>
                        </span>
                      </li>
                    </Link>
                    <Link to={"/issue"}>
                      <li className="main_nav-link">
                        <span className="nav-link">
                          <div className="">
                            <span className="span_text">Issue</span>
                          </div>
                        </span>
                      </li>
                    </Link>
                  </>
                ) : (
                  ""
                )} */}

                <li
                  className="nav-item"
                  style={{
                    backgroundColor: isActive3 ? "#747474" : "",
                    borderLeft: isActive3 ? "5px solid #35b0a7" : "",
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
                      <p
                        className="span_text"
                        style={{ color: isActive3 ? "white" : "black" }}
                      >
                        Property
                        <i
                          className={`fas fa-angle-left right ${
                            isActive3 ? "d-none" : "d-block"
                          }`}
                          style={{ rotate: "180deg" }}
                        />
                        <span className="badge badge-info right">2</span>
                        <BiSolidChevronDown
                          style={{ width: "23px", height: "23px" }}
                          className={`down-arrow ${
                            isActive3 ? "d-block" : "d-none"
                          }`}
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
                    {(user && user?.role === "SuperAdmin") ||
                    user?.role === "manager" ||
                    user?.role === "partner" ||
                    user?.role === "subAdmin1" ? (
                      <>
                        <Link to={"/add_property"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">Add Property</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Add Property
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      </>
                    ) : (
                      ""
                    )}

                    {user && user?.role === "manager" ? (
                      <Link to={"/property_list_m"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">Property List</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                Property List
                              </span>
                            </div>
                          </span>
                        </li>
                      </Link>
                    ) : (
                      ""
                    )}
                    {user && user?.role === "partner" ? (
                      <Link to={"/property_list_p"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">Property List</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                Property List
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
                    user?.role === "manager" ||
                    user?.role === "partner" ? (
                      <Link to={"/property-report"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">Booking Reports</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                Booking Reports
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
                    backgroundColor: isActive4 ? "#747474" : "",
                    borderLeft: isActive4 ? "5px solid #35b0a7" : "",
                  }}
                >
                  {(user && user?.role === "SuperAdmin") ||
                  user?.role === "partner" ? (
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
                      <p
                        className="span_text"
                        style={{ color: isActive4 ? "white" : "black" }}
                      >
                        Subscription
                        <i
                          className={`fas fa-angle-left right ${
                            isActive4 ? "d-none" : "d-block"
                          }`}
                          style={{ rotate: "180deg" }}
                        />
                        <span className="badge badge-info right">2</span>
                        <BiSolidChevronDown
                          style={{ width: "23px", height: "23px" }}
                          className={`down-arrow ${
                            isActive4 ? "d-block" : "d-none"
                          }`}
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
                    user?.role === "manager" ||
                    user?.role === "partner" ||
                    user?.role === "subAdmin1" ? (
                      <>
                        <Link to={"/subscription"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              <div className="menu_flex">
                                <span className="span_text">
                                  Subscription Plan
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Subscription Plan
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                      </>
                    ) : (
                      ""
                    )}

                    {user && user?.role === "partner" ? (
                      <Link to={"/subscription-list"}>
                        <li className="main_nav-link">
                          <span className="nav-link">
                            <div className="menu_flex">
                              <span className="span_text">
                                Subscription History
                              </span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                Subscription History
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
                user?.role === "partner" ? (
                  <>
                    <li
                      className="nav-item"
                      style={{
                        backgroundColor: isActive5 ? "#747474" : "",
                        borderLeft: isActive5 ? "5px solid #35b0a7" : "",
                      }}
                    >
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
                        <p
                          className="span_text"
                          style={{ color: isActive5 ? "white" : "black" }}
                        >
                          Facility
                          <i
                            className={`fas fa-angle-left right ${
                              isActive5 ? "d-none" : "d-block"
                            }`}
                            style={{ rotate: "180deg" }}
                          />
                          <span className="badge badge-info right">4</span>
                          <BiSolidChevronDown
                            style={{ width: "23px", height: "23px" }}
                            className={`down-arrow ${
                              isActive5 ? "d-block" : "d-none"
                            }`}
                          />
                        </p>
                      </span>
                      <ul
                        className={` custom-drop ${
                          isActive5 ? "custom-drop-show" : ""
                        }`}
                      >
                        <Link to={"/add_facility"}>
                          <li className="main_nav-link nav-link">
                            {/* <i className="fa-sharp fa-solid fa-building-columns span_text2"></i> */}
                            <div className="menu_flex">
                              <span className="span_text">Add Facility</span>
                              <span
                                className="span_text_mobile"
                                data-widget="pushmenu"
                              >
                                Add Facility
                              </span>
                            </div>
                          </li>
                        </Link>

                        <Link to={"/facility_list"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              {/* <img style={{ width: 16 }} src={img6} alt="" /> */}
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
                        <Link to={"/add_commonfacility"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              {/* <i className="fa-sharp fa-solid fa-building-columns span_text2"></i> */}
                              <div className="menu_flex">
                                <span className="span_text">
                                  Add Regular Facility
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Add Regular Facility
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                        <Link to={"/commonfacility_list"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              {/* <img style={{ width: 16 }} src={img6} alt="" /> */}
                              <div className="menu_flex">
                                <span className="span_text">
                                  Regular Facility List
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Regular Facility List
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
                        backgroundColor: isActive7 ? "#747474" : "",
                        borderLeft: isActive7 ? "5px solid #35b0a7" : "",
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
                          setIsActive7(!isActive7);
                          setIsActive8(false);
                          setIsActive9(false);
                          setIsActive10(false);
                        }}
                      >
                        <p
                          className="span_text"
                          style={{ color: isActive7 ? "white" : "black" }}
                        >
                          Promo
                          <i
                            className={`fas fa-angle-left right ${
                              isActive7 ? "d-none" : "d-block"
                            }`}
                            style={{ rotate: "180deg" }}
                          />
                          <span className="badge badge-info right">2</span>
                          <BiSolidChevronDown
                            style={{ width: "23px", height: "23px" }}
                            className={`down-arrow ${
                              isActive7 ? "d-block" : "d-none"
                            }`}
                          />
                        </p>
                      </span>
                      <ul
                        className={` custom-drop ${
                          isActive7 ? "custom-drop-show" : ""
                        }`}
                      >
                        <Link to={"/add_promo"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              {/* <img style={{ width: 16 }} src={img7} alt="" /> */}
                              <div className="menu_flex">
                                <span className="span_text">Add Promo</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Add Promo
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                        <Link to={"/promo_list"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              {/* <i className="fa-solid fa-grip-lines span_text2"></i> */}
                              <div className="menu_flex">
                                <span className="span_text">Promo List</span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Promo List
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                        <Link to={"/adjustmen-list"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              {/* <i className="fa-solid fa-grip-lines span_text2"></i> */}
                              <div className="menu_flex">
                                <span className="span_text">
                                  Adjustmnet List
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Adjustment List
                                </span>
                              </div>
                            </span>
                          </li>
                        </Link>
                        <Link to={"/used-promo"}>
                          <li className="main_nav-link">
                            <span className="nav-link">
                              {/* <i className="fa-solid fa-grip-lines span_text2"></i> */}
                              <div className="menu_flex">
                                <span className="span_text">
                                  Used Promo-List
                                </span>
                                <span
                                  className="span_text_mobile"
                                  data-widget="pushmenu"
                                >
                                  Used Promo-List
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
                {/* {(user && user?.role === "SuperAdmin") ||
                user?.role === "partner" ||
                user?.role === "admin" ? (
                  <>
                    <Link
                      to={"/issues"}
                      style={{
                        backgroundColor:
                          location.pathname === "/issues" ? "#35b0a7" : "",
                        borderRadius: "10px",
                      }}
                    >
                      <li className="main_nav-link">
                        <div
                          className={` nav-link ${
                            location.pathname === "/issues"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <span className="span_text">Issues</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Issues
                          </span>
                        </div>
                      </li>
                    </Link>
                  </>
                ) : (
                  ""
                )} */}
                {/* 
                {(user && user?.role === "SuperAdmin") ||
                user?.role === "admin" ||
                user?.role === "subAdmin1" ? (
                  <Link
                    to={"/orders"}
                    style={{
                      backgroundColor:
                        location.pathname === "/orders" ? "#35b0a7" : "",
                      borderRadius: "10px",
                    }}
                  >
                    <li className="main_nav-link">
                      <div
                        className={` nav-link ${
                          location.pathname === "/orders"
                            ? "active_route"
                            : "text-black"
                        }`}
                      >
                        <span className="span_text">Bookings</span>
                        <span
                          className="span_text_mobile"
                          data-widget="pushmenu"
                        >
                          Bookings
                        </span>
                      </div>
                    </li>
                  </Link>
                ) : (
                  ""
                )} */}

                {(user && user?.role === "manager") ||
                user?.role === "partner" ? (
                  <>
                    <Link
                      to={"/issues_m"}
                      style={{
                        backgroundColor:
                          location.pathname === "/issues_m" ? "#35b0a7" : "",
                        borderRadius: "10px",
                      }}
                    >
                      <li className="main_nav-link">
                        <div
                          className={` nav-link ${
                            location.pathname === "/issues_m"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <span className="span_text">Issues</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Issues
                          </span>
                        </div>
                      </li>
                    </Link>
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
                          className={` nav-link ${
                            location.pathname === "/orders_m"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <span className="span_text">Bookings</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Bookings
                          </span>
                        </div>
                      </li>
                    </Link>
                    <Link
                      to={"/transaction-m"}
                      style={{
                        backgroundColor:
                          location.pathname === "/transaction-m"
                            ? "#35b0a7"
                            : "",
                        borderRadius: "10px",
                      }}
                    >
                      <li className="main_nav-link ">
                        <div
                          className={` nav-link ${
                            location.pathname === "/transaction-m"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <span className="span_text">Transaction</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Transaction
                          </span>
                        </div>
                      </li>
                    </Link>
                  </>
                ) : (
                  ""
                )}

                {(user && user?.role === "SuperAdmin") ||
                user?.role === "partner" ||
                user?.role === "admin" ? (
                  <>
                    <Link
                      to={"/visitingRequest"}
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
                          className={` nav-link ${
                            location.pathname === "/visitingRequest"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <span className="span_text"> Visiting Room</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Visiting Room
                          </span>
                        </div>
                      </li>
                    </Link>
                  </>
                ) : (
                  ""
                )}

                {user?.role === "manager" ? (
                  <Link
                    to={"/visitingRequest"}
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
                        className={` nav-link ${
                          location.pathname === "/visitingRequest"
                            ? "active_route"
                            : "text-black"
                        }`}
                      >
                        <span className="span_text"> Visiting Room</span>
                        <span
                          className="span_text_mobile"
                          data-widget="pushmenu"
                        >
                          Visiting Room
                        </span>
                      </div>
                    </li>
                  </Link>
                ) : (
                  ""
                )}
                {userUubscription?.length > 0 ? (
                  <>
                    <Link
                      to={"/featured"}
                      style={{
                        backgroundColor:
                          location.pathname === "/featured" ? "#35b0a7" : "",
                        borderRadius: "10px",
                      }}
                    >
                      <li className="main_nav-link">
                        <div
                          className={` nav-link ${
                            location.pathname === "/featured"
                              ? "active_route"
                              : "text-black"
                          }`}
                        >
                          <span className="span_text">Features</span>
                          <span
                            className="span_text_mobile"
                            data-widget="pushmenu"
                          >
                            Features
                          </span>
                        </div>
                      </li>
                    </Link>
                  </>
                ) : (
                  ""
                )}

                <li className="main_nav-link password_sm">
                  <div className=" nav-link" onClick={handleLogOut}>
                    <span className="span_text">Log Out</span>
                    <span className="span_text_mobile" data-widget="pushmenu">
                      Log Out
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
