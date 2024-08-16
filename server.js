"use strict";

const express = require("express");

// initialize Passport JS
require("./config/passport/passport-setup");

// routers
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");

const app = express();

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "testing") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

// middleware to parse JSON req bodies
app.use(express.json());
// enable API router
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
// general server error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
