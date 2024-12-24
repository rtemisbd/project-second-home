// Booking Confirmation Mail to customer
const transporter1 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alaminbamna08@gmail.com",
    pass: "qesfajhmrfhkfnbo",
  },
});

const mailOptions1 = {
  from: "alaminbamna08@gmail.com",
  to: `${findSingleOrder?.email}`,
  subject: "Booking Confirmation: Your Reservation at Project Second Home",
  html: bookingConfirmMail(findSingleOrder),
};

transporter1.sendMail(mailOptions, function (error, info) {
  if (error) {
    // console.log(error);
  } else {
    // console.log("Email sent: " + info.response);
  }
});

// Booking Cancelation Mail to customer
const transporter2 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alaminbamna08@gmail.com",
    pass: "qesfajhmrfhkfnbo",
  },
});

const mailOptions2 = {
  from: "alaminbamna08@gmail.com",
  to: `${findSingleOrder?.email}`,
  subject: `Cancellation Confirmation: Booking ID [${slicedObjectId}]`,
  html: cancelBookingMail(findSingleOrder),
};

transporter2.sendMail(mailOptions, function (error, info) {
  if (error) {
    // console.log(error);
  } else {
    // console.log("Email sent: " + info.response);
  }
});
