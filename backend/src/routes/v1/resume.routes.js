import express from "express";
import resumeController from "../../controllers/resume.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";

const resumeRouter = express.Router();

resumeRouter.get("/", resumeController.getUploadedList);
resumeRouter.delete("/:id", resumeController.deleteResume);
resumeRouter.post(
  "/upload",
  protect,
  upload.single("resume-file"),
  resumeController.uploadController,
);
resumeRouter.post(
  "/upload-and-analyze",
  protect,
  upload.single("resume-file"),
  resumeController.uploadAndAnalyzeController,
);
resumeRouter.post("/generate-ai-response", resumeController.getAiResponse);
resumeRouter.get("/latest", protect, resumeController.getLatestResume);

export default resumeRouter;
