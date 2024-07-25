"use strict";

const express = require("express");

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`);
});
