-- Premium device type
CREATE TABLE solar_tile (
    id SERIAL PRIMARY KEY,
    tile_style VARCHAR(20) NOT NULL,
    price_per_500_sq_ft INT NOT NULL
);

-- Cheaper device type
CREATE TABLE solar_panel (
    id SERIAL PRIMARY KEY,
    price_per_500_sq_ft INT NOT NULL
);

-- Accessory
CREATE TABLE battery_pack (
    id SERIAL PRIMARY KEY,
    price INT NOT NULL
);

-- payment_id from Stripe payment
CREATE TABLE user_order (
    id SERIAL PRIMARY KEY,
    customer_id SERIAL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    payment_id VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE
);