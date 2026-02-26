import express from "express";
import resumeController from "../../controllers/resume.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { aiRateLimiter } from "../../middlewares/rateLimiter.middleware.js";

const resumeRouter = express.Router();

resumeRouter.get("/", protect, resumeController.getUploadedList);
resumeRouter.delete("/:id", protect, resumeController.deleteResume);
resumeRouter.post(
  "/upload",
  protect,
  upload.single("resume-file"),
  resumeController.uploadController,
);
resumeRouter.post(
  "/upload-and-analyze",
  protect,
  aiRateLimiter,
  upload.single("resume-file"),
  resumeController.uploadAndAnalyzeController,
);
resumeRouter.post(
  "/generate-ai-response",
  protect,
  aiRateLimiter,
  resumeController.getAiResponse,
);
resumeRouter.get("/latest", protect, resumeController.getLatestResume);
resumeRouter.get(
  "/download-original-resume-file/:id",
  protect,
  resumeController.downloadOriginalResumeFile,
);

export default resumeRouter;
