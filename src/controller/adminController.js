const adminModel = require("../models/adminModel")
const customerModel = require("../models/customerModel")
const enquiryModel = require("../models/EnquiryModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { isValid, isValidBody, isValidEmail, isValidPassword } = require('../validation/validators')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const adminRegister = async (req, res) => {
    try {
        let data = req.body
        const { name, email, password } = data

        if (isValidBody(data))
            return res.status(400).send({
                status: false, message: "Enter details "
            });
            //name validation
        if (!name) return res.status(400).send({
            status: false, message: " name is required"
        });

        if (isValid(name))
            return res.status(400).send({
                status: false, message: "name should not be an empty string"
            });
            //email validation
        if (!email) return res.status(400).send({
            status: false, message: "User Email-id is required"
        });

        if (!isValidEmail(email.trim())) return res.status(400).send({
            status: false, message: "Please Enter a valid Email-id"
        });

        let duplicateEmail = await adminModel.findOne({ email: email })
        if (duplicateEmail) return res.status(400).send({
            status: false, message: "Email already exist"
        })
        //password validation
        if (!password) return res.status(400).send({
            status: false, message: "Password is required"
        });

        if (!isValidPassword(password)) return res.status(400).send({
            status: false,
            message: "Password should be between 8 and 15 character and it should be alpha, numeric"
        });

        data.password = await bcrypt.hash(password, 10);
     //make response
        let saveData = await adminModel.create(data)
        res.status(201).send(saveData)
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

//===============================login==================================================================

const adminLogin = async (req, res) => {
    try {
        data = req.body
        if (!Object.keys(data) > 0) {
            return res.status(400).send({ status: false, message: "Please Enter Email or Password" })
        }
        const { email, password } = data
        //  Email Validation 
        if (isValid(email)) {
            return res.status(400).send({ status: false, message: " Email Id Is required" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: " Email Id Is Not Valid" })
        }
        const isEmailExists = await adminModel.findOne({ email: email })
        if (!isEmailExists) return res.status(401).send({ status: false, message: "Email is Incorrect" })
        //  Password Validation 
        if (isValid(password)) {
            return res.status(400).send({ status: false, message: " Password Is required" })
        }

        const isPasswordMatch = await bcrypt.compare(password, isEmailExists.password)
        if (!isPasswordMatch) return res.status(401).send({ status: false, message: "Password is Incorrect" })

        // > Create Jwt Token 
        const token = jwt.sign(
            { adminID: isEmailExists._id.toString() },
            "verysecret assignment test",
            { expiresIn: '24h' }
        )
        //  Make Respoense
       
        let result = {
            adminID: isEmailExists._id.toString(),
            token: token,
        }
        res.status(200).send({ status: true, message: "Login Successful", data: result })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//====================get the customer enquiry ==============================================
;
const getCustomersEnquiries = async (req, res) => {

    const customeerEquiries = await enquiryModel.find()
    if (customeerEquiries.length == 0) return res.status(404).send({ status: false, message: "data not found" })
    res.status(200).send({status: true,data:customeerEquiries})
}

//===============================update customer enquiry =====================================================


const updateStatus = async (req, res) => {
    try {
        let id = req.params.adminID;
        const { customerID } = req.body
        if (id === ":adminID") {
            return res
                .status(400)
                .send({ status: false, message: "adminID is required" });
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({
                status: false, message: "Given adminID is an invalid ObjectId"});
        }
        let updateDoc = await enquiryModel.findOneAndUpdate({ customerID: customerID, isDeleted: false },{ EnquiryStatus: "resloved" })
        if (!updateDoc) return res.status(404).send({ status: false, message: "data not found" })

        return res.status(200).send({ status: true, msg: "updated successfully", });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//==============================DELETE CUSTOMER enquiry=========================================

const deleteCostumerData = async function (req, res) {
    try {
        const Id = req.params.adminID;
        const { customerID } = req.body
       let deleteEnquiries = await enquiryModel.findOneAndUpdate(
            { customerID: customerID, isDeleted: false},
            { $set: { isDeleted: true, deletedAt: new Date() } }
        );
        if (!deleteEnquiries) return res.status(404).send({ status: false, message: "data not found" })
        return res.status(200).send({ status: true, message: " deleted successfully" });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


module.exports = { adminRegister, adminLogin,  getCustomersEnquiries, updateStatus, deleteCostumerData }