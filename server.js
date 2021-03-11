"use strict";

require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 5000;
// Import routers


const app = express();

if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");

    app.use(morgan("dev"));
}

// Middleware
app.use(express.json());

// API routers

// General server error handler
app.use((err, req, res, next) => {
    console.error(err);

    return res.status(500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode, and listening on PORT ${PORT}.`));