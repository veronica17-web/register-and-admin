const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const EnquirySchema = new mongoose.Schema({
    
    customerID :{
        type:ObjectId,
        require:true
    },
    Enquiry :{
        type : String,
        trim : true,
        require:true
    },
    EnquiryStatus:{
        type: String,
        default: 'pending',
         enum: ["pending", "completed"]

    }, 
    productId: {
        type: ObjectId,
        ref: "productDetails",
        required: true,
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
module.exports = mongoose.model("enquiries", EnquirySchema)