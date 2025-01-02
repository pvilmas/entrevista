CREATE DATABASE entrevista;

CREATE TABLE producto(
    serial_number SERIAL,
    name VARCHAR(255),
    quantity INTEGER,
    expires DATE,
    available BOOLEAN
);

CREATE TABLE veterinaria(
    vet_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE stock(
    product_serial_number INTEGER,
    product_name VARCHAR(255),
    vet_id INTEGER,
    CONSTRAINT fk_serial_number FOREIGN KEY (product_serial_number, product_name) 
    REFERENCES producto(serial_number, name),
    CONSTRAINT fk_vet_id FOREIGN KEY (vet_id) 
    REFERENCES veterinaria(vet_id)
);

CREATE TABLE ventas(
    client_id SERIAL,
    product_serial_number INTEGER,
    product_name VARCHAR(255),
    CONSTRAINT fk_serial_number FOREIGN KEY (product_serial_number, product_name)
    REFERENCES producto(serial_number, name),
    quantity INTEGER,
    buying_state VARCHAR(255),
    PRIMARY KEY (client_id, product_serial_number, quantity)
);