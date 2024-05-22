import React from "react";
import ReactModal from "react-modal";

import { PropagateLoader } from "react-spinners";

const LoadingState = ({ Loading }) => {
  return (
    <ReactModal
      style={{
        content: {
          top: "50%",
          left: "50%",
          // right: "auto",
          // bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -45%)",
          padding: 0,
          border: 0,
        },
      }}
      // className=" mt-48"
      ariaHideApp={false}
      isOpen={Loading}
    >
      <div
        className="flex justify-center items-center
      "
      >
        <p>
          <PropagateLoader size={13} speedMultiplier={0.8} color="#36d7b7" />{" "}
        </p>
      </div>
    </ReactModal>
  );
};

export default LoadingState;
