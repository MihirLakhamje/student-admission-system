import mongoose, { Schema } from "mongoose";
const applicationSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  programme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Programme",
    required: true,
  },
  personalDetails: {
    age: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    bloodGroup: { type: String, required: true },
    gender: { type: String, required: true },
  },
  academicDetails: {
    motherName: { type: String, required: true },
    collegeName: { type: String, required: true },
    boardName: { type: String, required: true },
    percentage: { type: Number, required: true },
  },
  applicationStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected", "underReview"],
    default: "pending",
  },
  note: { type: String },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
