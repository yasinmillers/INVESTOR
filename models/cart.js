const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    prducts: [{
        productsId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1,
        },
    }, ],


    //  createdAt: Date.now() 
}, { timestamps: true })
module.exports = mongoose.model('cart', CartSchema);