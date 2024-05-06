import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const SubscriptionOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      // required: true,
    },
    branch: {
      type: ObjectId,
      ref: "Branch",
      // required: true,
    },
    paymentDate: {
      type: Date,
    },

    totalAmount: {
      type: Number,
    },

    totalReceiveTk: {
      type: Number,
    },
    paymentType: {
      type: String,
    },
    paymentNumber: {
      type: String,
    },
    transactionId: {
      type: String,
    },

    userPhone: {
      type: String,
    },
    userAddress: {
      type: String,
    },

    paymentStatus: {
      type: String,
    },
    acceptableStatus: {
      type: String,
      enum: ["Accepted", "Pending", "Rejected"],
      default: "Pending",
    },

    packageName: {
      type: String,
    },
    packageId: {
      type: ObjectId,
      ref: "Subcription",
      // required: true,
    },
    packageDuration: {
      type: String,
    },
    packagePrice: {
      type: String,
    },
    addedTotalRoom: {
      type: String,
    },
    totalFeaturedRoom: {
      type: String,
    },
    packageBuyDate: {
      type: Date,
    },
    packageEndDate: {
      type: Date,
    },
    // bankName: {
    //   type: String,
    // },
    // bankHoldingName: {
    //   type: String,
    // },
    // receiverName: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

const SubscriptionOrder = mongoose.model(
  "SubscriptionOrder",
  SubscriptionOrderSchema
);
export default SubscriptionOrder;
