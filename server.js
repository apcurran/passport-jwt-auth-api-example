"use strict";

const express = require("express");

// routers
const authRouter = require("./routes/auth-router");

const app = express();

// middleware to parse JSON req bodies
app.use(express.json());
// enable API router
app.use("/api/auth", authRouter);
// general server error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`);
});
