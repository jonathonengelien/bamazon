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
        console.log("======================================================================================")
    }
});

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
	for(var i = 0; i < result.length; i++){
		table.push(
			[result[i].item_id, result[i].product_name, result[i].price]
		);
	}
    console.log(table.toString());

});


