"use strict";

const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders-controller");

// TODO: Restrict GET route to admins
// GET a customer order
router.get("/:orderId", ordersController.getOrder);

router.post("/", ordersController.postOrder);

module.exports = router;