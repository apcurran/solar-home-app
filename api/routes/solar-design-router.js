"use strict";

const express = require("express");
const router = express.Router();

const solarDesignController = require("../controllers/solar-design-controller");

// GET all solar device info
router.get("/", solarDesignController.getSolarInfo);

module.exports = router;