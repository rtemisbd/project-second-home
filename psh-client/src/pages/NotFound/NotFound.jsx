import React from "react";
import { Link } from "react-router-dom";

import Navmenu from "../../components/shared/NavMenu";
import Footer from "../../components/shared/Footer";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <Navmenu />
      <div className="flex justify-center items-center" style={{ height: 800 }}>
        <div>
          <div>
            <img
              src="/assets/img2/404 2.png"
              alt=""
              style={{ width: "100%" }}
            />
          </div>
          <div className="text-center">
            <h2 className="not_found_h2 py-3">Page Not Found</h2>
            <p className="not_found_p">
              We're sorry, the page you requested could not be found please go
              back to the homepage
            </p>
            <Link to={"/"}>
              <button className="back_btn mt-3">Back to Home</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
