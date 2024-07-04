export const isAlreadyBookings = (startDate, endDate, bookings) => {
  const inputStart = new Date(startDate);
  const inputEnd = new Date(endDate);

  for (const booking of bookings) {
    const bookingStart = new Date(booking.bookStartDate);
    const bookingEnd = new Date(booking.bookEndDate);

    if (
      (inputStart >= bookingStart && inputStart <= bookingEnd) ||
      (inputEnd >= bookingStart && inputEnd <= bookingEnd) ||
      (inputStart <= bookingStart && inputEnd >= bookingEnd)
    ) {
      return true;
    }
  }

  return false;
};
