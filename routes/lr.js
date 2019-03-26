const express = require('express');
const router = express.Router();

router.get('/student', (req, res) => res.send('student'));
router.get('/login', (req, res) => res.send('login'));

//student handle
router.post('/student', (req, res) => {
    console.log(req.body)
    res.send('hello');
});

module.exports = router;
