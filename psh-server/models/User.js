import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const promoSchema = new mongoose.Schema({
  promo: {
    type: String,
  },
  usedDate: {
    type: Date,
  },
  useTime: {
    type: Number,
    default: 0,
  },
});
const userSubscriptionSchema = new mongoose.Schema({
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
  totalFeaturedRoom: {
    type: String,
  },
  packageBuyDate: {
    type: Date,
  },
  packageEndDate: {
    type: Date,
  },
});

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    userName: {
      type: String,
    },
    userId: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    refferCode: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    nationalId: {
      type: Number,
    },
    validityType: {
      type: String,
    },
    validityNumber: {
      type: Number,
    },

    nationality: {
      type: String,
    },
    userAddress: {
      type: String,
    },
    passport: {
      type: String,
    },
    password: {
      type: String,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    role: {
      type: String,
      enum: [
        "SuperAdmin",
        "admin",
        "user",
        "manager",
        "partner",
        "subAdmin1",
        "subAdmin2",
      ],
      default: "user",
    },
    userStatus: {
      type: String,
      enum: ["Active", "Deactive", "Blocked"],
      default: "Active",
    },

    // Present Address
    presentAddress: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postCode: {
        type: Number,
      },
      country: {
        type: String,
      },
    },
    // Parmanent Address
    permanentAddress: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postCode: {
        type: Number,
      },
      country: {
        type: String,
      },
    },
    idCardType: {
      type: String,
    },
    cardImage: {
      type: String,
    },
    gardianImg: {
      type: String,
    },
    // Employment Status
    employmentStatus: {
      workAs: {
        type: String,
      },
      monthlyIncome: {
        type: String,
      },
    },
    // Emergency Contact
    emergencyContact: {
      contactName: {
        type: String,
      },
      relation: {
        type: String,
      },
      contactNumber: {
        type: String,
      },
    },
    photos: {
      type: [String],
    },
    usedPromo: [promoSchema],
    userSubscription: [userSubscriptionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
