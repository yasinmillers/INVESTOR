const router = require('express').Router();

router.get('/usertest', (req, res) => {
    res.send('Hello');
});

router.post('/userpost', (req, res) => {
    const userName = req.body.userName;
    console.log(userName);
});

module.exports = router;