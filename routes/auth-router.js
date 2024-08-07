"use strict";

const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const { validateAuth } = require("../middleware/validate-auth-data");

router.post("/sign-up", validateAuth, authController.postUserSignup);

router.post("/log-in", validateAuth, authController.postLogIn);

module.exports = router;
