import React, { useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import "./SubscriptionOrder.css";

import bkash from "../../img/home/bkash.png";
import nagad from "../../img/home/Nagad-Logo.png";
import dutch from "../../img/home/dutch-logo.png";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../contexts/UserProvider";
import useUserSubscription from "../../hooks/useUserSubscription";

const SubscriptionOrder = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const [userSubscription, refetch] = useUserSubscription();
  const location = useLocation();
  const subscriptionData = location.state;

  const [showCashOn, setShowCashOn] = useState(true);
  const [showBkash, setShowBkash] = useState(false);
  const [showNagad, setShowNagad] = useState(false);
  const [showDucth, setShowDutch] = useState(false);

  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);

  let toggleClassCheck1 = isActive1 ? "active" : "";
  let toggleClassCheck2 = isActive2 ? "active" : "";
  let toggleClassCheck3 = isActive3 ? "active" : "";
  let toggleClassCheck4 = isActive4 ? "active" : "";

  const navigate = useNavigate();

  const packageEndDate = new Date();
  packageEndDate.setMonth(
    packageEndDate.getMonth() + Number(subscriptionData?.packageDuration)
  );

  const AllOrder = async (e) => {
    e.preventDefault();

    const paymentType = e.target?.payment?.value;
    const bkashNumber = e.target?.bkashNumber?.value;
    const bkashTrx = e.target?.bkashTrx?.value;
    const nagadNumber = e.target?.nagadNumber?.value;
    const nagadTrx = e.target?.nagadTrx?.value;
    const dutchNumber = e.target?.dutchNumber?.value;
    const dutchTrx = e.target?.dutchTrx?.value;

    const orderData = {
      name: user?.firstName,
      userEmail: user?.email,
      userId: user?._id,
      branch: user?.branch?._id,
      paymentDate: new Date(),
      totalAmount: subscriptionData?.packagePrice,
      totalReceiveTk: subscriptionData?.packagePrice,
      paymentType: paymentType,
      paymentNumber: bkashNumber
        ? bkashNumber
        : "" || nagadNumber
        ? nagadNumber
        : "" || dutchNumber
        ? dutchNumber
        : "",
      transactionId: bkashTrx
        ? bkashTrx
        : "" || nagadTrx
        ? nagadTrx
        : "" || dutchTrx
        ? dutchTrx
        : "",
      userPhone: user?.phone,
      userAddress: user?.userAddress,
      paymentStatus: "Unpaid",
      acceptableStatus: "Pending",
      packageName: subscriptionData?.packageName,
      packageId: subscriptionData?._id,
      packageDuration: subscriptionData?.packageDuration,
      packagePrice: subscriptionData?.packagePrice,
      addedTotalRoom: subscriptionData?.addedTotalRoom,
      totalFeaturedRoom: subscriptionData?.totalFeaturedRoom,
      packageBuyDate: new Date(),
      packageEndDate: packageEndDate,
      //   bkashNumber: bkashNumber,
      //   bkashTrx: bkashTrx,
      //   nagadNumber: nagadNumber,
      //   nagadTrx: nagadTrx,
    };

    try {
      await axios.post(
        "https://api.psh.com.bd/api/subscriptionOrder",
        orderData
      );

      toast.success("Succefully Purchased");

      navigate("/subscription-list");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="custom-container mt-3 subscripiton_order"
      style={{
        padding: "0 12px",
        paddingRight: "8px",
      }}
    >
      <div className=" row view-cart-content ">
        <div className="col-lg-8 p-4 card-area">
          <form onSubmit={AllOrder}>
            <div className="">
              <div>
                <h3>Personal Information :</h3>
                <div className="row mt-3">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      required
                      id="name"
                      defaultValue={user?.firstName}
                      name="name"
                      placeholder="Your Name"
                      disabled
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      required
                      id="email"
                      defaultValue={user?.email}
                      name="email"
                      placeholder="Your Email"
                      disabled
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="phone">Phone No</label>
                    <input
                      type="text"
                      required
                      id="phone"
                      name="phone"
                      placeholder="Phone Number"
                      defaultValue={user?.phone}
                      disabled
                    />
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <p>
                      <label htmlFor="address">Address</label>
                    </p>
                    <textarea
                      id="address"
                      required
                      name="address"
                      className="rounded ps-2"
                      rows="4"
                      cols="87"
                      defaultValue={user?.userAddress}
                      disabled
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <h3>Payment Method</h3>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="bkash mobile-payment d-flex align-items-center">
                  <div
                    onClick={() => {
                      return (
                        setShowCashOn(false),
                        setShowBkash(true),
                        setShowNagad(false),
                        setShowDutch(false),
                        setIsActive1(false),
                        setIsActive2(true),
                        setIsActive3(false),
                        setIsActive4(false)
                      );
                    }}
                    className={`mb-4 ${toggleClassCheck2}`}
                  >
                    <input
                      id="bkash"
                      style={{ height: "25px", width: "25px" }}
                      className="radio-button"
                      type="radio"
                      name="payment"
                      value="bkash"
                    />
                  </div>
                  <label htmlFor="bkash" className="ms-3">
                    <div>
                      <img src={bkash} alt="" />
                    </div>
                  </label>
                </div>
                {showBkash ? (
                  <div>
                    <p>
                      দয়া করে প্রথমে পেমেন্ট সম্পন্ন করে নিচের ফরমটি পূরণ করুন
                    </p>
                    <p>
                      নিচের বিকাশ পারসোনাল নাম্বারে টোটাল চার্জ (খরচ সহ) সেন্ড
                      মানি করুণ। এরপর যে বিকাশ নাম্বার থেকে ট্রানজেকশনটি করা
                      হয়েছে সেটি ও ট্রানজেকশন নাম্বার/আইডিটি নিচের ঘরে সংযুক্ত
                      করুন।
                    </p>
                    <p>bKash Personal Number : 01622738449</p>
                    <div className="d-flex align-items-center">
                      <div>
                        <p>Subscription Amount:</p>
                      </div>
                      <div className="">
                        <input
                          className=" ms-2 bkash-info-input "
                          name="receivedTk"
                          required
                          type="text"
                          placeholder="Sending Amount"
                          defaultValue={subscriptionData?.packagePrice}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p>Bkash Number :</p>
                      </div>
                      <div>
                        <input
                          className="ms-5 bkash-info-input"
                          name="bkashNumber"
                          required
                          type="text"
                          placeholder="017xxxxxxxxxxx"
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p>bKash Tranx ID :</p>
                      </div>
                      <div>
                        <input
                          className="ms-5 mt-1 bkash-info-input"
                          name="bkashTrx"
                          required
                          type="text"
                          placeholder="8N6MM9REN"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="nagad mobile-payment d-flex align-items-center">
                  <div
                    onClick={() => {
                      return (
                        setShowCashOn(false),
                        setShowBkash(false),
                        setShowNagad(true),
                        setShowDutch(false),
                        setIsActive1(false),
                        setIsActive2(false),
                        setIsActive3(true),
                        setIsActive4(false)
                      );
                    }}
                    className={`mb-4 ${toggleClassCheck3}`}
                  >
                    <input
                      id="nagad"
                      style={{ height: "25px", width: "25px" }}
                      className="radio-button"
                      type="radio"
                      name="payment"
                      value="nagad"
                    />
                  </div>
                  <label htmlFor="nagad" className="ms-3">
                    <div>
                      <img src={nagad} alt="" />
                    </div>
                  </label>
                </div>
                {showNagad ? (
                  <div>
                    <p>
                      দয়া করে প্রথমে পেমেন্ট সম্পন্ন করে নিচের ফরম পূরণ পূর্বক
                      আপনার অর্ডার প্লেস করুন।
                    </p>
                    <p>
                      নিচের নগদ পারসোনাল নাম্বারে টোটাল চার্জ (খরচ সহ) সেন্ড
                      মানি করুণ। এরপর যে নগদ নাম্বার থেকে ট্রানজেকশনটি করা হয়েছে
                      সেটি ও ট্রানজেকশন নাম্বার/আইডিটি নিচের ঘরে সংযুক্ত করুন।
                    </p>
                    <p>Nagad Personal Number : 01622738449</p>
                    <div className="d-flex align-items-center">
                      <div>
                        <p>Subscription Amount:</p>
                      </div>
                      <div className="">
                        <input
                          className=" ms-2 bkash-info-input "
                          name="receivedTk"
                          required
                          type="text"
                          placeholder="Sending Amount"
                          defaultValue={subscriptionData?.packagePrice}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p>Nagad Number :</p>
                      </div>
                      <div>
                        <input
                          className="ms-5 bkash-info-input"
                          name="nagadNumber"
                          required
                          type="text"
                          placeholder="017xxxxxxxxxxx"
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p>Nagad Tranx ID :</p>
                      </div>
                      <div>
                        <input
                          className="ms-5 mt-1 bkash-info-input"
                          name="nagadTrx"
                          required
                          type="text"
                          placeholder="8N6MM9REN"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="nagad mobile-payment d-flex align-items-center">
                  <div
                    onClick={() => {
                      return (
                        setShowCashOn(false),
                        setShowBkash(false),
                        setShowNagad(false),
                        setShowDutch(true),
                        setIsActive1(false),
                        setIsActive2(false),
                        setIsActive3(false),
                        setIsActive4(true)
                      );
                    }}
                    className={`mb-4 ${toggleClassCheck4}`}
                  >
                    <input
                      id="dutch"
                      style={{ height: "25px", width: "25px" }}
                      className="radio-button"
                      type="radio"
                      name="payment"
                      value="dutch"
                    />
                  </div>
                  <label htmlFor="dutch" className="ms-3">
                    <div>
                      <img src={dutch} alt="" />
                    </div>
                  </label>
                </div>
                {showDucth ? (
                  <div>
                    <p>
                      দয়া করে প্রথমে পেমেন্ট সম্পন্ন করে নিচের ফরম পূরণ পূর্বক
                      আপনার অর্ডার প্লেস করুন।
                    </p>
                    <p>
                      নিচের নগদ পারসোনাল নাম্বারে টোটাল চার্জ (খরচ সহ) সেন্ড
                      মানি করুণ। এরপর যে নগদ নাম্বার থেকে ট্রানজেকশনটি করা হয়েছে
                      সেটি ও ট্রানজেকশন নাম্বার/আইডিটি নিচের ঘরে সংযুক্ত করুন।
                    </p>
                    <p>Ducth-Bangla Personal Number : 01622738449</p>
                    <div className="d-flex align-items-center">
                      <div>
                        <p>Subscription Amount:</p>
                      </div>
                      <div className="">
                        <input
                          className=" ms-2 bkash-info-input "
                          name="receivedTk"
                          required
                          type="text"
                          placeholder="Sending Amount"
                          defaultValue={subscriptionData?.packagePrice}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p>Dutch Bangla Number :</p>
                      </div>
                      <div>
                        <input
                          className="ms-3 bkash-info-input"
                          name="dutchNumber"
                          required
                          type="text"
                          placeholder="017xxxxxxxxxxx"
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p>Ducth-Bangla Tranx ID :</p>
                      </div>
                      <div>
                        <input
                          className="ms-3 mt-1 bkash-info-input"
                          name="dutchTrx"
                          required
                          type="text"
                          placeholder="8N6MM9REN"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="text-center checkout-button mt-3 rounded">
              <input
                className="order-button text-white fw-bold"
                type="submit"
                value="Buy Subscription"
              />
            </div>
          </form>
        </div>
      </div>

      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default SubscriptionOrder;
