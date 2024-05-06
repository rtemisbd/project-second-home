import React, { useEffect, useState } from "react";

// import ceoImg from "../../assets/img/CEO-Welcome.jpg";
import "./PopUp.css";
import ReactModal from "react-modal";
import { PropagateLoader } from "react-spinners";
import { CardBody } from "@material-tailwind/react";

const PopUp = () => {
  const [load, setLoad] = useState(false);
  const [hide, sethide] = useState(true);
  useEffect(() => {
    setLoad(true);
  }, []);
  return (
    <div>
      <ReactModal
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -45%)",
            padding: 0,
            border: 0,
          },
        }}
        // className=" mt-48"
        ariaHideApp={false}
        isOpen={load}
      >
        <div>
          <CardBody className=" border-[4px] border-[#00bbb4] mx-auto md:w-[500px] sm:w-full   rounded-lg">
            <div
              className="flex justify-end text-3xl text-black"
              onClick={() => setLoad(false)}
            >
              <i className="fa-solid fa-circle-xmark cursor-pointer"></i>
            </div>

            <div className="pop_data mt-5">
              <h2
                style={{
                  color: "red",
                }}
              >
                {" "}
                📢 Attention Guests{" "}
              </h2>
              <p
                className="mt-3"
                style={{
                  color: "#00bbb4",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                }}
              >
                All branches are fully Reserved for coming 7 days. No new
                booking is accepted. Thank you for your kind understanding!
              </p>
            </div>
          </CardBody>
        </div>
      </ReactModal>

      {/* {load === false && (
        <div id="pop" className={hide === true ? "pop_Up" : "hidden"}>
          <div className="contain">
            <button
              id="close"
              onClick={() => {
                setLoad(true);
                sethide(false);
              }}
              className="pop-up-close"
            >
              &times;
            </button>
            <div className="pop_img mt-20">
      
              <h2
                style={{
                  color: "#00bbb4",
                }}
              >
                {" "}
                📢 Attention Guests:{" "}
              </h2>
              <p
                className="mt-3"
                style={{
                  color: "#00bbb4",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                }}
              >
                All branches are fully Reserved for coming 7 days. No new
                booking is accepted. Thank you for your kind understanding!
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PopUp;
