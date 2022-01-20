const user = require('../models/user');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmn, } = require('./verifyToken');

const router = require('express').Router();

router.put('/:id', verifyTokenAndAuthorization, async(req, res) => {

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS
        ).toString();
    };

    try {
        const updatedUser = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) { res.status(500).json(err) }
});

//delete
router.delete('/:id', verifyTokenAndAuthorization, async(req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')


    } catch (err) {
        res.status(500).json(err)
    }
})

//get user
router.get('find/:id', verifyTokenAndAdmn, async(req, res) => {
        try {
            const User = await user.findById(req.params.id)
            const { password, ...others } = user._doc;
            res.status(200).json(others);


        } catch (err) {
            res.status(500).json(err)
        }
    })
    //get all users
router.get('/:id', verifyTokenAndAdmn, async(req, res) => {
        const query = req.query.new
        try {
            const User = query ?
                await user.find().sort({ _id: -1 }).limit(5) :
                await user.find();
            // const { password, ...others } = user._doc;
            res.status(200).json(user);


        } catch (err) {
            res.status(500).json(err)
        }
    })
    // user stats
router.get('/stats', verifyTokenAndAdmn, async(req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await user.aggregate([
            { $match: { createAt: { $gate: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                }
            }
        ])
    } catch (err) {
        res.status(500).json(err)

    }
})
module.exports = router;