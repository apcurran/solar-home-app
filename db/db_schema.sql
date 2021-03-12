-- Premium device type
CREATE TABLE solar_tile (
    id SERIAL PRIMARY KEY,
    tile_style VARCHAR(20),
    price_per_500_sq_ft INT NOT NULL
);

-- Cheaper device type
CREATE TABLE solar_panel (
    id SERIAL PRIMARY KEY,
    price_per_500_sq_ft INT NOT NULL
);

CREATE TABLE battery_pack (
    id SERIAL PRIMARY KEY,
    price INT NOT NULL
);

CREATE TABLE user_order (
    id SERIAL PRIMARY KEY
);