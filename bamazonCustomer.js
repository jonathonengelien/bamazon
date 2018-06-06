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
    ]).then(function (answers) {
        var selectedProduct = answers.product_id;
        var productQuantity = answers.product_quantity;
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
                });
                connection.end();
            }
        })
    });

}


// var makePurchase = function() {
//     //creates the questions that will be prompted to the user and the object that the user's choice will go into
//     var product = {
//         properties: {
//             itemID: { description: "Please enter the Item ID# of an item you wish to purchase"},
//             stockQuantity: { description: "Please enter the quantity of the item you're purchasing"}
//         },
//     };

//     //prompt.start();

//     //gets the responses to the prompts above
//     prompt.get(product, function (err, res) {

//         //places these responses in the variable custPurchase
//         var custPurchase = {
//             itemID: res.item_id,
//             stockQuantity: res.stock_quantity
//         };

//         //the variable established above is pushed to the productPurchased array defined at the top of the page
//         shoppingCart.push(custPurchase);

//         //connects to the mysql database and selects the item the user selected above based on the item id number entered
//         connection.query('SELECT * FROM Products WHERE item_id=?', shoppingCart[0].item_id, function (err, res) {
//             if (err) console.log(err, 'That item ID doesn\'t exist');

//             //if the stock quantity available is less than the amount that the user wanted to purchase then the user will be alerted that the product is out of stock
//             if (res[0].stock_quantity < shoppingCart[0].stockQuantity) {
//                 console.log('That product is out of stock!');
//                 connection.end();

//                 //otherwise if the stock amount available is more than or equal to the amount being asked for then the purchase is continued and the user is alerted of what items are being purchased, how much one item is and what the total amount is
//             } else if (res[0].stock_quantity >= shoppingCart[0].stockQuantity) {

//                 console.log('');

//                 console.log(shoppingCart[0].stockQuantity + ' items purchased');

//                 console.log(res[0].product_name + ' ' + res[0].price);

//                 //this creates the variable SaleTotal that contains the total amount the user is paying for this total puchase
//                 var saleTotal = res[0].price * shoppingCart[0].stock_quantity;

//                 //connect to the mysql database Departments and updates the saleTotal for the id of the item purchased
//                 connection.query("UPDATE Departments SET TotalSales = ? WHERE department_name = ?;", [saleTotal, res[0].department_name], function (err, resultOne) {
//                     if (err) console.log('error: ' + err);
//                     return resultOne;
//                 })

//                 console.log('Total: ' + saleTotal);

//                 //this variable contains the newly updated stock quantity of the item purchased
//                 newQuantity = res[0].stock_quantity - shoppingCart[0].stock_quantity;

//                 // connects to the mysql database products and updates the stock quantity for the item puchased
//                 connection.query("UPDATE Products SET stock_quantity = " + newQuantity + " WHERE item_id = " + shoppingCart[0].item_id, function (err, res) {
//                     // if(err) throw err;
//                     // console.log('Problem ', err);
//                     console.log('');
//                     console.log(colors.cyan('Your order has been processed.  Thank you for shopping with us!'));
//                     console.log('');

//                     connection.end();
//                 })

//             };

//         })
//     })
// }
