const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
    port: process.env.PORT || 3000,
    allowed: process.env.ALLOWED || 'http://localhost:8080',
    // Database connection
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'remvee'
    },
}

// export the config
module.exports = config;