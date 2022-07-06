const cors = require('cors');
const express = require('express');
const app = express();
const config = require('../middleware/config');
const Bravia = require('bravia');


// Set app headers to allow localhost:8080 to access the api 
let allowedOrigins = config.allowed.split(', ');
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Send commands to tv on a specific ip.
app.post('/tv/command', async (req, res) => {
    let ipaddress = req.body.ipaddress; // Get ipaddress from request
    const command = req.body.command; // Command that will be send to the tv.
    const tv = new Bravia(ipaddress, "80", "0000"); // Create new tv object with ipaddress and port.
    await tv.send(command)
    .then(_ => res.status(200).send({message: 'Command send to Bravia tv', ipaddress: ipaddress, command: command}))
    .catch(err => res.status(400).send({message: err}));
    return;
});

    app.post('/tv/status', async (req, res) => {
        let ipaddress = req.body.ipaddress; // Get ipaddress from request
        let method = req.body.method; // Get method from request
        let tv = new Bravia(ipaddress, "80", "0000"); // Create new tv object with ipaddress and port.
        await tv.system.invoke(method)
        .then(result => res.status(200).send({message: 'Bravia tv ' + method + ' requested', ipaddress: ipaddress, result: result}))
        .catch(err => res.status(400).send({message: 'Command did not send to Bravia tv', ipaddress: ipaddress, command: command, error: err}));

    }
    );


app.post('/tv/discover', async (req, res) => {
    await Bravia.discover(10000)
    .then(tvs => res.status(200).send({message: 'Tv\'s found', tvs}))
    .catch(err => res.status(400).send({message: err}));
});

// export the app
module.exports = app;