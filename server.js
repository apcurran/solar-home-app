"use strict";

require("dotenv").config();
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 5000;
// Import routers
const solarDesignRouter = require("./api/routes/solar-design-router");
const ordersRouter = require("./api/routes/orders");

const app = express();

if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");

    app.use(morgan("dev"));
}

// Middleware
app.use(express.json());
//**** DEPLOYMENT ****
// app.use(express.static(path.join(__dirname, "client", "build")));

// API routers
app.use("/api/solar-design", solarDesignRouter);
app.use("/api/orders", ordersRouter);

// General server error handler
app.use((err, req, res, next) => {
    console.error(err);

    return res.status(500).json({ error: err.message });
});

//**** DEPLOYMENT ****
// Catch-all handler for React HTML file
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode, and listening on PORT ${PORT}.`));