"use strict";

const db = require("../../db/index");

const { solarDeviceValidation, batteryPackValidation } = require("../validation/solar-design-validation");

async function getSolarInfo(req, res, next) {
    try {
        // Combine solar_tile, solar_panel, and battery_pack tables
        const solarData = (await db.query(`
            SELECT
                solar_device.solar_tile_id,
                solar_device.solar_panel_id,
                solar_device.battery_pack_id,
                solar_tile.price_per_500_sq_ft AS solar_tile_price_per_500_sq_ft,
                solar_panel.price_per_500_sq_ft AS solar_panel_price_per_500_sq_ft,
                battery_pack.price AS battery_pack_price
            FROM solar_device
            INNER JOIN solar_tile
                ON solar_device.solar_tile_id = solar_tile.solar_tile_id
            INNER JOIN solar_panel
                ON solar_device.solar_panel_id = solar_panel.solar_panel_id
            INNER JOIN battery_pack
                ON solar_device.battery_pack_id = battery_pack.battery_pack_id
        `)).rows[0];

        res.json(solarData);

    } catch (err) {
        next(err);
    }
}

async function patchSolarTile(req, res, next) {
    try {
        // Validate incoming data first
        await solarDeviceValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        const { pricePer500SqFt } = req.body;
        
        await db.query(`
            UPDATE solar_tile
            SET price_per_500_sq_ft = $1
        `, [pricePer500SqFt]);

    } catch (err) {
        next(err);
    }
}

async function patchSolarPanel(req, res, next) {
    try {
        await solarDeviceValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        const { pricePer500SqFt } = req.body;
        
        await db.query(`
            UPDATE solar_panel
            SET price_per_500_sq_ft = $1
        `, [pricePer500SqFt]);

    } catch (err) {
        next(err);
    }
}

async function patchBatteryPack(req, res, next) {
    try {
        await batteryPackValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        const { batteryPrice } = req.body;
        
        await db.query(`
            UPDATE battery_pack
            SET price = $1
        `, [batteryPrice]);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSolarInfo,
    patchSolarTile,
    patchSolarPanel,
    patchBatteryPack,
};