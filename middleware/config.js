const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
    port: process.env.PORT || 3000,
    allowed: process.env.ALLOWED || 'http://localhost:8080',
    allowed_ipaddress: process.env.ALLOWED_IPADDRESS,
    // Database connection
    db: {
        client: process.env.DB_CLIENT || 'mysql',
        connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'remvee',
    },
    migrations: {
        directory: path.resolve(__dirname, '../database/migrations'),
        tableName: 'migrations'
    },
    seeds: {
        directory: path.resolve(__dirname, '../database/seeds'),
    },
    },
};

// export the config
module.exports = config;