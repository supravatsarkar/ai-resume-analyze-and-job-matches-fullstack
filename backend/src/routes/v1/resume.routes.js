import express from "express";
import resumeController from "../../controllers/resume.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";

const resumeRouter = express.Router();

resumeRouter.get("/", resumeController.getUploadedList);
resumeRouter.delete("/:id", resumeController.deleteResume);
resumeRouter.post(
  "/upload",
  upload.single("resume-file"),
  resumeController.uploadController,
);

export default resumeRouter;
