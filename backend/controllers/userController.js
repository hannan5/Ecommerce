const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const AsyncError = require('../Middlewares/asyncErrorHandler');
const sentToken = require('../utils/jwtToken');

exports.createUser = AsyncError( async (req, res)  =>{
    const {name,email,password} = req.body

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: "This is sample id",
            url:'ThisissampleUrl',
        }
    })
    sentToken(user,201,res)

})

//Login user
exports.loginUser = AsyncError(async(req,res, next)=>{
    const {email,password} = req.body

    if(!email || !password){
        return next(new ErrorHandler('Please input Email and Password',401))
    }
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Please input valid Email and Password',404))
    }
    const passwordMatched = await user.comparedPassword(password)

    if(!passwordMatched){
        return next(new ErrorHandler('Please input valid Email and Password',404))
    }
   
    sentToken(user,200,res)
})

//Logout User

exports.logOut = AsyncError( async(req,res)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:'User is logout'
    })
})

