"use strict";

const express = require("express");

const app = express();

// middleware to parse JSON req bodies
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`);
});
