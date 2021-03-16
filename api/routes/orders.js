"use strict";

const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders-controller");

// GET a customer order
router.get("/", ordersController.getOrder);

module.exports = router;