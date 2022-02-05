const ErrorHandler = require("../utils/errorHandler")
const asyncErrorHandler = require("./asyncErrorHandler")
const jwtToken = require('jsonwebtoken')
const User = require("../models/userModel")

exports.isAuthenticated = asyncErrorHandler( async(req, res, next) =>{
const {token} = req.cookies
console.log(token)

if(!token){
    return next(new ErrorHandler('Please Login',400))
}
const welcome = jwtToken.verify(token, process.env.JWT_SECRET)
// console.log(welcome.id);
 req.user = await User.findById(welcome.id)
next()
})

exports.adminAccess = (...roles) =>{
    return (req, res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler('You are not admin',401))
        }
        next()
    }
}