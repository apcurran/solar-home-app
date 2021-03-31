"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../../db/index");

const { ordersValidation } = require("../validation/orders-validation");
const { calcOrderAmt } = require("../utils/calc-order-amt");

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

async function postCreatePaymentIntent(req, res, next) {
    const { itemsArr } = req.body;
    const myTotal = calcOrderAmt(itemsArr);

    try {
        // Payment Intents API
        const paymentIntent = await stripe.paymentIntents.create({
            amount: myTotal,
            currency: "usd"
        });
        
        res.status(200).json({ clientSecret: paymentIntent.client_secret});
        
    } catch (err) {
        next(err);
    }
}

// Route to call after postCreatePaymentIntent has successfully ran
async function postOrder(req, res, next) {
    console.log("postOrder controller running!");

    try {
        await ordersValidation(req.body);
        
    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        const {
            paymentId,
            firstName,
            lastName,
            email,
            phone,
            street,
            state,
            zip,
            selectedSolarDevice,
            accessoryBatteryPack,
            homeSqFt,
            orderTotal
        } = req.body;
        const createdAt = new Date();
        
        // Save order info in db
        await db.query(`
            INSERT INTO customer_order
                (
                    payment_id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    street,
                    state,
                    zip,
                    selected_solar_device,
                    accessory_battery_pack,
                    home_sq_ft,
                    order_total,
                    created_at
                )
            VALUES
                (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7,
                    $8,
                    $9,
                    $10,
                    $11,
                    $12,
                    $13
                )
        `,
        [
            paymentId,
            firstName,
            lastName,
            email,
            phone,
            street,
            state,
            zip,
            selectedSolarDevice,
            accessoryBatteryPack,
            homeSqFt,
            orderTotal,
            createdAt
        ]
        );

        res.status(200).json({ message: "Your order was received!" });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getOrder,
    postOrder,
    postCreatePaymentIntent
};