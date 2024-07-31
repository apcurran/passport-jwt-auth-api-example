"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { db } = require("../db/index");

async function postUserSignup(req, res, next) {
    try {
        // validation here

    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    postUserSignup,
};
