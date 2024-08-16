"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user-controller");

router.get("/protected", passport.authenticate("jwt", { session: false }), userController.getProtected);

module.exports = router;
