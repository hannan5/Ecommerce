const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please input a name'],
        maxlength: [30, 'name is cannot greater than 30 '],
        minlength: [4, 'name is cannot less than 30 '],
    },
    email: {
        type: String,
        required: [true, 'Please Enter a Email'],
        unique: true,
        validate: [validator.isEmail, 'Enter a valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter a Password'],
        minlength: [8, 'Password must be of 8 characters'],
        select: false
    },
    avatar: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExplore: Date
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
      next()  
    }
    this.password = await bcrypt.hash(this.password,12) 
})

//JWT Token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

//compared Password
userSchema.methods.comparedPassword = function(password){
    console.log(password)
    return bcrypt.compare(password, this.password)
}
module.exports = mongoose.model('User', userSchema);