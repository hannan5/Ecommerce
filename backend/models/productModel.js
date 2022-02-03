const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please input a name']
    },
    description: {
        type: String,
        required: [true, 'Please input a Description']
    },
    price: {
        type: Number,
        required: [true, 'Please input a Price'],
        maxlength: 6
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    ratings: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Please input a Product Category']
    },
    reviews: {
        name: {
            type: String,
            // required:true,
        },
        rating: {
            type: Number,
            // required:true,
        },
        comment: {
            type: String,
            // required:true,
        }
    },
    stock: {
        type: Number,
        default: 1,
        maxlength: 4
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Products', productSchema)