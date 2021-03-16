"use strict";

const db = require("../../db/index");

async function getOrder(req, res, next) {
    try {
        const { orderId } = req.body;
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

module.exports = {
    getOrder,
};