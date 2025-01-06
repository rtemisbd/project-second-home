import React from "react";
import { Modal } from "react-bootstrap";

const DetailOverview = ({ detail, setShowDetailModal, handleShowDetails }) => {
  return (
    <Modal show={handleShowDetails} onHide={() => setShowDetailModal(false)}>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#35B0A7",
          height: "55px",
          borderRadius: "3px 3px 0px 0px",
        }}
      >
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            width: "470px",
            borderRadius: "3px",
            backgroundColor: "white",
          }}
        >
          <div
            className="px-3 py-2 m-3"
            style={{
              boxShadow: "0px 0px 5px 3px #CCC",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyItems: "end",
                gap: "4px",
              }}
            >
              <h4 className="text-left " style={{ color: "#212A42" }}>
                {detail?.categoryDetails?.name === "Shared Room"
                  ? detail?.property?.name
                  : detail?.name}{" "}
                - {detail?.roomNumber}
              </h4>
              {detail?.categoryDetails?.name === "Shared Room" && (
                <span style={{ marginTop: "4px" }}>
                  [Seat : {detail?.seatNumber}]
                </span>
              )}
            </div>
            <p
              className=" d-flex justify-content-start "
              style={{
                backgroundColor: "#FCA22A",
                color: "white",
                padding: "3px 5px ",
                borderRadius: "5px",
              }}
            >
              {detail?.categoryDetails?.name}-[
              {detail?.branchDetails?.name}]
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailOverview;
