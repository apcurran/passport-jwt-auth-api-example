"use strict";

const { ExtractJwt, Strategy } = require("passport-jwt");

const passport = require("passport");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(
    new Strategy(options, function (jwtPayload, done) {
        try {
            const currentUser = jwtPayload;

            if (currentUser) {
                return done(null, currentUser);
            }
        } catch (err) {
            console.error(err);

            return done(err, false);
        }
    }),
);
