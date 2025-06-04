import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/UserProvider";
import "./Navbar.css";
import { RiUserAddLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import villaIcon from "../../../img/home/villa.png";

const ResortSidebar = () => {
  const { logoutUser, user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownId, setDropdownId] = useState("");
  const [active, setActive] = useState(false);

  const handleLogOut = () => {
    logoutUser();
    navigate("/login");
  };

  if (location.pathname === "/login") {
    return null;
  }

  const handleDropdown = (id) => {
    if (dropdownId === id) {
      setDropdownId("");
      setActive(false);
    } else {
      setDropdownId(id);
      setActive(true);
    }
  };

  return (
    <nav className="mt-2" style={{ width: "1000px" }}>
      <ul
        className="nav nav-pills nav-sidebar flex-column "
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        {/* <li className="navbar_bar bar_menu_sm">
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
        </li> */}

        {/* dashboard */}
        <li className="main_nav-link" onClick={() => setActive(false)}>
          <Link
            to={"/dashboard"}
            className=" nav-link text-black  d-flex align-items-center"
          >
            <MdDashboard
              style={{
                width: "24px",
                height: "24px",
                color: "white",
                marginRight: "10px",
              }}
            />
            <span className="span_text">Dashboard</span>
            <span className="span_text_mobile" data-widget="pushmenu">
              Dashboard
            </span>
          </Link>
        </li>
        {/* Booking List */}
        <li className="main_nav-link" onClick={() => setActive(false)}>
          <Link
            to={"/dashboard/resort/booking-list"}
            className=" nav-link text-black  d-flex align-items-center"
          >
            <FaList
              style={{
                width: "24px",
                height: "24px",
                color: "white",
                marginRight: "10px",
              }}
            />
            <span className="span_text"> Booking List</span>
            <span className="span_text_mobile" data-widget="pushmenu">
              Booking List
            </span>
          </Link>
        </li>

        {/* Payment */}

        <li
          className="nav-item"
          style={{
            backgroundColor:
              active && dropdownId === "payment" ? "#2E3344" : "",
            borderLeft:
              active && dropdownId === "payment" ? "2px solid #35b0a7" : "",
          }}
        >
          <span
            className="nav-link"
            id="payment"
            onClick={() => handleDropdown("payment")}
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
                style={{
                  rotate:
                    active && dropdownId === "payment" ? "-90deg" : "180deg",
                }}
              />
            </p>
          </span>

          <ul
            className={` custom-drop ${
              active && dropdownId === "payment" ? "custom-drop-show" : ""
            }`}
          >
            <li className="main_nav-link">
              <Link
                to={"/dashboard/resort/transaction"}
                className="nav-link menu_flex"
              >
                <span className="span_text">Transaction</span>
                <span className="span_text_mobile" data-widget="pushmenu">
                  Transaction
                </span>
              </Link>
            </li>

            <li className="main_nav-link">
              <Link
                to={"/dashboard/extra-charge"}
                className="nav-link menu_flex"
              >
                <span className="span_text">Extra Charge</span>
                <span className="span_text_mobile" data-widget="pushmenu">
                  Extra Charge
                </span>
              </Link>
            </li>
          </ul>
        </li>

        {/* adjusment */}
        <li className="main_nav-link" onClick={() => setActive(false)}>
          <Link
            to={"/adjustment"}
            className=" nav-link text-black  d-flex align-items-center"
          >
            <CiDiscount1
              style={{
                width: "24px",
                height: "24px",
                color: "white",
                marginRight: "10px",
              }}
            />
            <span className="span_text">Adjustment</span>
            <span className="span_text_mobile" data-widget="pushmenu">
              Adjustment
            </span>
          </Link>
        </li>

        {/* booking overview */}
        <li className="main_nav-link" onClick={() => setActive(false)}>
          <Link
            to={"/dashboard/booking-overview"}
            className=" nav-link text-black  d-flex align-items-center"
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
            <span className="span_text_mobile" data-widget="pushmenu">
              Booking Overview
            </span>
          </Link>
        </li>

        {/*  Manage Administration */}
        <li
          className={`nav-item `}
          style={{
            backgroundColor:
              active && dropdownId === "administration" ? "#2E3344" : "",
          }}
        >
          <span
            className="nav-link "
            id="administration"
            onClick={() => handleDropdown("administration")}
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
              Administration
              <i
                className={`fas fa-angle-left right`}
                style={{
                  rotate:
                    active && dropdownId === "administration"
                      ? "-90deg"
                      : "180deg",
                }}
              />
            </p>
          </span>
          {active && dropdownId === "administration" && (
            <ul
              className={` custom-drop ${
                active && dropdownId === "administration"
                  ? "custom-drop-show"
                  : ""
              }`}
            >
              <li className="main_nav-link">
                <Link
                  to={"/dashboard/extra-charge"}
                  className="nav-link menu_flex"
                >
                  <span className="span_text">Add Management</span>
                  <span className="span_text_mobile" data-widget="pushmenu">
                    Add Management
                  </span>
                </Link>
              </li>
              <li className="main_nav-link">
                <Link
                  to={"/dashboard/transaction"}
                  className="nav-link menu_flex"
                >
                  <span className="span_text">Management List</span>
                  <span className="span_text_mobile" data-widget="pushmenu">
                    Management List
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* villa */}
        <li
          className="nav-item"
          style={{
            backgroundColor: active && dropdownId === "villa" ? "#2E3344" : "",
            borderLeft:
              active && dropdownId === "villa" ? "2px solid #35b0a7" : "",
          }}
        >
          <span
            className="nav-link"
            id="villa"
            onClick={() => handleDropdown("villa")}
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
              Villa
              <i
                className={`fas fa-angle-left right`}
                style={{
                  rotate:
                    active && dropdownId === "villa" ? "-90deg" : "180deg",
                }}
              />
            </p>
          </span>

          <ul
            className={` custom-drop ${
              active && dropdownId === "villa" ? "custom-drop-show" : ""
            }`}
          >
            <Link to={"/dashboard/resort/add-villa"}>
              <li className="main_nav-link">
                <span className="nav-link">
                  <div className="menu_flex">
                    <span className="span_text">Add Villa</span>
                    <span className="span_text_mobile" data-widget="pushmenu">
                      Add Villa
                    </span>
                  </div>
                </span>
              </li>
            </Link>
            <Link to={"/dashboard/resort/villa-list"}>
              <li className="main_nav-link">
                <span className="nav-link">
                  <div className="menu_flex">
                    <span className="span_text">List of Villa</span>
                    <span className="span_text_mobile" data-widget="pushmenu">
                      List of Villa
                    </span>
                  </div>
                </span>
              </li>
            </Link>
          </ul>
        </li>

        {/* my resort */}
        <li
          className="nav-item"
          style={{
            backgroundColor: active && dropdownId === "resort" ? "#2E3344" : "",
            borderLeft:
              active && dropdownId === "resort" ? "2px solid #35b0a7" : "",
          }}
        >
          <span
            className="nav-link"
            id="resort"
            onClick={() => handleDropdown("resort")}
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
              My Resort
              <i
                className={`fas fa-angle-left right`}
                style={{
                  rotate:
                    active && dropdownId === "resort" ? "-90deg" : "180deg",
                }}
              />
            </p>
          </span>

          <ul
            className={` custom-drop ${
              active && dropdownId === "resort" ? "custom-drop-show" : ""
            }`}
          >
            <Link to={"/dashboard/resort/add-resort"}>
              <li className="main_nav-link">
                <span className="nav-link">
                  <div className="menu_flex">
                    <span className="span_text"> Add Resort</span>
                    <span className="span_text_mobile" data-widget="pushmenu">
                      Add Resort
                    </span>
                  </div>
                </span>
              </li>
            </Link>
            <Link to={"/dashboard/resort/overview"}>
              <li className="main_nav-link">
                <span className="nav-link">
                  <div className="menu_flex">
                    <span className="span_text"> Resort Overview</span>
                    <span className="span_text_mobile" data-widget="pushmenu">
                      Resort Overview
                    </span>
                  </div>
                </span>
              </li>
            </Link>
            <Link to={"/dashboard/resort-list"}>
              <li className="main_nav-link">
                <span className="nav-link">
                  <div className="menu_flex">
                    <span className="span_text">Resort Account</span>
                    <span className="span_text_mobile" data-widget="pushmenu">
                      Resort Account
                    </span>
                  </div>
                </span>
              </li>
            </Link>
          </ul>
        </li>

        <li className="main_nav-link" onClick={handleLogOut}>
          <div
            className={` nav-link d-flex align-items-center ${
              location.pathname === "/issues" ? "active_route" : "text-black"
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
  );
};

export default ResortSidebar;
