import React from "react";

import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { PropagateLoader } from "react-spinners";

const LoadingState = ({ handleClose }) => {
  const isLoadingState = useSelector(
    (state) => state?.loadingModal?.isLoadingState
  );

  return (
    <Modal
      show={isLoadingState}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal"
    >
      <Modal.Body>
        <PropagateLoader size={13} speedMultiplier={0.8} color="#36d7b7" />{" "}
      </Modal.Body>
    </Modal>
  );
};

export default LoadingState;
