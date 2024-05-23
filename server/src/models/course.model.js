import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  courseTitle: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  credits: { type: Number, required: true },
  semester: { type: String, required: true },
  year: { type: String, required: true },
});

const Course = mongoose.model('Course', courseSchema);

export default Course;