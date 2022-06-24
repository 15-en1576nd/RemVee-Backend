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

app.get('/tv/:id', (req, res) => {
    // Get TV with id from database
    con.query("SELECT * FROM tv WHERE id = ?", [req.params.id], function (err, result, fields) {
        if (err) throw err;
        res.status(200).send({
            message: 'This is the TV with id: ' + req.params.id,
            tv: {
                id: result[0].id,
                name: result[0].name,
                // team: result[0].team_id,
                ipaddress: result[0].ipaddress
            }
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

// Update a TV with the given id
app.put('/tv/:id', (req, res) => {
    let name = req.body.name;
    let ipaddress = req.body.ipaddress;
    let id = req.params.id;
    // let team = req.body.team;
    
    let sql = "UPDATE tv SET name = '" + name + "', ipaddress = '" + ipaddress + "', updated_at = NOW() WHERE id = " + id;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).send({
            message: 'TV with id: ' + req.params.id + ' updated',
            id: id,
            name: name,
            ipaddress: ipaddress,
            // team: team
            created_at: result.created,
            updated_at: result.updated
        });
    });
});

app.delete('/tv/:id', (req, res) => {
    // Delete a TV from the mysql database with the given id
    let id = req.params.id;
    let sql = "DELETE FROM tv WHERE id = " + id;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(201).send({
            message: 'TV deleted from database',
            id: id
        });
    });
});

// export the app
module.exports = app;