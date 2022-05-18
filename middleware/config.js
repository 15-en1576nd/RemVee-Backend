const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
    port: process.env.PORT || 3000,
    allowed: process.env.ALLOWED || 'http://localhost:8080',
}

// export the config
module.exports = config;