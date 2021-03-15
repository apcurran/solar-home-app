CREATE TABLE solar_device (
    solar_device_id SERIAL PRIMARY KEY,
    solar_tile_id INT,
    FOREIGN KEY(solar_tile_id) REFERENCES solar_tile(solar_tile_id)
    solar_panel_id INT,
    FOREIGN KEY(solar_panel_id) REFERENCES solar_panel(solar_panel_id)
);

-- Premium device type
CREATE TABLE solar_tile (
    solar_tile_id SERIAL PRIMARY KEY,
    tile_style VARCHAR(20) NOT NULL,
    price_per_500_sq_ft INT NOT NULL
);

-- Cheaper device type
CREATE TABLE solar_panel (
    solar_panel_id SERIAL PRIMARY KEY,
    price_per_500_sq_ft INT NOT NULL
);

-- Accessory
CREATE TABLE battery_pack (
    battery_pack_id SERIAL PRIMARY KEY,
    price INT NOT NULL
);

-- payment_id from Stripe payment
CREATE TABLE user_order (
    user_order_id SERIAL PRIMARY KEY,
    customer_id SERIAL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    payment_id VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE
);