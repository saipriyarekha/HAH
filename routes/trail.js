const express = require('express');
const router = express.Router();

router.get('/trail', (req, res) => res.send('welcome'));

module.exports = router;
