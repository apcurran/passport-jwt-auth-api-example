"use strict";

const { ExtractJwt, Strategy } = require("passport-jwt");

const passport = require("passport");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(
    new Strategy(options, async function (jwtPayload, done) {
        try {
            const currentUser = jwtPayload;
            console.log(currentUser);

            if (currentUser) {
                return done(null, currentUser);
            }
        } catch (err) {
            console.error(err);

            return done(err, false);
        }
    }),
);
