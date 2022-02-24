const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const AsyncError = require('../Middlewares/asyncErrorHandler');
const ApiFeatures = require('../utils/apiFeatures');

// Create Products --Admin
exports.createProducts = AsyncError(async (req, res) => {
    req.body.user = req.user.id

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
});

// Get All Products

exports.getAllproducts = AsyncError(async (req, res) => {

    const productPerPage = 3;
    const productCount = await Product.countDocuments()

    const ApiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(productPerPage)
    const product = await ApiFeature.query;
    res.status(200).json({
        success: true,
        product,
        productCount,
        productPerPage,
    })
    console.log(productCount);
    console.log(productPerPage);
 // .pagination(productPerPage)
    
//  let product = await ApiFeature.query

//  let productFilterCount = product.length

//  ApiFeature.pagination(productPerPage)
 // product = await ApiFeature.query;

});

// Update Products --Admin
exports.updateProduct = AsyncError(async (req, res, next) => {
    const { id: productID } = req.params
    const product = await Product.findByIdAndUpdate({ _id: productID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!product) {
        return next(new ErrorHandler('Product not Found', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

// Delete Products --Admin
exports.deleteProduct = AsyncError(async (req, res) => {
    const { id: productID } = req.params
    const product = await Product.deleteOne({ _id: productID })
    if (!product) {
        return next(new ErrorHandler('Product not Found', 404))
    }
    res.status(200).json({
        success: true,
        product,
        productCount,
    })
});

// Get Single Products
exports.getSingleProducts = AsyncError(async (req, res, next) => {
    const { id: productID } = req.params
    const product = await Product.findById({ _id: productID })
    if (!product) {
        return next(new ErrorHandler('Product not Found', 404))
    }
    res.status(200).json({
        success: true,
        product,
    })
});

exports.productReview = AsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating,
        comment
    }

    const product = await Product.findById(productId)
    // console.log(product.name);
    const isreviewd = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
    if (isreviewd) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment)
        })
        res.status(200).json({
            success: true,
            message: 'ALready review'
        })
    } else {
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        message: 'Notr ALready review'
    })
})


// get all Reviews

exports.getAllReview = AsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id)
    const reviews = product.reviews
    if (!product) {
        return next(new ErrorHandler('Product not Found', 404))
    }
    res.status(200).json({
        success: true,
        reviews,
    })
})

// Delete  Review

exports.deleteReview = AsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    if (!product) {
        return next(new ErrorHandler('Product not Found', 404))
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating
    })
    const ratings = avg / reviews.length;

    const numberOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        ratings,
        numberOfReviews,
        reviews
    },
        {
            new: true,
            runValidators: true,

        }
    )

    res.status(200).json({
        success: true,
        reviews,
    })
})