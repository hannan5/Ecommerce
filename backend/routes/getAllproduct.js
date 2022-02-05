const express = require('express')
const { getAllproducts, createProducts, updateProduct, deleteProduct, getSingleProducts } = require('../controllers/productController')
const { isAuthenticated,adminAccess } = require('../Middlewares/auth')

const router = express.Router()

router.route('/products').get( getAllproducts)

router.route('/products/new').post( isAuthenticated, adminAccess("admin"), createProducts)

router.route('/products/:id')
.put(isAuthenticated, adminAccess("admin"),updateProduct)
.delete(isAuthenticated, adminAccess("admin"),deleteProduct)
.get(isAuthenticated, adminAccess("admin"),getSingleProducts)

module.exports = router

