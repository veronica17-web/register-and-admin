const express = require('express')

const router = express.Router()

const {customerRegister,login,Enquiry}= require("../controller/customerController")
const {createProduct}= require("../controller/productController")
const {adminRegister,adminLogin,getCustomersEnquiries,updateStatus,deleteCostumerData}= require('../controller/adminController')
const { authentication, authorization,authorization1 }=require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("this is successfully created");
  });
  
router.post("/register",customerRegister)
router.post("/login",login)
router.post('/Enquiry',authentication,authorization1,Enquiry)

router.post("/product",createProduct)

router.post("/adminRegister",adminRegister)
router.post('/adminLogin',adminLogin)
router.get("/getCustomersEnquiries/:adminID",authentication, authorization,getCustomersEnquiries)
router.put("/updateStatus/:adminID",authentication, authorization,updateStatus)
router.delete("/deleteCostumerData/:adminID",authentication, authorization,deleteCostumerData)
module.exports = router