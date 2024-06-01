import React from "react";
import errorImg from "../../img/error/error.jpg";
const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img
        style={{
          width: "100vw",
          height: "100vh",
        }}
        src={errorImg}
        alt="Not Found"
      />
    </div>
  );
};

export default NotFound;
