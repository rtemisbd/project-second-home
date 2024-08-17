import TeachingForm from "../models/TeachingForm.js";
import catchAsync from "../shared/cathAsync.js";
import sendResponse from "../shared/sendResponse.js";
import nodemailer from "nodemailer";
export const createTeachingForm = catchAsync(async (req, res) => {
  const { name, mobileNumber, arrivalDate, arrivalTime } = req.body;
  //   console.log(fullName);
  const newData = new TeachingForm({
    name: name,
    mobileNumber: mobileNumber,
    arrivalDate: arrivalDate,
    arrivalTime: arrivalTime,
  });

  await newData.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alaminbamna08@gmail.com",
      pass: "qesfajhmrfhkfnbo",
    },
  });

  const mailOptions = {
    from: "alaminbamna08@gmail.com",
    to: "psh.info2016@gmail.com",
    subject: "Study Space",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            color: #666666;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #aaaaaa;
        }
    </style>
</head>
<body>
    <div class="container">
      <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone Number:</strong> ${mobileNumber}</p>
        <p><strong>Arrival Date:</strong> ${arrivalDate}</p>
        <p><strong>Arrival Time:</strong> ${arrivalTime}</p>
       
      
    </div>
</body>
</html>
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(401).json({
        status: "fail",
        message: " Sorry Something is wrong !",
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Please Check Your email!",
      });
    }
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Thanks for your subscribe",
  });
});
