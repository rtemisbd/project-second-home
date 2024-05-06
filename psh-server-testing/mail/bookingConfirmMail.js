export function bookingConfirmMail(findSingleOrder) {
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
        color: #333;
      }
      
      p {
        color: #555;
      }
  
      .booking-details {
        margin-top: 20px;
        padding: 15px;
        background-color: #f9f9f9;
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
  
      <p>We are pleased to confirm your reservation at Project Second Home (PSH)!</p>
  
      <div class="booking-details">
        <p><strong>Your Booking ID:</strong> ${slicedObjectId}</p>
        <p>Your booking is now confirmed, and we are looking forward to welcoming you to our establishment. Please note that your reservation has been successfully processed.</p>
        <p>Upon arrival, please present a valid identification (passport, NID, or any government-issued ID) at the front desk.</p>
      </div>
  
      <div class="contact-info">
        <p>For any questions or further assistance regarding your upcoming stay, feel free to reach out to our dedicated team at <strong>+8801647647404</strong>. We are here to ensure that your experience with us is nothing short of exceptional.</p>
      </div>
  
      <p>Thank you for choosing Project Second Home for your accommodation needs. We appreciate your trust in us and look forward to serving you soon.</p>
  
      <p>Warm regards,<br>Project Second Home Team.</p>
  
      <div class="footer">
        <p>This is an automated email. Please do not reply to this email.</p>
      </div>
    </div>
  </body>
  </html>
  
        
      `;
}
