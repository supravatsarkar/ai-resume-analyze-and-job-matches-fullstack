import express from "express";
import resumeRouter from "./resume.routes.js";
import authRouter from "./auth.routes.js";

const v1Routers = express.Router();

v1Routers.use("/resume", resumeRouter);
v1Routers.use("/auth", authRouter);

export default v1Routers;
