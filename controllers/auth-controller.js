"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { db } = require("../db/index");

async function postUserSignup(req, res, next) {
    try {
        const { email, password } = req.body;

        res.json({ message: "Success! You created an account!" });
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    postUserSignup,
};
