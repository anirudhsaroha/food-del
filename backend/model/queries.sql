CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    cart_data JSONB DEFAULT '{}'::JSONB
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    items JSONB NOT NULL,
    amount NUMERIC NOT NULL,
    address JSONB NOT NULL,
    status VARCHAR DEFAULT 'Food Processing',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment BOOLEAN DEFAULT FALSE
);


