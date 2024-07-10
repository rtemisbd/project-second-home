import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './StatusCard.css';
import useFetch from '../../hooks/useFetch'; // Ensure correct import path
import { Form } from 'react-bootstrap'; // Import Form component from react-bootstrap

const StatusCard = () => {
  const { data3: rentReportRooms, loading, error, refetch } = useFetch("rent-rooms");

  const [availableRoomsCount, setAvailableRoomsCount] = useState(0);
  const [bookedRoomsCount, setBookedRoomsCount] = useState(0);
  const [reservedRoomsCount, setReservedRoomsCount] = useState(0);
  const [checkInRoomsCount, setCheckInRoomsCount] = useState(0);
  const [checkOutRoomsCount, setCheckOutRoomsCount] = useState(0);

  useEffect(() => {
    if (rentReportRooms && rentReportRooms.length > 0) {
      let availableCount = 0;
      let bookedCount = 0;
      let reservedCount = 0;
      let checkInCount = 0;
      let checkOutCount = 0;

      const today = new Date();

      rentReportRooms.forEach((room) => {
        const bookStartDate = new Date(room.bookStartDate);
        const bookEndDate = new Date(room.bookEndDate);

        if (room.bookingStatus === 'Booked') {
          bookedCount++;
        } else if (room.bookingStatus === 'Reserved') {
          reservedCount++;
        }

        if (today >= bookStartDate && today <= bookEndDate) {
          checkInCount++;
        } else if (today > bookEndDate) {
          checkOutCount++;
        } else {
          availableCount++;
        }
      });

      setAvailableRoomsCount(availableCount);
      setBookedRoomsCount(bookedCount);
      setReservedRoomsCount(reservedCount);
      setCheckInRoomsCount(checkInCount);
      setCheckOutRoomsCount(checkOutCount);
    }
  }, [rentReportRooms]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="summary-cards-container">
 <div className="radio-buttons">
          <Form.Check
            type="radio"
            label="Private Room"
            name="roomType"
            id="privateRoom"
            className="text-orange"
           
          />
          <Form.Check
            type="radio"
            label="Shared Room"
            name="roomType"
            id="sharedRoom"
            className="text-orange"
            
          />
        </div>  
           <div className="summary-card" style={{ backgroundColor: '#3498db' }}>
        <div className="icon">
          <i className="fa fa-bed"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Available</h4>
          <h5 className="text-white">{availableRoomsCount}</h5>
        </div>
      </div>

      <div className="summary-card" style={{ backgroundColor: '#1abc9c' }}>
        <div className="icon">
          <i className="fa fa-book"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Booked</h4>
          <h5 className="text-white">{rentReportRooms?.bookedRentRooms?.length}</h5>
        </div>
      </div>

      <div className="summary-card" style={{ backgroundColor: '#16a085' }}>
        <div className="icon">
          <i className="fa fa-sign-in-alt"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Check-in</h4>
          <h5 className="text-white">{checkInRoomsCount}</h5>
        </div>
      </div>

      <div className="summary-card" style={{ backgroundColor: '#e67e22' }}>
        <div className="icon">
          <i className="fa fa-sign-out-alt"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Check-out</h4>
          <h5 className="text-white">{checkOutRoomsCount}</h5>
        </div>
      </div>

      <div className="summary-card" style={{ backgroundColor: '#f39c12' }}>
        <div className="icon">
          <i className="fa fa-sign-out-alt"></i>
        </div>
        <div className="details">
          <h4 className="text-white">Reserved</h4>
          <h5 className="text-white">{rentReportRooms?.upcomingRentRooms?.length}</h5>
        </div>
      </div>
    </div>
  );
};

StatusCard.propTypes = {
  totalRooms: PropTypes.number.isRequired,
};

export default StatusCard;
