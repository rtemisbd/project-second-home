import React from "react";
import { useState } from "react";

import cod from "../../assets/img/cod.png";

const CashOn = () => {
  const [showCashOn, setShowCashOn] = useState(true);
  const [isActive1, setIsActive1] = useState(true);
  let toggleClassCheck1 = isActive1 ? "active" : "";

  return (
    <div>
      <div className="">
        <div className="cash-on cash-on-delivery flex items-center">
          <div
            onClick={() => {
              return setShowCashOn(true), setIsActive1(true);
            }}
            className={`mb-3  ${toggleClassCheck1}`}
          >
            <input
              id="cash-on-delivery"
              style={{ height: "18px", width: "18px" }}
              className="radio-button2"
              defaultChecked
              type="radio"
              name="payment"
              value="cash"
            />
          </div>
          <label htmlFor="cash-on-delivery">
            <div className="ms-3 flex items-center">
              <div>
                <img src={cod} alt="" />
              </div>
              <div>
                <h5 className="ms-3 text-black text-sm">CASH</h5>
              </div>
            </div>
          </label>
        </div>
        {showCashOn ? (
          <div>
            <h5 className="text-[1rem]">Cash to be paid after Comming.</h5>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CashOn;
