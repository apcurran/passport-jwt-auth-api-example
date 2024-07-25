"use strict";

const express = require("express");

const app = express();

// middleware to parse JSON req bodies
app.use(express.json());

// general server error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`);
});
