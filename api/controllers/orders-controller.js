"use strict";

const db = require("../../db/index");

async function getOrder(req, res, next) {
    try {
        const { orderId } = req.params;
        const ordersInfo = (await db.query(`
            SELECT *
            FROM customer_order
            WHERE customer_order.customer_order_id = $1
        `, [orderId])).rows;
    
        res.json(ordersInfo);
        
    } catch (err) {
        next(err);
    }
}

async function postOrder(req, res, next) {
    try {
        // Validate incoming data first
        
        
    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {

        const nowDate = new Date();
        // Create payment_id from Stripe

        

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getOrder,
    postOrder
};