import React from "react";
import "./StatusCard.css";

const StatusCard = () => {
  return (
    <div className="summary-cards-container">
      <div className="radio-buttons">
        <input
          type="radio"
          name="roomType"
          id="privateRoom"
          className="text-orange"
        />
        <label htmlFor="">Privet Room</label>
        <input
          type="radio"
          label="Shared Room"
          name="roomType"
          id="sharedRoom"
          className="text-orange"
        />
        <label htmlFor="">Shared Room</label>
      </div>

      {/* <div className="summary-card" style={{ backgroundColor: "#3498db" }}>
        <div className="icon">
          <i className="fa fa-bed"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Available</h4>
          <h5 className="text-white">{100}</h5>
        </div>
      </div>

      <div className="summary-card" style={{ backgroundColor: "#1abc9c" }}>
        <div className="icon">
          <i className="fa fa-book"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Booked</h4>
          <h5 className="text-white">
            {200}
          </h5>
        </div>
      </div>

      <div className="summary-card" style={{ backgroundColor: "#16a085" }}>
        <div className="icon">
          <i className="fa fa-sign-in-alt"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Check-in</h4>
          <h5 className="text-white">{500}</h5>
        </div>
      </div>

      <div className="summary-card" style={{ backgroundColor: "#e67e22" }}>
        <div className="icon">
          <i className="fa fa-sign-out-alt"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Check-out</h4>
          <h5 className="text-white">{300}</h5>
        </div>
      </div>

      <div className="summary-card" style={{ backgroundColor: "#f39c12" }}>
        <div className="icon">
          <i className="fa fa-sign-out-alt"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Reserved</h4>
          <h5 className="text-white">
            {300}
          </h5>
        </div>
      </div> */}
    </div>
  );
};

export default StatusCard;
