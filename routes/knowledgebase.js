const cors = require('cors');
const express = require('express');
const app = express();
const config = require('../middleware/config');
const fs = require('fs');
const mysql = require('mysql');

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

// Get all topics from database for knowledgebase
app.get('/knowledgebase', (req, res) => {
        con.query("SELECT * FROM knowledgebase", function (err, result, fields) {
            if (err) throw err;
            res.send({
                message: 'These are all the topics in the knowledgebase',
                list:
                    result.map(knowledgebase => {
                        return {
                            id: knowledgebase.id,
                            name: knowledgebase.name,
                            description: knowledgebase.description,
                        }
                    }),
            });
        });
    });

// export the app
module.exports = app;