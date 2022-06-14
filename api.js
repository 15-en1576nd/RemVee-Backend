const cors = require('cors');
const express = require('express');
const app = express();
const config = require('./middleware/config');
const fs = require('fs');
const chalk = require('chalk');

// Set app headers to allow localhost:8080 to acces the api 
let allowedOrigins = config.allowed.split(', ');
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

console.log(chalk.yellow('====================================='))
// read all files in the routes folder and load them
fs.readdirSync('./routes').forEach(file => {
    if (file.endsWith('.js')) {
        const route = require('./routes/' + file);
        app.use('/', route);
        // console.log('\x1b[31m%s\x1b[0m', '[SERVER]', '\x1b[33m[ROUTE]\x1b[0m', `Loaded route: ` + file);
        console.log(chalk.blue('Loaded: ') + chalk.red(file));
        console.log(chalk.yellow('====================================='))
    }
});

// export the app
module.exports = app;