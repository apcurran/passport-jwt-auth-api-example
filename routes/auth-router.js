"use strict";

const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const { validateAuth } = require("../middleware/validate-auth-data");

router.post("/sign-up", validateAuth, authController.postUserSignup);

module.exports = router;
