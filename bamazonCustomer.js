///////// Establishing Initial Connection to MySQL //////////

var inquirer = require("inquirer");
var mysql = require("mysql");
var dotenv = require('dotenv').config()
var colors = require('colors');
var Table = require('cli-table');


var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,

    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("================================== Welcome to Bamazon =================================");
        console.log("======================================================================================");
    }
});

//////////// Global Variables ////////////
var shoppingCart = []

//// Connection Works!! ////
connection.query('SELECT item_id, product_name, price FROM Products', function (err, result) {
    if (err) console.log(err);

    /////// Creating a Table to Show Results /////////
    var table = new Table({
        head: ['Item Id#', 'Product Name', 'Price'],
        style: {
            head: ['green'],
            compact: false,
            colAligns: ['center'],
        }
    });

    //Adds each item from the database to the table object
    for (var i = 0; i < result.length; i++) {
        table.push(
            [result[i].item_id, result[i].product_name, result[i].price]
        );
    }
    console.log(table.toString());

    //Calls the function to prompt user puchase
    makePurchase();
});

var makePurchase = function () {
    //Prompts customer to make a purchase
    inquirer.prompt([
        {
            name: "product_id",
            type: "input",
            message: "Please enter the Item ID# of an item you wish to purchase"
        },
        {
            name: "product_quantity",
            type: "input",
            message: "Please enter the quantity of the item you're purchasing"
        }
    ]).then(function (answer) {
        var selectedProduct = answer.product_id;
        var productQuantity = answer.product_quantity;
        var priceTotal;
        var stockQuantity;
        var newQuantity;

        connection.query("SELECT * FROM products WHERE ?", [{
            item_id: selectedProduct
        }], function (err, res) {
            if (err) throw err;

            stockQuantity = parseInt(res[0].stock_quantity);
            newQuantity = stockQuantity - productQuantity;
            productPrice = parseInt(res[0].price);
            priceTotal = "$ " + productQuantity * productPrice;

            if (newQuantity < 0) {
                console.log("Item is temporarily out of stock");
                additionalPurchase();
            } else {
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQuantity
                },
                {
                    item_id: selectedProduct
                }
                ], function (err, res) {
                    if (err) throw err;
                    console.log("Your total is: " + priceTotal);
                    additionalPurchase();
                });
            }
        })
    });
};

var additionalPurchase = function() {
    inquirer.prompt([
        {
            name: "additional_purchase",
            type: "input",
            message: "Would you like to make an additional purchase?"
        }
    ]).then(function(answer){
        if(answer.addional_purchase === "Yes" || "yes") {
            makePurchase();
        } else {
            console.log("Thank you for shopping!!")
            console.log("======================================================================================");
        }
    });
};

