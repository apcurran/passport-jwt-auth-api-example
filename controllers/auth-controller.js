"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { db } = require("../db/index");

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
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    postUserSignup,
};
