"use strict";

const { Ajv } = require("ajv");
const ajv = new Ajv();

const authSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false,
};

const authValidator = ajv.compile(authSchema);

module.exports = { authValidator };
