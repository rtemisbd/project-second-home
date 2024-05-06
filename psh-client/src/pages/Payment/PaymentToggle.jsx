import React, { useState } from "react";

import MobileBanking from "./MobileBanking";
import CashOn from "./CashOn";
import CreditCard from "./CreditCard";
import BankTransfer from "./BankTransfer";
import BookingReq from "./BookingReq";
import "./PaymentToggle.css";

const PaymentToggle = ({}) => {
  const [showMobile, setShowMobile] = useState(true);
  const [showPaymentArrive, setShowPaymentArrive] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showBookingReq, setShowBookingReq] = useState(false);

  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);

  let toggleClassCheck1 = isActive1 ? "active" : "";
  let toggleClassCheck2 = isActive2 ? "active" : "";
  let toggleClassCheck3 = isActive3 ? "active" : "";
  let toggleClassCheck4 = isActive4 ? "active" : "";
  let toggleClassCheck5 = isActive5 ? "active" : "";

  return (
    <div className="text-left">
      <button
        className={`summary text-lg font-bold ${toggleClassCheck1} `}
        onClick={() => {
          return (
            setShowMobile(true),
            setShowPaymentArrive(false),
            setShowCreditCard(false),
            setShowBankTransfer(false),
            setShowBookingReq(false),
            setIsActive1(true),
            setIsActive2(false),
            setIsActive3(false),
            setIsActive4(false),
            setIsActive5(false)
          );
        }}
        style={{
          border: "none",
        }}
      >
        MOBILE BANKING
      </button>
      <button
        className={`specification text-lg font-bold ${toggleClassCheck2}`}
        onClick={() => {
          return (
            setShowMobile(false),
            setShowPaymentArrive(true),
            setShowCreditCard(false),
            setShowBankTransfer(false),
            setShowBookingReq(false),
            setIsActive1(false),
            setIsActive2(true),
            setIsActive3(false),
            setIsActive4(false),
            setIsActive5(false)
          );
        }}
        style={{
          border: "none",
        }}
      >
        PAYMENT ON ARRIVE
      </button>
      <button
        className={`author text-lg font-bold ${toggleClassCheck3}`}
        onClick={() => {
          return (
            setShowMobile(false),
            setShowPaymentArrive(false),
            setShowCreditCard(true),
            setShowBankTransfer(false),
            setShowBookingReq(false),
            setIsActive1(false),
            setIsActive2(false),
            setIsActive3(true),
            setIsActive4(false),
            setIsActive5(false)
          );
        }}
        style={{
          border: "none",
        }}
      >
        CREDIT CARD
      </button>
      <button
        className={`customer-review text-lg font-bold ${toggleClassCheck4}`}
        onClick={() => {
          return (
            setShowMobile(false),
            setShowPaymentArrive(false),
            setShowCreditCard(false),
            setShowBankTransfer(true),
            setShowBookingReq(false),
            setIsActive1(false),
            setIsActive2(false),
            setIsActive3(false),
            setIsActive4(true),
            setIsActive5(false)
          );
        }}
        style={{
          border: "none",
        }}
      >
        BANK TRANSFER
      </button>
      {/* <button
        className={`customer-review text-lg font-bold ${toggleClassCheck5}`}
        onClick={() => {
          return (
            setShowMobile(false),
            setShowPaymentArrive(false),
            setShowCreditCard(false),
            setShowBankTransfer(false),
            setShowBookingReq(true),
            setIsActive1(false),
            setIsActive2(false),
            setIsActive3(false),
            setIsActive4(false),
            setIsActive5(true)
          );
        }}
        style={{
          border: "none",
        }}
      >
        BOOKING REQUEST
      </button> */}
      {showMobile ? <MobileBanking></MobileBanking> : null}
      {showPaymentArrive ? <CashOn></CashOn> : null}
      {showCreditCard ? <CreditCard></CreditCard> : null}
      {showBankTransfer ? <BankTransfer></BankTransfer> : null}
      {/* {showBookingReq ? <BookingReq></BookingReq> : null} */}
    </div>
  );
};

export default PaymentToggle;
