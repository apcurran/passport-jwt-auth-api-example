"use strict";

const { authValidator } = require("../validation/auth-validator");

function validateAuth(req, res, next) {
    const valid = authValidator(req.body);

    if (!valid) {
        const errors = authValidator.errors.map(function createErrorMessages(error) {
            return {
                message: error.message,
            };
        });

        return res.status(400).json({ errors });
    }

    next();
}

module.exports = { validateAuth };
