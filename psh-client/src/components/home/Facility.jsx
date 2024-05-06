import React from "react";

import healthyMealIcon from "../../assets/img/healthy-meal.png";
import security24 from "../../assets/img/security-24.svg";
import "./Facility.css";

const Facility = () => {
  return (
    <div style={{ background: "rgba(245, 245, 245, 1)" }} className="py-[20px]">
      <div className="custom-container">
        <div className=" md:px-0 sm:px-6 ">
          <div className=" lg:py-2">
            <div className=" md:space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src="/images/Icon.png" className="facility_img" />
                  </div>
                  <div className="facility">
                    <h2 className="facility_h2">Enjoy free Wi-Fi</h2>
                    <p>
                      Enjoy complimentary high-speed internet access throughout
                      the premises
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src={healthyMealIcon} className="facility_img" />
                  </div>
                  <div className="facility">
                    <h2 className="facility_h2">Healthy Meal</h2>
                    <p>
                      Provide nutritious and well-balanced meal choices prepared
                      with fresh ingredients.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src={security24} className="facility_img" />
                  </div>
                  <div className="facility">
                    <h2 className="facility_h2">24/7 Security</h2>
                    <p>
                      Rest assured with round-the-clock security mea sures to
                      ensure a safe and secure environment.
                    </p>
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

export default Facility;
