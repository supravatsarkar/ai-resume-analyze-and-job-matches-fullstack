const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../../controllers/auth.controller");
const validate = require("./../../middlewares/validate.middleware");
const authValidation = require("./../../validations/auth.validation");

router.post("/register", validate(authValidation.register), registerUser);
router.post("/login", validate(authValidation.login), authUser);

module.exports = router;
