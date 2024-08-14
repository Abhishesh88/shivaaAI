import jobs from "../models/jobs.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get all jobs
export const getAllJobs = asyncHandler(async (req, res) => {
  const allJobs = await jobs.find();
  res
    .status(200)
    .json(new ApiResponse(200, allJobs, "Jobs retrieved successfully"));
});

// Get a job by ID
export const getJobById = asyncHandler(async (req, res) => {
  const job = await jobs.findById(req.params.id);
  if (!job) {
    return res.status(404).json(new ApiResponse(404, null, "Job not found"));
  }
  res.status(200).json(new ApiResponse(200, job, "Job retrieved successfully"));
});

// Create a new job
export const createJob = asyncHandler(async (req, res) => {
  const newJob = new jobs(req.body);
  await newJob.save();
  res
    .status(201)
    .json(new ApiResponse(201, newJob, "Job created successfully"));
});

// Update a job by ID
export const updateJobById = asyncHandler(async (req, res) => {
  const updatedJob = await jobs.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedJob) {
    return res.status(404).json(new ApiResponse(404, null, "Job not found"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, updatedJob, "Job updated successfully"));
});

// Delete a job by ID
export const deleteJobById = asyncHandler(async (req, res) => {
  const deletedJob = await jobs.findByIdAndDelete(req.params.id);
  if (!deletedJob) {
    return res.status(404).json(new ApiResponse(404, null, "Job not found"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, deletedJob, "Job deleted successfully"));
});
