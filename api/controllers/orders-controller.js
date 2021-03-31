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
    // try {
    //     // Validate incoming data first
    //     await ordersValidation(req.body);
        
    // } catch (err) {
    //     return res.status(400).json({ error: err.details[0].message });
    // }

    // Get quantity per 500 sq. ft. amt. from front-end
    // get items as an array from req.body POST data
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

// Route to call after postCheckoutSession has successfully ran
async function postOrder(req, res, next) {
    try {
        // Validate incoming data first
        await ordersValidation(req.body);
        
    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        console.log(req.body);
        const nowDate = new Date();
        // Create payment_id from Stripe

        res.status(200).json({ message: "Your order was recieved!" });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getOrder,
    postOrder,
    postCreatePaymentIntent
};