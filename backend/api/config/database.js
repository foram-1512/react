var mysql = require('mysql')


var credentials = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database : process.env.DATABASE_NAME,
    datestring: 'date',
    multipleStatements:true
};

var database = mysql.createPool(credentials);



module.exports= database;

