const productModel = require('../models/productModel')


const createProduct = async (req, res) => {
    try {
        let productDetails = req.body
        const { isValid, isValidBody,  isValidPrice } = require('../validation/validators')

        const { name, price, description } = productDetails

        if (isValidBody(productDetails))
            return res.status(400).send({
                status: false, message: "Enter details to create Product"
            });

        if (!name) return res.status(400).send({
            status: false, message: "First name is required"
        });

        if (isValid(name)) {
            return res.status(400).send({
                status: false, message: "name should not be an empty string"
            });
        }
        if (!price) return res.status(400).send({
            status: false, message: "price is required"
        });

        if (isValid(price)) {
            return res.status(400).send({
                status: false, message: "price should not be an empty string"
            });
        }
        if (!isValidPrice(price))
            return res.status(400).send({
                status: false, message: "Enter a Valid Price"
            })
            if (!description) return res.status(400).send({
                status: false, message: "description is required"
            });
    
            if (isValid(description)) {
                return res.status(400).send({
                    status: false, message: "description should not be an empty string"
                });
            }

        let saveData = await productModel.create(productDetails)
        res.status(201).send(saveData)
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { createProduct }