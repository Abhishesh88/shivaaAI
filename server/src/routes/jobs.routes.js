import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJobById,
  deleteJobById,
} from "../controllers/jobs.controller.js";

const router = Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJobById).put(updateJobById).delete(deleteJobById);

export default router;
