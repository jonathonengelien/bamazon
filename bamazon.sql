CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (45) NULL,
    department_name VARCHAR (25) NULL,
    price INT (10) NULL,
    stock_quantity INT (5) NULL,
    PRIMARY KEY (item_id)
    );
    