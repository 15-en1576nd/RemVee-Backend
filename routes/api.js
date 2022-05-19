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

app.get('/tv', (req, res) => {
    res.send({
        list: {
            tv: {
                name: 'Samsung',
                image: 'https://via.placeholder.com/150'
            },
            tv2: {
                name: 'Samsung2',
                image: 'https://via.placeholder.com/150'
            }
        }
    });
});


// export the app
module.exports = app;