import React, { useRef } from "react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import { AiOutlineClose } from "react-icons/ai";

import "./DetailsModal.css";

const DetailsModal = ({ size, handleOpen, data }) => {
  const mainOptions = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    height: "27.8125rem",
  };

  const style = {
    width: "100%",
    height: "100%",
    // objectFit: "cover",
  };

  const btn_img = {
    width: "200px",
    height: "80px",
    // overflow: "hidden",
    listStyle: "none",
    // margin: "0 0.2rem",
    cursor: "pointer",
    marginTop: "10px",
  };

  const thumbnailsstyle = {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    listStyle: "none",
  };

  const mainRef = useRef(null);

  const handleThumbs = (id) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
  };
  return (
    <div>
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogBody>
          <Splide options={mainOptions} ref={mainRef}>
            {data.photos &&
              data.photos.map((photo) => (
                <SplideSlide key={photo}>
                  <img src={photo} alt="" style={style} />
                </SplideSlide>
              ))}
          </Splide>
          <ul style={thumbnailsstyle} className="gap-x-5">
            {data.photos &&
              data.photos.map((photo, index) => (
                <li key={photo}>
                  <button onClick={() => handleThumbs(index)}>
                    <img src={photo} alt="thumbnail" style={btn_img} />
                  </button>
                </li>
              ))}
          </ul>
        </DialogBody>

        <DialogFooter className="p-0">
          <div
            onClick={() => handleOpen(null)}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <span>
              <AiOutlineClose style={{ width: "30px", height: "30px" }} />
            </span>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DetailsModal;
