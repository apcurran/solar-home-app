CREATE TABLE solar_device (
    id SERIAL PRIMARY KEY,
    device_type VARCHAR(20) NOT NULL,
    tile_style VARCHAR(20),
    price_per_500_sq_ft INT
);

CREATE TABLE battery_pack (
    id SERIAL PRIMARY KEY,
    price INT
);

CREATE TABLE user_order (
    id SERIAL PRIMARY KEY,
    
);