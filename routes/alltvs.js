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

app.get('/tv', (req, res) => {
    res.send({
        list: {
            tv: {
                name: 'Omen',
                status: 'online',
                image: 'https://via.placeholder.com/150'
            },
            tv2: {
                name: 'Aldi Strijders',
                status: 'offline',
                image: 'https://via.placeholder.com/150'
            }
        }
    });
});

// export the app
module.exports = app;