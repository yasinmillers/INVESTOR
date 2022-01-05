const router = require('express').Router();
const user = require('../models/user');
const Cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');


//reg
router.post('/register', async(req, res) => {
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(req.body.password, process.env.PASS).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);

    }
})

//login
router.post('/login', async(req, res) => {
    try {
        const user = await user.findOne({ username: req.body.username });
        !user && res.status(401).json('wrong credentials')
        const hashedpassword = Cryptojs.AES.decrypt(
            user.password,
            process.env.PASS
        );
        const Originalpassword = hashedpassword.toString(Cryptojs.enc.utf8);
        Originalpassword !== req.body.password &&
            res.status(401).json('wrong credentials');
        const token = jwt.sign({
            _id: user._id,
            username: user.username,
            email: user.email,
        }, process.env.TOKEN, { expiresIn: '1h' });
        const { password, ...others } = user._doc;
        res.status(200).json(others, token);

    } catch (err) {
        req.status(500).json(err)
    }

});

module.exports = router;