import { Router } from "express";
import { healthCheckController } from "../controllers/health.controller.js";

const router = Router();

router.route("/health_check").get(healthCheckController);

export default router;
