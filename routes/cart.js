const cart = require('../models/cart');

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmn, } = require('./verifyToken');

const router = require('express').Router();

//create
router.post("/", verifyToken, async(res, req) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)

    } catch (err) {
        res.statusCode(500).json(err);
    }
});
// update
router.put('/:id', verifyTokenAndAuthorization, async(req, res) => {

    try {
        const updatedcart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedcart)
    } catch (err) { res.status(500).json(err) }
});

//delete
router.delete('/:id', verifyTokenAndAuthorization, async(req, res) => {
    try {
        await cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been deleted')


    } catch (err) {
        res.status(500).json(err)
    }
})

//get user cart
router.get('find/:userId', verifyTokenAndAuthorization, async(req, res) => {
        try {
            const Cart = await cart.findOne({ userId: req.params.userId });

            res.status(200).json(Cart);


        } catch (err) {
            res.status(500).json(err)
        }
    })
    //get all 
router.get('/', verifyTokenAndAdmn, async(req, res) => {

    try {

        const Carts = await cart.find()

        res.status(200).json(Carts);


    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;