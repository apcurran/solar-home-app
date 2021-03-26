"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../../db/index");

const { ordersValidation } = require("../validation/orders-validation");

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

async function postCheckoutSession(req, res, next) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            // TODO: Fill in data
                        },
                        unit_amount: 1000,// TODO: Determine pricing
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: ``, // TODO
            cancel_url: `` // TODO
        });

        res.status(200).json({ id: session.id });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getOrder,
    postOrder,
    postCheckoutSession
};