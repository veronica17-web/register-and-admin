const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId
const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },

    state: {
        type: String,
        require: true,
        trim: true
    },
    city: {
        type: String,
        require: true,
        trim: true
    },
    pincode: {
        type: Number,
        require: true,
        trim: true
    },
   
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
    deletedAt: { 
        type: Date, 
        trim: true
     }

}, { timestamps: true })
module.exports = mongoose.model("customer", customerSchema)