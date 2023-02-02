const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },


}, { timestamps: true })
module.exports = mongoose.model("productDetails", productSchema)