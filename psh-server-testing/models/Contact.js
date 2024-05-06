import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  purPose: {
    type: String,
    required: true,
  },
  appointMentDate: {
    type: String,
    required: true,
  },
  appointMentTime: {
    type: String,
    required: true,
  },
  contactMsg: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Accepted", "Not Accepted"],
    default: "Not Accepted",
  },
});
export default mongoose.model("Contact", ContactSchema);
