
const customerModel = require("../models/customerModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const enquiryModel = require('../models/EnquiryModel')

const { isValid, isValidBody, isValidString,isValid1,isValidObjectId,
    isValidEmail, isValidPhone, isValidPassword, isValidPincode } = require('../validation/validators')

const customerRegister = async function (req, res) {
    try {
        let data = req.body
        let { name, email, phone, password, state, city, pincode, Enquiry} = data

        if (isValidBody(data)) {
            return res.status(400).send({
                status: false,msg: "please provide data"})
        }//name validation
        if (!name) return res.status(400).send({
            status: false, message: "name is required"  });

        if (isValid(name)) {
            return res.status(400).send({
                status: false, message: "name should not be an empty string"  });
        }
        if (isValidString(name)) return res.status(400).send({
            status: false, message: "Enter a valid name and should not contains numbers" });
          // email validation
        if (!email) return res.status(400).send({
            status: false, message: "User Email-id is required" });

        if (!isValidEmail(email.trim())) return res.status(400).send({
            status: false,  message: "Please Enter a valid Email-id"  });

        let duplicateEmail = await customerModel.findOne({ email: email })
        if (duplicateEmail) return res.status(400).send({
            status: false,  message: "Email already exist"   })
        // phone validation
        if (!phone) return res.status(400).send({
            status: false,   message: " Phone number is required" });

        if (!isValidPhone(phone.trim())) return res.status(400).send({
            status: false,   message: "Please Enter a valid Phone number"});
            
        let duplicatePhone = await customerModel.findOne({ phone: phone })
        if (duplicatePhone) return res.status(400).send({
            status: false,  message: "Phone already exist"})
        //password validation
        if (!password) return res.status(400).send({
            status: false, message: "Password is required" });

        if (!isValidPassword(password)) return res.status(400).send({
            status: false,
            message: "Password should be between 8 and 15 character and it should be alpha, numeric"});
          
            data.password = await bcrypt.hash(password, 10);
        //state validation
        if (!state) return res.status(400).send({
            status: false, message: "state is required" });

        if (isValidString(state)) return res.status(400).send({
            status: false,  message: "Enter a valid  state name and should not contains numbers" });
        // city validation
        if (!city) return res.status(400).send({
            status: false,message: "city is required"});

        if (isValidString(city)) return res.status(400).send({
            status: false, message: "Enter a valid  city name and should not contains numbers"});
        // pincode validation
        if (!pincode) return res.status(400).send({
            status: false,message: "pincode is required"});

        if (!isValidPincode(pincode)) {
            return res.status(400).send({
                status: false,message: "Please Provide valid Pincode "})
        };
        
       //  Make Respoense
        let saveData = await customerModel.create(data)
        res.status(201).send(saveData)
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
//==============================================login =========================================================
const login = async (req, res) => {
    try {
        customerData = req.body
        if (!Object.keys(customerData) > 0) {
            return res.status(400).send({ status: false, message: "Please Enter Email or Password" })
        }
        const { email, password } = customerData
        //  Email Validation 
        if (isValid(email)) {
            return res.status(400).send({ status: false, message: " Email Id Is required" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: " Email Id Is Not Valid" })
        }
        const isEmailExists = await customerModel.findOne({ email: email })
        if (!isEmailExists) return res.status(401).send({ status: false, message: "Email is Incorrect" })
        //  Password Validation 
        if (isValid(password)) {
            return res.status(400).send({ status: false, message: " Password Is required" })
        }

        const isPasswordMatch = await bcrypt.compare(password,isEmailExists.password)
        if (!isPasswordMatch) return res.status(401).send({ status: false, message: "Password is Incorrect" })

        // > Create Jwt Token 
        const token = jwt.sign(
            { customerID: isEmailExists._id.toString() },
            "verysecret assignment test",
            { expiresIn: '24h' }
        )
        //  Make Respoense
        let result = {
            customerID: isEmailExists._id.toString(),
            token: token,
        }
        res.status(200).send({ status: true, message: "Login Successful", data: result })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//==============================post the enquiries========================================

const Enquiry = async (req,res)=>{
    try {
    let data = req.body
    const {customerID,Enquiry} = data

    if (isValidBody(data)) {
        return res.status(400).send({ status: false, message: "Provide some data inside the body " })
    }
    // customerID validation
    if (!isValid1(customerID)) {
        return res.status(400).send({ status: false, message: "customerID is required" })
    }
    if (!isValidObjectId(customerID)) {
        return res.status(400).send({ status: false, message: " customerID not valid" })
    }
    //enquiry validation
    if (isValid(Enquiry)) {
        return res.status(400).send({ status: false, message: "Enquiry is required" })
    }
    //  Make Respoense
    let saveData = await enquiryModel.create(data)
    res.status(201).send({ status: true, data :saveData})
} catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}
}

module.exports = { customerRegister,login,Enquiry }