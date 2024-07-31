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
            console.error("error here:", authValidator.errors);

            res.json({ message: authValidator.errors[0].message });

            return;
        }

        const { email, password } = req.body;

        res.json({ message: "You send a req to sign-up!" });
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    postUserSignup,
};
