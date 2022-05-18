const cors = require('cors');
const express = require('express');
const app = express();
const config = require('../middleware/config');

// Set app headers to allow localhost:8080 to acces the api 
let allowedOrigins = config.allowed.split(', ');
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));


// basic route at /api
app.get('/', (req, res) => {
    res.send({
        data: {
            message: 'Welcome to the API',
            status: 'success'
        }
    });
});


// export the app
module.exports = app;