export function cancelBookingMail(findSingleOrder) {
  const objectIdString = findSingleOrder?._id
    ? findSingleOrder?._id.toString()
    : "";
  const slicedObjectId = objectIdString.slice(19);
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      
      h1 {
        color: #cc0000;
      }
      
      p {
        color: #555;
      }
  
      .cancellation-details {
        margin-top: 20px;
        padding: 15px;
        background-color: #ffe6e6;
        border-radius: 5px;
      }
  
      .contact-info {
        margin-top: 20px;
      }
  
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">

      <p>Dear Guest,</p>
  
      <p>We regret to inform you that your recent booking with Project Second Home (Booking ID: ${slicedObjectId}) has been canceled.</p>
  
      <div class="cancellation-details">
        <p><strong>Cancellation Details:</strong></p>
        <p><strong>Booking ID:</strong> ${slicedObjectId}</p>
        <p><strong>Check-in Date:</strong> ${findSingleOrder?.bookingInfo?.rentDate?.bookStartDate}</p>
        <p><strong>Check-out Date:</strong> ${findSingleOrder?.bookingInfo?.rentDate?.bookEndDate}</p>
        <p><strong>Room Type:</strong> ${findSingleOrder?.bookingInfo?.roomType}</p>
        <p><strong>Room Number:</strong> ${findSingleOrder?.bookingInfo?.roomNumber}</p>
      </div>
  
      <div class="contact-info">
        <p>Your cancellation request has been successfully processed, and the reservation associated with the above details has been canceled accordingly.</p>
        <p>Should you require any further assistance or have any questions regarding your cancellation, please do not hesitate to reach out to our customer support team at <strong>help@psh.com.bd</strong>.</p>
      </div>
  
      <p>Thank you for considering Project Second Home. We hope to have the opportunity to host you in the future.</p>
  
      <p>Warm regards,<br>Project Second Home Team.</p>
  
      <div class="footer">
        <p>This is an automated email. Please do not reply to this email.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
