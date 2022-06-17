const cors = require('cors');
const express = require('express');
const app = express();
const config = require('../middleware/config');
const fs = require('fs');
const mysql = require("mysql");

// Set app headers to allow localhost:8080 to acces the api 
let allowedOrigins = config.allowed.split(', ');
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Make connection to database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "remvee"
});

app.get('/tv', (req, res) => {
    // Get all TV's from database
    con.query("SELECT * FROM tv", function (err, result, fields) {
        if (err) throw err;
        res.send({
            message: 'These are all the TVs',
            list:
                result.map(tv => {
                    return {
                        id: tv.id,
                        name: tv.name,
                        ipaddress: tv.ipaddress
                    }
                }),
        });
    });
});

// export the app
module.exports = app;