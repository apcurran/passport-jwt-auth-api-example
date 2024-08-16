"use strict";

const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");

router.get("/protected", userController.getProtected);

module.exports = router;
