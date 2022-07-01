const cors = require('cors');
const express = require('express');
const app = express();
const config = require('../middleware/config');
const Bravia = require('bravia');


// Set app headers to allow localhost:8080 to access the api 
let allowedOrigins = config.allowed.split(', ');
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));


// export the app
module.exports = app;