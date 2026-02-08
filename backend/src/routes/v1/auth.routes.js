import express from "express";
import { registerUser, authUser } from "../../controllers/auth.controller.js";
import validate from "./../../middlewares/validate.middleware.js";
import authValidation from "./../../validations/auth.validation.js";
const authRouter = express.Router();

authRouter.post("/register", validate(authValidation.register), registerUser);
authRouter.post("/login", validate(authValidation.login), authUser);

export default authRouter;
