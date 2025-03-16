import express from "express";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import orderRoute from "./routes/order.js";
import categoryRoute from "./routes/category.js";
import eventRoute from "./routes/event.js";
import termsRoute from "./routes/terms.js";
import privacyRoute from "./routes/privacy.js";
import dynamicRoute from "./routes/dynamic.js";
import facilityCategoryRoute from "./routes/facilityCategory.js";
import recommendedRoute from "./routes/recommended.js";
import facilityRoute from "./routes/facility.js";
import commonfacilityRoute from "./routes/commonfacility.js";
import branchRoute from "./routes/branch.js";
import propertyRoute from "./routes/property.js";
import promoRoute from "./routes/promo.js";
import bannerRoute from "./routes/banner.js";
import IssueRouter from "./routes/issue.js";
import reviewRouter from "./routes/review.js";
import wishlistRouter from "./routes/wishlist.js";
import leasePropertyRouter from "./routes/leaseProperty.js";
import requestRentRouter from "./routes/requestRent.js";
import requestVisitRouter from "./routes/requestVisit.js";
import extraCharge from "./routes/extraCharge.js";
import extraForm from "./routes/extraForm.js";
import transaction from "./routes/Transaction.js";
import adjustment from "./routes/Adjustment.js";
import contact from "./routes/Contact.js";
import subscription from "./routes/subscrioption.js";
import subscriptionOrder from "./routes/subscriptionOrder.js";
import rentRoomRoute from "./routes/rentRooms.js";
import form from "./routes/form.js";
import teachingForm from "./routes/teachingForm.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import seatsRoute from "./routes/seats.js";
import paymentRoute from "./routes/payment.js";
import resortRoute from "./routes/resort.js";
import villaRoute from "./routes/villa.js";
import districtRoute from "./routes/district.js";

const app = express();
app.use("/public/uploads", express.static("public/uploads"));

dotenv.config();

// Allowed origins for CORS
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
// ];

// // CORS configuration
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     optionsSuccessStatus: 200,
//   })
// );

// app.options("*", cors());

// app.use(cors());
const allowedOrigins = [
  "http://localhost:5173",
  "https://adminps.psh.com.bd",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://psh.com.bd",
  "https://www.psh.com.bd",
  "https://partner.psh.com.bd"
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/category", categoryRoute);
app.use("/api/event", eventRoute);
app.use("/api/privacy", privacyRoute);
app.use("/api/terms", termsRoute);
app.use("/api/facilityCategory", facilityCategoryRoute);
app.use("/api/recommended", recommendedRoute);
app.use("/api/promo", promoRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/order", orderRoute);
app.use("/api/facility", facilityRoute);
app.use("/api/commonfacility", commonfacilityRoute);
app.use("/api/branch", branchRoute);
app.use("/api/property", propertyRoute);
app.use("/api/seats", seatsRoute);

app.use("/api/issue", IssueRouter);
app.use("/api/review", reviewRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/leaseProperty", leasePropertyRouter);
app.use("/api/requestRent", requestRentRouter);
app.use("/api/requestVisit", requestVisitRouter);
app.use("/api/extraCharge", extraCharge);
app.use("/api/extraForm", extraForm);
app.use("/api/subscribe", form);
app.use("/api/teaching-form", teachingForm);
app.use("/api/transaction", transaction);
app.use("/api/adjustment", adjustment);
app.use("/api/dynamic", dynamicRoute);
app.use("/api/contact", contact);
app.use("/api/subscription", subscription);
app.use("/api/subscriptionOrder", subscriptionOrder);
app.use("/api/rent-rooms", rentRoomRoute);
app.use("/api/bkash/payment", paymentRoute);
app.use("/api/resort", resortRoute);
app.use("/api/villa", villaRoute);
app.use("/api/district", districtRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

export default app;
