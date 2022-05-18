const cors = require('cors');
const express = require('express');
const app = express();

// Set app headers to allow localhost:8080 to acces the api 
app.use(cors({
    origin: 'http://localhost:8080',
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