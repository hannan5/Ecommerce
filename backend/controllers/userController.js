const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const AsyncError = require('../Middlewares/asyncErrorHandler');
const sentToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
const asyncErrorHandler = require('../Middlewares/asyncErrorHandler');

exports.createUser = AsyncError(async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "This is sample id",
            url: 'ThisissampleUrl',
        }
    })
    sentToken(user, 201, res)

})

//Login user
exports.loginUser = AsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please input Email and Password', 401))
    }
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Please input valid Email and Password', 404))
    }
    const passwordMatched = await user.comparedPassword(password)

    if (!passwordMatched) {
        return next(new ErrorHandler('Please input valid Email and Password', 404))
    }

    sentToken(user, 200, res)
})

//Logout User

exports.logOut = AsyncError(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: 'User is logout'
    })
})

// forget Password

exports.forgetPassword = AsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        next(new ErrorHandler('User is not found', 401))
    }
    await user.save({ validateBeforeSave: false })
    const resetPasswod = user.getresetPasswordToken()

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetPasswod}`

    const message = `Your password reset Token is ${resetPasswordUrl}`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce ',
            message
        });
        res.status(200).json({
            success: true,
            message: `Email send to to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        next(new ErrorHandler(error.message, 401))

    }
})

// update Password

exports.updatePass = AsyncError(async (req, res, next) => {

    // const resetPasswordToken = crypto.createHash('sha256').update(req.param.token).digest('hex')

    // const user = await User.findOne({
    //     resetPasswordToken,
    //     resetPasswordExpire: { $gt: Date.now() },
    // })

    // if (!user) {
    //     return next(new ErrorHandler('Your token is Expired', 404))
    // }

    // if (req.body.password !== req.body.confirm) {

    //     return next(new ErrorHandler('Your password is not correct', 404))
    // }
    // user.password = req.body.password,
    //     user.resetPasswordToken = undefined
    // user.resetPasswordExpire = undefined
    // console.log(user.name)
    // // await user.save()

    // sendToken(user, 200, res)

})

//get User Details

exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
}


/// Update profile

exports.updateProfile = async (req, res, next) => {

    const updateprofile = {
        email: req.body.email,
        name: req.body.name,
    }
    const user = await User.findByIdAndUpdate(
        req.user.id,
        updateprofile,
        {
            runValidators: true,
            new: true,
        })

    res.status(200).json({
        success: true,
    })

}


//get all user -- admin

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const user = await User.find({})

    res.status(200).json({
        success: true,
        user
    })
})


//get single user -- admin

exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {
    const { id: userID } = req.params
    const user = await User.findById({ _id: userID })

    if(!user){
        next(new ErrorHandler('User is not found',400))
    }
    res.status(200).json({
        success: true,
        user
    })
})

// update user Role 
exports.updateRole = asyncErrorHandler( async (req, res, next) => {

    const updateprofile = {
        email: req.body.email,
        name: req.body.name,
        role:req.body.role,
    }
    const user = await User.findByIdAndUpdate(
        req.params.id,
        updateprofile,
        {
            runValidators: true,
            new: true,
        })
        if(!user){
            next(new ErrorHandler('User is not found',400))
        }
    
    res.status(200).json({
        success: true,
        // user 
    })
})

// Delete User --Admin

exports.deleteUser = asyncErrorHandler(async(req,res,next) =>{
    const user = await User.findById(req.params.id)
    if(!user){
        next(new ErrorHandler('User does not exist',400))
    }
    await user.remove()
    res.status(200).json({
        success:true,
        message:'User Delete Successfully'
    })

})