import express from "express";
import resumeRouter from "./resume.routes.js";

const v1Routers = express.Router();

v1Routers.use("/resume", resumeRouter);

export default v1Routers;
