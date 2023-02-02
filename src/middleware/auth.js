const jwt = require('jsonwebtoken')
const {isValidObjectId} = require("../validation/validators")
const adminModel = require("../models/adminModel")
const customerModel =require("../models/customerModel")
const authentication = async function (req, res, next) {
    try {
        let token = req.headers["authorization"]
        if (!token) { return res.status(401).send({ msg: "required token " }) }
        let splittoken = token.split(' ') //converting into array
        // decoding token  
        jwt.verify(splittoken[1], "verysecret assignment test"
            , (err, decoded) => {
                if (err) {
                    return res
                        .status(401)
                        .send({ status: false, message: err.message });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const authorization = async function (req, res, next) {
    try {
        let adminID = req.params.adminID
        if (!isValidObjectId(adminID)) {
            return res.status(400).send({ status: false, message: "invalid adminID" })
        }
        const admin = await adminModel.findById(adminID)
        if (!admin) {
            return res.status(404).send({ status: false, message: "admin Not Found" })
        }
        const decoded = req.decoded.adminID;
        if (adminID !== decoded) { return res.status(403).send({ staus: false, msg: "you are not authorized" }) }
        next()
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

const authorization1 = async function (req, res, next) {
    try {
        let customerID = req.body.customerID
        if (!isValidObjectId(customerID)) {
            return res.status(400).send({ status: false, message: "invalid customerID" })
        }
        const costumer = await customerModel.findById(customerID)
        if (!costumer) {
            return res.status(404).send({ status: false, message: "customer Not Found" })
        }
        const decoded = req.decoded.customerID;
        if (customerID !== decoded) { return res.status(403).send({ staus: false, msg: "you are not authorized" }) }
        next()
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}



module.exports = { authentication, authorization,authorization1 }