export function bookingMail(result) {
  const objectIdString = result?._id ? result?._id.toString() : "";
  const slicedObjectId = objectIdString.slice(19);

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Project Second Home</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333333;
          }
  
          .container {
              width: 80%;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #0066cc;
          }
  
          p {
              margin-bottom: 15px;
          }
  
          .booking-details {
              border-top: 2px solid #eeeeee;
              margin-top: 20px;
              padding-top: 10px;
          }
  
          .footer {
              margin-top: 20px;
              color: #777777;
              font-size: 12px;
          }
      </style>
  </head>
  <body>
      <div class="container">
        
          <p>Dear Guest,</p>
          <p>Thank you for considering Project Second Home for your upcoming stay. We've received your booking request and are excited to assist you in planning your trip.</p>
  
          <div class="booking-details">
          <p><strong>Booking Details:</strong></p>

              <p><strong>Booking Id:</strong> ${slicedObjectId}</p>
              <p><strong>Branch:</strong> ${result?.bookingInfo?.branch?.name}</p>
              <p><strong>Check-in Date:</strong> ${result?.bookingInfo?.rentDate?.bookStartDate}</p>
              <p><strong>Check-out Date:</strong> ${result?.bookingInfo?.rentDate?.bookEndDate}</p>
              <p><strong>Booking Duration:</strong> ${result?.bookingInfo?.customerRent?.remainingDays} nights</p>

              <p><strong>Room Type:</strong> ${result?.bookingInfo?.roomType}</p>
              <p><strong>Room Number:</strong> ${result?.bookingInfo?.roomNumber}</p>
            
          </div>
  
          <div class="payment-info">
              <p><strong>Payment Information:</strong></p>
              <p><strong>Payable Amount:</strong> BDT ${result?.payableAmount}</p>
          </div>
          </br>
  
          <p><strong>Please Note:</strong></p>
          <p>Check-in Time: 12:00 PM</p>
          <p>Check-out Time:11:00 AM</p>
  
          <p>Your booking is not yet confirmed. Our team will contact you as soon as possible to finalize your booking details and prepare your rental contract.</p>
  
          <p>
          <strong>Upon arrival, please present a valid identification (passport, NID, or any government-issued ID) at the front desk.</strong>
          </p>
  
          <p>If you have any questions or need assistance during your stay, please do not hesitate to contact our 24/7 customer support at <strong>[Customer Support Number]</strong>. We are here to assist you.</p>
  
          <p>Thank you for choosing Project Second Home for your accommodation needs. We look forward to providing you with a comfortable and memorable stay.</p>
  
          <p>Warm regards,<br>The Project Second Home Team.</p>
      </div>
  </body>
  </html>
  
      
    `;
}
