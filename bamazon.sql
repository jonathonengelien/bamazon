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
    
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Terralite Portable Camp Chair", "Outdoors", 40, 61);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("YETI Rambler 30oz", "Outdoors", 25, 120);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Double Hammock w/ Straps", "Outdoors", 150, 16);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Rechargable Headlamp", "Tools", 16, 125);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Marshmallow Roasting Sticks 8pk", "Sports", 26, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Military Compass", "Tools", 68, 99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Compressed Towels", "Home Improvement", 35, 17);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Unigear Dry Bag Set", "Outdoors", 19, 250);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("40l Light Day Pack", "Outdoor Recreation", 220, 185);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("SVPRO Portable Bluetooth Speaker", "Electronics", 75, 330);    
   
SELECT * FROM products;   