import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";
export const createContact = async (req, res, next) => {
  try {
    const newContact = new Contact(req.body);

    const contactSave = await newContact.save();

    res.status(200).json(contactSave);
  } catch (error) {
    next(error);
  }
};

export const getContactUs = async (req, res, next) => {
  try {
    const contactUs = await Contact.find({});

    res.status(200).json({
      status: "Success",
      message: "Success",
      contactUs,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Contact not found",
      error: error.message,
    });
  }
};
export const updateContactUs = async (req, res, next) => {
  try {
    await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: req?.body?.status,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Success",
    });

    // Contact Mail to Client
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alaminbamna08@gmail.com",
        pass: "qesfajhmrfhkfnbo",
      },
    });

    const mailOptions = {
      from: "alaminbamna08@gmail.com",
      to: `mohammad.alaminh08@gmail.com,${req?.body?.email}`,
      subject: "Contact",
      html: `
      <p>Thanks for contact us.</p>
      <p>Your Appointment Date : ${req?.body?.appointMentDate}, and Time : ${req?.body?.appointMentTime}</p>
    
      
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Contact not found",
      error: error.message,
    });
  }
};

export const deleteContactUs = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};
