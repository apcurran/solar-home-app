"use strict";

require("dotenv").config();

const db = require("../db/index");

async function populateDb() {
    // Create solar_tile data
    const tilePricePer500SqFt = 7500 // U.S. dollars
    const savedSolarTileData = await db.query(`
        INSERT INTO solar_tile
            (price_per_500_sq_ft)
        VALUES
            ($1)
        RETURNING *
    `, [tilePricePer500SqFt]);

    // Create solar_panel data
    const panelPricePer500SqFt = 3200 // U.S. dollars
    const savedSolarPanelData = await db.query(`
        INSERT INTO solar_panel
            (price_per_500_sq_ft)
        VALUES
            ($1)
        RETURNING *
    `, [panelPricePer500SqFt]);

    // Create battery_pack data
    const batteryPackPrice = 10000 // U.S. dollars
    const savedBatteryPackData = await db.query(`
        INSERT INTO battery_pack
            (price)
        VALUES
            ($1)
        RETURNING *
    `, [batteryPackPrice]);

    // Create solar_device data
    await db.query(
        `
            INSERT INTO solar_device
                (solar_tile_id, solar_panel_id, battery_pack_id)
            VALUES
                ($1, $2, $3)
        `,
        [
            savedSolarTileData.rows[0].solar_tile_id,
            savedSolarPanelData.rows[0].solar_panel_id,
            savedBatteryPackData.rows[0].battery_pack_id
        ]
    );
}

populateDb();