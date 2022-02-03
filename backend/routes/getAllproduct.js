const express = require('express')
const { getAllproducts, createProducts, updateProduct, deleteProduct, getSingleProducts } = require('../controllers/productController')
// const { isAuthenticated } = require('../Middlewares/auth')

const router = express.Router()

router.route('/products').get(getAllproducts)

router.route('/products/new').post(createProducts)

router.route('/products/:id').put(updateProduct).delete(deleteProduct).get(getSingleProducts)

module.exports = router

