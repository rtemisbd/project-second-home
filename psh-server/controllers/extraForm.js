import ExtraForm from "../models/ExtraForm.js";
export const createExtraForm = async (req, res) => {
  const {
    purpose,
    name,
    email,
    phone,
    propertySize,
    numberOfRooms,
    totalSeatCapacity,
    existingBooking,
    designation,
    address,
    availabilityForVisit,
    availabilityForVisitTime,
    duration,
  } = req.body;
  try {
    const image = req?.files?.image[0].path;

    const extraFormData = new ExtraForm({
      purpose,
      name,
      email,
      phone,
      propertySize,
      numberOfRooms,
      totalSeatCapacity,
      existingBooking,
      designation,
      address,
      image,
      availabilityForVisit,
      availabilityForVisitTime,
      duration,
    });

    // Form Mail to Manager
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "alaminbamna08@gmail.com",
    //     pass: "qesfajhmrfhkfnbo",
    //   },
    // });

    // const mailOptions = {
    //   from: "alaminbamna08@gmail.com",
    //   to: `mohammad.alaminh08@gmail.com,${email}`,
    //   subject: "PSH Order",
    //   html: "<h1>Welcome</h1><p>Thanks For Order!</p>",
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

    const result = await extraFormData.save();

    res.status(200).json({
      status: "success",
      message:
        " Thank Youe ! Your Form Uploaded Successfully Done, I will very soon Contact You",
      result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getExtraForm = async (req, res, next) => {
  try {
    const extraForm = await ExtraForm.find({});
    res.status(200).json(extraForm);
  } catch (err) {
    next(err);
  }
};
