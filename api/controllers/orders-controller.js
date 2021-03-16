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
        const {
            first_name,
            last_name,
            email,
            phone,
            street,
            state,
            zip,
            selected_solar_device,
            accessory_battery_pack,
            home_sq_ft
        } = req.body;

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