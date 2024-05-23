import mongoose, { Schema } from "mongoose";

const programmeSchema = new Schema({
  progTitle: { type: String, required: true },
  progCode: { type: String, required: true, unique: true },
  description: { type: String },
  duration: { type: Number, required: true },
  fees: { type: Number, required: true },
  overallFees: { type: Number, required: true },
  degreeType: { 
    type: String, 
    enum: ["PG", "UG"],
    required: true 
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
  ]
});

const Programme = mongoose.model('Programme', programmeSchema);

export default Programme;