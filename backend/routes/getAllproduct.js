const express = require('express')
const { getAllproducts, createProducts, updateProduct, deleteProduct, getSingleProducts, productReview, getAllReview, deleteReview } = require('../controllers/productController')
const { isAuthenticated,adminAccess } = require('../Middlewares/auth')

const router = express.Router()

router.route('/products').get( getAllproducts)

router.route('/products/new').post( isAuthenticated, adminAccess("admin"), createProducts)

router.route('/products/:id')
.put(isAuthenticated, adminAccess("admin"),updateProduct)
.delete(isAuthenticated, adminAccess("admin"),deleteProduct)
.get(getSingleProducts)

router.route('/review').put(isAuthenticated,productReview).get(getAllReview).delete(isAuthenticated,deleteReview)
module.exports = router

