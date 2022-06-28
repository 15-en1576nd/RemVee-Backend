// const cors = require('cors');
// const express = require('express');
// const app = express();
const config = require('../middleware/config');
const fs = require('fs');
const mysql = require("mysql");
const runQuery = require('../database/queryRunner');

// Make connection to database
var con = mysql.createConnection(
    config.db.connection
);

function validateIp(ipaddress) {
    // Validate the ipaddress
    let ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return ipRegex.test(ipaddress);
}

async function checkIp(ipaddress) {
    // Check if the ipaddress is in the database
    try {
        const result = await runQuery(con, "SELECT COUNT(*) as count FROM tv WHERE ipaddress = ?", [ipaddress]);
        return result[0].count === 0;
    } catch(err) {
        console.error(err);
        return false;
    }
};

module.exports = {checkIp, validateIp};