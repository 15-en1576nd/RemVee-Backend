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
var con = mysql.createConnection(
    config.db.connection
);

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
                        // team: tv.team_id,
                        ipaddress: tv.ipaddress
                    }
                }),
        });
    });
});

app.post('/tv', (req, res) => {
    // Add a TV to the mysql database with the given name and ipaddress
    let name = req.body.name;
    let ipaddress = req.body.ipaddress;
    // let team = req.body.team;

    let sql = "INSERT INTO tv (name, ipaddress, created_at) VALUES ('" + req.body.name + "', '" + req.body.ipaddress + "', NOW())";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(201).send({
            message: 'TV added to database',
            id: result.insertId,
            name: name,
            ipaddress: ipaddress,
            // team: team
            created_at: result.created,
            updated_at: result.updated
        });
    });
});

// export the app
module.exports = app;