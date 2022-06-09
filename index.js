const express = require('express');
const router = express();
const chalk = require('chalk');
const config = require('./middleware/config');

// load the api route from the routes folder with the route prefix /api
router.use('/api', require('./api'));
console.log(chalk.blue('[API]') + ' ' + chalk.yellow('Routes loaded'));

// Start the server
router.listen(config.port, () => {
    console.log(chalk.blue('[API]') + ' ' + chalk.yellow('Server started on port 3000'));
});