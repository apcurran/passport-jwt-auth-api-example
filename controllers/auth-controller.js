"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { db } = require("../db/index");
const { authValidator } = require("../validation/auth-validator");

async function postUserSignup(req, res, next) {
    try {
        // validation here
        const validJSONPayload = authValidator(req.body);

        if (!validJSONPayload) {
            console.error(authValidator.errors);
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    postUserSignup,
};
