const express = require('express');
const router = express();
const chalk = require('chalk');

router.use('/api', require('./routes/api'));
console.log(chalk.blue('[API]') + ' ' + chalk.yellow('Routes loaded'));

router.listen(3000, () => {
    console.log(chalk.blue('[API]') + ' ' + chalk.yellow('Server started on port 3000'));
});