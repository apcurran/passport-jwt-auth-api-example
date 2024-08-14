"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { db } = require("../db/index");

/** @type {import("express").RequestHandler} */
async function postUserSignup(req, res, next) {
    try {
        const { email, password } = req.body;
        // check first for pre-existing user account
        const emailExists = await db.oneOrNone(`
            SELECT app_user.user_id
            FROM app_user
            WHERE app_user.email = $<email>
            `, { email });

        if (emailExists) {
            // duplicate accounts should not be made,
            // return an error instead
            return res.status(400).json({ error: "Email already exists." });
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // add new user to db
        await db.none(`
            INSERT INTO app_user
                (email, hashed_password)
            VALUES
                ($<email>, $<hashedPassword>);
            `, { email, hashedPassword });

        res.status(201).json({ message: "Success! You created an account!" });
    } catch (err) {
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
async function postLogIn(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await db.oneOrNone(`
            SELECT
                user_id,
                email,
                hashed_password
            FROM app_user
            WHERE email = $<email>;
            `, { email });

        if (!user) {
            return res.status(400).json({ error: "Email is not found." });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    postUserSignup,
    postLogIn,
};
