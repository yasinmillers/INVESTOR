const order = require('../models/order');

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmn, } = require('./verifyToken');

const router = require('express').Router();

//create
router.post("/", verifyToken, async(res, req) => {
    const newOrder = new order(req.body);
    try {
        const savedorder = await newOrder.save();
        res.status(200).json(savedorder)

    } catch (err) {
        res.statusCode(500).json(err);
    }
});
// update
router.put('/:id', verifyTokenAndAdmn, async(req, res) => {

    try {
        const updatedorder = await order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedorder)
    } catch (err) { res.status(500).json(err) }
});

//delete
router.delete('/:id', verifyTokenAndAdmn, async(req, res) => {
    try {
        await order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted')


    } catch (err) {
        res.status(500).json(err)
    }
})

//get user orders
router.get('find/:userId', verifyTokenAndAuthorization, async(req, res) => {
        try {
            const Orders = await order.find({ userId: req.params.userId });

            res.status(200).json(Orders);


        } catch (err) {
            res.status(500).json(err)
        }
    })
    //get all  orders
router.get('/', verifyTokenAndAdmn, async(req, res) => {

    try {

        const Orders = await order.find()

        res.status(200).json(Orders);


    } catch (err) {
        res.status(500).json(err)
    }
})

//get monthly income

router.get('/stats', verifyTokenAndAdmn, async(req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await user.aggregate([
            { $match: { createAt: { $gate: previousMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: "$amount",
                }
            },

            {
                $group: {
                    id: "$month",
                    toatal: { $sum: "$sales" },
                }
            }
        ]);
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json(err)

    }
})


module.exports = router;