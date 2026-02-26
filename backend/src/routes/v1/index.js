import express from "express";
import resumeRouter from "./resume.routes.js";
import authRouter from "./auth.routes.js";
import jobRouter from "./job.routes.js";
import { globalRateLimiter } from "../../middlewares/rateLimiter.middleware.js";

const v1Routers = express.Router();
v1Routers.use(globalRateLimiter); // global rate limiter
v1Routers.use("/resume", resumeRouter);
v1Routers.use("/auth", authRouter);
v1Routers.use("/job", jobRouter);

export default v1Routers;
