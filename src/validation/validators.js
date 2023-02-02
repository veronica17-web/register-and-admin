const mongoose = require('mongoose');
const isValid = (value) => {
    if (typeof value === "undefined" || typeof value === "null") return true;
    if (typeof value === "string" && value.trim().length === 0) return true;
    if (typeof value === "object" && Object.keys(value).length === 0) return true;
    return false;
}
const isValid1 = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
  }
const isValidBody = (reqBody) => {
    return Object.keys(reqBody).length === 0;
}

const isValidString = (String) => {
    return /\d/.test(String)
}

const isValidEmail = (Email) => {
    return /^([a-z0-9]+@[a-z]+\.[a-z]{2,3})+$/.test(Email)
};

const isValidPhone = (Mobile) => {
    return /^[6-9]\d{9}$/.test(Mobile)
};
const isValidPassword = (password) => {
    if (password.length > 7 && password.length < 16) return true
}
const isValidPincode = (num) => {
    return  /^[0-9]{6}$/.test(num);
   }
   const isValidPrice = (price) => {
    return /^[1-9]\d{0,7}(?:\.\d{1,2})?$/.test(price);
  }
  const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
    
}
module.exports = { isValid, isValidBody, isValidString, isValidEmail,
     isValidPhone, isValidPassword ,isValidPincode,isValidPrice,isValidObjectId,isValid1}