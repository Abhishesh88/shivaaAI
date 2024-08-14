import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const jobs = mongoose.model("jobs", jobsSchema);

export default jobs;
