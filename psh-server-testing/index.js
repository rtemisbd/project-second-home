import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
import seatRoute from "./routes/seat.js";
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

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use("/public/uploads", express.static("public/uploads"));

dotenv.config();
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, options);
    console.log("successfully connect with mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["Authorization"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/api/seat", seatRoute);
app.use("/api/issue", IssueRouter);
app.use("/api/review", reviewRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/leaseProperty", leasePropertyRouter);
app.use("/api/requestRent", requestRentRouter);
app.use("/api/requestVisit", requestVisitRouter);
app.use("/api/extraCharge", extraCharge);
app.use("/api/extraForm", extraForm);
app.use("/api/transaction", transaction);
app.use("/api/adjustment", adjustment);
app.use("/api/dynamic", dynamicRoute);
app.use("/api/contact", contact);
app.use("/api/subscription", subscription);
app.use("/api/subscriptionOrder", subscriptionOrder);

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

app.listen(process.env.PORT, () => {
  connect();
  console.log("connect with backend");
});
