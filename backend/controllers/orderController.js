const ErrorHandler = require('../utils/errorHandler')
const AsyncError = require('../Middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel')


// Create New Order

exports.createOrder = AsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })

    res.status(200).json({
        success: true,
        order,
    })
})

// get Single Order

exports.getSingleOrder = AsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )
    if (!order) {
        next(new ErrorHandler('Order is does not exist', 400))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// get Order --User

exports.myOders = AsyncError(async (req, res, next) => {
    let user = req.user._id
    const order = await Order.find({ user })
    if (!order) {
        next(new ErrorHandler('Order is does not exist', 400))
    }

    res.status(200).json({
        success: true,
        order
    })

})

// get All Order --Admin

exports.getAllOders = AsyncError(async (req, res, next) => {
    const order = await Order.find({})
    if (!order) {
        next(new ErrorHandler('Order is does not exist', 400))
    }

    let totalAmount = 0;
    order.forEach((o) => {
        console.log(o.paymentInfo.totalPrice);
        totalAmount += o.paymentInfo.totalPrice
    })
    // console.log(order);
    res.status(200).json({
        success: true,
        totalAmount,
        order,
    })

})

// update OrderStatus --Admin

exports.updateStatus = AsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        next(new ErrorHandler('Order is does not exist', 400))
    }

    if (order.paymentInfo.orderStatus === 'Delievered') {
        next(new ErrorHandler('Your Order is already Delieverd', 400))
    }

    order.orderItems.forEach(async(o) => {
        await updateStock(o.product, o.quantity)
    })
    order.paymentInfo.orderStatus = req.body.status
    if (req.body.status === "Delievered") {
        console.log(order.paymentInfo.orderStatus);
        order.deliveredAt = Date.now()
    }
    console.log('error');
    await order.save({ validateBeforeSave: false })
})

const updateStock =async (id,quantity)=>{
    const product = await Product.findById(id);
    product.stock -= quantity
    product.save({ validateBeforeSave: false })

}


// delete order
exports.deleteOrder = AsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
        next(new ErrorHandler('Order is does not exist', 400))
    }

    res.status(200).json({
        success: true,
        message:"Order is Successfully"
    })

})