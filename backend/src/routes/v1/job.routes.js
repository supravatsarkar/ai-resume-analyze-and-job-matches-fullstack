import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import jobController from "../../controllers/job.controller.js";
const jobRouter = express.Router();

jobRouter.get("/", protect, jobController.getJobs);
jobRouter.get("/by-resume/:id", protect, jobController.getJobsByResumeId);

export default jobRouter;
