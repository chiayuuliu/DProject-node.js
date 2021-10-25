require('dotenv').config();
const mysql = require('mysql2');

//連線池
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    waitForConnections:true,
    //最多可以有幾個連線
    connectionLimit:5,
    //排隊
    queueLimit:0,
})

module.exports = pool.promise();