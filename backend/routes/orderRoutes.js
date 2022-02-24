const express = require('express');
const { createOrder, getSingleOrder, myOders, getAllOders, updateStatus, deleteOrder } = require('../controllers/orderController');
const { isAuthenticated, adminAccess } = require('../Middlewares/auth');
const router = express.Router();

router.route('/orders/new').post(isAuthenticated, createOrder)


router.route('/orders/:id').get(isAuthenticated, adminAccess('admin'), getSingleOrder)

router.route('/order/me').get(isAuthenticated, myOders)

router.route('/orders').get(isAuthenticated, adminAccess('admin'), getAllOders)

router.route('/orders/status/:id').get(isAuthenticated, adminAccess('admin'), updateStatus).delete(isAuthenticated, adminAccess('admin'), deleteOrder)



module.exports = router
