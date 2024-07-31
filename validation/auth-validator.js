"use strict";

const { Ajv } = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv); // add formats like email

const authSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false,
};

const authValidator = ajv.compile(authSchema);

module.exports = { authValidator };
