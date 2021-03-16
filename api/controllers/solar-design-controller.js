"use strict";

const db = require("../../db/index");

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

module.exports = {
    getSolarInfo,
};