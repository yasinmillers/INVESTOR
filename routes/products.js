const product = require('../models/product');
const products = require('../models/products');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmn, } = require('./verifyToken');

const router = require('express').Router();

//create
router.post("/", verifyTokenAndAdmn, async(res, req) => {
    const newProduct = new product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)

    } catch (err) {
        res.statusCode(500).json(err);
    }
});
// update
router.put('/:id', verifyTokenAndAdmn, async(req, res) => {

    try {
        const updatedproduct = await product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedproduct)
    } catch (err) { res.status(500).json(err) }
});

//delete
router.delete('/:id', verifyTokenAndAdmn, async(req, res) => {
    try {
        await product.findByIdAndDelete(req.params.id)
        res.status(200).json('product has been deleted')


    } catch (err) {
        res.status(500).json(err)
    }
})

//get product
router.get('find/:id', async(req, res) => {
        try {
            const product = await product.findById(req.params.id)

            res.status(200).json(product);


        } catch (err) {
            res.status(500).json(err)
        }
    })
    //get all products
router.get('/', async(req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products;
        if (qNew) {
            products = await product.find().sort({ createAt: -1 }).limit(5)

        } else if (qCategory) {
            products = await product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await product.find()
        }



        res.status(200).json(products);


    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;