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

    const productPerPage = 5;
    const productCount = await Product.countDocuments()

    const ApiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(productPerPage)
    const product = await ApiFeature.query;
    res.status(200).json({
        success: true,
        product,
        productCount
    })
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