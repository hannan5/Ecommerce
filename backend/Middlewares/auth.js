// const ErrorHandler = require("../utils/errorHandler")
// const asyncErrorHandler = require("./asyncErrorHandler")
// const jwtToken = require('jsonwebtoken')
// const User = require("../models/userModel")

// exports.isAuthenticated = asyncErrorHandler( async(req, res, next) =>{
// const {token} = req.cookies
// console.log(token)

// if(!token){
//   return next(new ErrorHandler('you are not login',401))
// }
// const decotedDate  =  jwtToken.verify(token, process.env.JWT_SECRET)
// req.user = await User.findById(decotedDate.id)
// })