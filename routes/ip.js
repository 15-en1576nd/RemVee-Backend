const cors = require('cors');
const express = require('express');
const app = express();
const config = require('../middleware/config');
const fs = require('fs');

// Set app headers to allow localhost:8080 to acces the api 
let allowedOrigins = config.allowed.split(', ');
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Get the allowed ip address
var allowedIpaddress = config.allowed_ipaddress;

// basic route at /api
app.get('/ip', (req, res) => {
    res.status(200).send({
        data: {
            allowedIpaddress: allowedIpaddress,
        }
    });
});

app.post('/ip', (req, res) => {
    // Get the ip address from the request
    let ipaddress = req.body.ipaddress;
    
    // Check if the ip address is allowed
    if (allowedIpaddress.includes(ipaddress)) {
        res.status(200).send({
            data: {
                allowedIpaddress: allowedIpaddress,
                ipaddress: ipaddress,
            }
        });
    } else {
        res.status(403).send({
            data: {
                allowedIpaddress: allowedIpaddress,
                ipaddress: ipaddress,
            }
            // Now user can't access the api
            

        });
    }
    return;
});


// export the app
module.exports = app;