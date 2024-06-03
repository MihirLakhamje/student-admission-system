import mongoose, { Schema } from "mongoose";
const uploadSchema = new Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  photo: { type: String, required: true },
  signature: { type: String, required: true },
  hscMarksheet: { type: String, required: true },
});

const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;
