const express = require('express');
const router = express();


router.get('/', (_req, res) => {
    res.send({
        message: 'Hello World!'
    });
});

router.listen(3000, () => {
    console.log('Server running on port 3000');
});