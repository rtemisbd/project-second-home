import { Option, Select } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./MenuList.css";

const MenuList = () => {
  const [activeTab, setActiveTab] = useState("booking");
  const handleSelectChange = (value) => {
    setActiveTab(value);
  };
  return (
    <div className="py-2">
      <Select
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
          })
        }
      >
        <Link to="/personal-info/m-edit">
          <Option value="edit">Edit Profile</Option>
        </Link>
        <Link to="/personal-info/m-booking" className="my-1">
          <Option value="booking" className="my-1">
            Booking History
          </Option>
        </Link>
        <Link to="/personal-info/m-payment">
          <Option value="payment">Payment Details</Option>
        </Link>
        <Link to="/personal-info/m-wishlist">
          <Option value="Wishlist" className="my-1">
            Wishlist
          </Option>
        </Link>
        <Link to="/personal-info/m-list">
          <Option value="list">Issu Deatails</Option>
        </Link>
        <Link to="/personal-info/m-info">
          <Option value="info" className="mt-1">
            Personal Deatils
          </Option>
        </Link>
        <Link to="/personal-info/m-Security">
          <Option value="Security" className="my-1">
            Security
          </Option>
        </Link>
        <Link to="/personal-info/m-vouchers">
          <Option value="vouchers">My Vouchers</Option>
        </Link>
        <Link to="/personal-info/m-referral">
          <Option value="referral" className="my-1">
            Invite and Referral
          </Option>
        </Link>
        <Link to="/personal-info/m-community">
          <Option value="community">Community</Option>
        </Link>
      </Select>
    </div>
  );
};

export default MenuList;
