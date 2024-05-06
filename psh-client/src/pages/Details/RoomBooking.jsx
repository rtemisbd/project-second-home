import React, { useState } from "react";
import { Link } from "react-router-dom";

import brachLocationIcon from "../../assets/img/branchLocationIcon.png";
import promoIcon from "../../assets/img/coupon.png";

const BookingTotalBox = () => {
  const dmys = ["Daily", "Monthly", "Yearly"];
  const [dmyValue, setDmyValue] = useState(1);
  return (
    <div
      style={{
        width: "430px",
        height: "570px",
        boxShadow:
          "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) ",
        borderRadius: "3px",
      }}
    >
      <div
        style={{
          backgroundColor: "#35B0A7",
          width: "430px",
          height: "55px",
          borderRadius: "3px 3px 0px 0px",
        }}
      ></div>
      <div
        className="px-3 py-2 m-3"
        style={{ boxShadow: "0px 0px 5px 3px #CCC", borderRadius: "5px" }}
      >
        <h2 className="text-left font-bold" style={{ color: "#212A42" }}>
          Deluxe Contrast Room
        </h2>
        <div className="flex ">
          <div>
            <img src={brachLocationIcon} alt="" />
          </div>
          <p className="text-black">Dhanmondi 03</p>
        </div>
        <p
          className=" flex justify-start w-[60%]"
          style={{
            backgroundColor: "#FCA22A",
            color: "white",
            padding: "3px 5px ",
            borderRadius: "5px",
          }}
        >
          Shared Room (Female)
        </p>
      </div>

      <div className="mx-5">
        <div className="flex justify-evenly ">
          {dmys.map((data, index) => (
            <li className="list-none border py-1">
              <span
                onClick={() => setDmyValue(index)}
                className={` px-11 cursor-pointer py-2 ${
                  dmyValue === index ? "dmyActive " : "text-black"
                }`}
              >
                {data}
              </span>
            </li>
          ))}
        </div>
      </div>

      <div className="flex justify-evenly mt-3 total-area text-black">
        <div>
          <p className="text-left font-bold mb-1">Check-In</p>
          <input
            className="px-2 "
            type="text"
            style={{ width: "115px", height: "30px" }}
            value="08-05-23"
            disabled
          />
        </div>
        <div>
          <p className="text-left  font-bold mb-1">Check-Out</p>
          <input
            className="px-2"
            type="text"
            style={{ width: "115px", height: "30px" }}
            value="28-06-23"
            disabled
          />
        </div>
        <div>
          <p className="text-left font-bold mb-1">Total</p>
          <input
            className="px-2 "
            type="text"
            style={{ width: "115px", height: "30px" }}
            value="20 Days"
            disabled
          />
        </div>
      </div>

      <div className="flex m-5 total-area relative">
        <div>
          <input
            className="px-10 "
            type="text"
            style={{ width: "310px", height: "30px" }}
            placeholder="Pormo Code"
          />
          <div className="absolute top-2 left-3">
            <img src={promoIcon} alt="" />
          </div>
        </div>
        <div>
          <button
            style={{
              border: "1px solid #399",
              backgroundColor: "#35B0A7 ",
              color: "white",
              borderRadius: "0px 2px 2px 0px",
              padding: "2px 10px",
            }}
          >
            Confirm
          </button>
        </div>
      </div>

      <div className="text-black font-bold text-lg pr-5">
        <div className="flex justify-between ">
          <p className="ml-16">Sub-Total</p>
          <p>BDT 5000</p>
        </div>
        <div className="flex justify-between">
          <p className="ml-16">Promo Code</p>
          <p>-BDT 5000</p>
        </div>
        <hr className="mt-3 ml-5 text-black" />
        <div className="flex justify-between mt-2">
          <p className="ml-16">Total Amount</p>
          <p>BDT 5000</p>
        </div>
      </div>

      <div className="bg-[#35B0A7] h-[55px] flex justify-center items-center mt-16">
        <Link to="/personal-info">
          <div>
            <button
              className="text-xl p-2"
              style={{ background: "white", borderRadius: 8 }}
            >
              Apply For Booking
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BookingTotalBox;
