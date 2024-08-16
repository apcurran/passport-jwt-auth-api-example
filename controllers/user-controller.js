"use strict";

/** @type {import("express").RequestHandler} */
async function getProtected(req, res, next) {
    try {
        res.status(200).json({ message: "You successfully accessed the protected user route!" });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProtected,
};
