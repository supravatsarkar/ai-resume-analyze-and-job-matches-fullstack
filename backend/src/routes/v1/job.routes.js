import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import jobController from "../../controllers/job.controller.js";
import {
  aiRateLimiter,
  jobMatchRateLimiter,
} from "../../middlewares/rateLimiter.middleware.js";
const jobRouter = express.Router();
// jobRouter.use(aiRateLimiter);

// jobRouter.get("/", protect, jobController.getJobs);
jobRouter.get(
  "/by-resume/:id",
  protect,
  jobMatchRateLimiter,
  jobController.getJobsByResumeId,
);

export default jobRouter;
