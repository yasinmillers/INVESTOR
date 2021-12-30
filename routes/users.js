const router = require('express').Router();

router.get('/usertest', (req, res) => {
    res.send('Hello');
});

module.exports = router;