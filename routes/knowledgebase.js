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

// basic route at /api
app.get('/knowledgebase', (req, res) => {
    res.send({
        data: {
            message: 'Welcome to the knowledgebase API',
            status: 'success'
        }
    });
});

// export the app
module.exports = app;