const express = require('express');
const app = express();

// basic route at /api
app.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});

// export the app
module.exports = app;